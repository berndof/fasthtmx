"""
Importa grupos do Active Directory para o sistema, criando local Group +
AdGroupMapping para cada grupo AD encontrado.

Uso:
    uv run python scripts/sync_ad_groups.py
    uv run python scripts/sync_ad_groups.py --dry-run
    uv run python scripts/sync_ad_groups.py --search-base "OU=Groups,DC=ad,DC=gruposcc,DC=com,DC=br"
    uv run python scripts/sync_ad_groups.py --group-filter "(cn=App-*)"
    uv run python scripts/sync_ad_groups.py --name-prefix "AD-"
"""

import argparse
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))


async def main():
    parser = argparse.ArgumentParser(description="Importar grupos do AD")
    parser.add_argument("--dry-run", action="store_true", help="Apenas mostrar o que seria feito")
    parser.add_argument("--search-base", help="Base DN para buscar grupos (default: LDAP_USER_SEARCH_BASE ou LDAP_BASE_DN)")
    parser.add_argument("--group-filter", default="(objectClass=group)", help="Filtro LDAP para grupos (default: (objectClass=group))")
    parser.add_argument("--name-prefix", help="Prefixo para nomes dos grupos locais (ex: AD- para ficar AD-GrupoNome)")
    args = parser.parse_args()

    from core.settings import LDAP_ENABLED, LDAP_BASE_DN, LDAP_USER_SEARCH_BASE
    from core.database import db
    from core.unit_of_work import UnitOfWork

    if not LDAP_ENABLED:
        print("ERRO: LDAP não configurado. Configure as variáveis LDAP_* no .env")
        sys.exit(1)

    search_base = args.search_base or LDAP_USER_SEARCH_BASE or LDAP_BASE_DN
    print(f"Buscando grupos em: {search_base}")
    print(f"Filtro: {args.group_filter}")
    if args.dry_run:
        print("Modo: DRY-RUN (nenhuma alteração será feita)")
    print()

    from core.utils.ldap import search_ldap

    groups_ad = search_ldap(
        search_base=search_base,
        search_filter=args.group_filter,
        attributes=["distinguishedName", "cn", "name", "description", "sAMAccountName"],
    )

    if not groups_ad and search_base != LDAP_BASE_DN:
        print(f"Nada encontrado em '{search_base}', tentando de '{LDAP_BASE_DN}'...")
        search_base = LDAP_BASE_DN
        groups_ad = search_ldap(
            search_base=search_base,
            search_filter=args.group_filter,
            attributes=["distinguishedName", "cn", "name", "description", "sAMAccountName"],
        )

    if not groups_ad:
        print("Nenhum grupo encontrado no AD.")
        return

    print(f"Encontrados {len(groups_ad)} grupos no AD (base: {search_base}):\n")
    for g in groups_ad[:5]:
        cn = g.get("cn") or g.get("name") or ""
        if isinstance(cn, list):
            cn = cn[0]
        desc = g.get("description") or ""
        if isinstance(desc, list):
            desc = desc[0] if desc else ""
        print(f"  • {cn}{' - ' + desc if desc else ''}")
        print(f"    {g['dn']}")
    if len(groups_ad) > 5:
        print(f"  ... e mais {len(groups_ad) - 5} grupos")

    if args.dry_run:
        print("\nDRY-RUN concluído.")
        return

    # ── Sincronizar com banco ───────────────────────────────────
    db.start()
    uow = UnitOfWork()
    db_session = await uow.get_db_session()

    from sqlalchemy import select
    from core.modules.auth.models.group import Group
    from core.modules.auth.models.ad_mapping import AdGroupMapping

    created_groups = 0
    created_mappings = 0
    existing_mappings = 0
    errors = []

    for ad_group in groups_ad:
        cn = ad_group.get("cn") or ad_group.get("name") or ""
        if isinstance(cn, list):
            cn = cn[0] if cn else "unknown"
        dn = ad_group["dn"]
        desc = ad_group.get("description") or ""
        if isinstance(desc, list):
            desc = desc[0] if desc else ""

        local_name = f"{args.name_prefix}{cn}" if args.name_prefix else cn

        try:
            result = await db_session.execute(
                select(Group).where(Group.name == local_name)
            )
            local_group = result.scalar_one_or_none()

            if not local_group:
                local_group = Group(
                    name=local_name,
                    description=desc or f"Importado do AD: {cn}",
                )
                db_session.add(local_group)
                await db_session.flush()
                created_groups += 1
                print(f"  ✓ Grupo local criado: {local_name}")

            result = await db_session.execute(
                select(AdGroupMapping).where(AdGroupMapping.group_id == local_group.id)
            )
            mapping = result.scalar_one_or_none()

            if not mapping:
                mapping = AdGroupMapping(
                    ad_group_name=cn,
                    ad_group_dn=dn,
                    group_id=local_group.id,
                )
                db_session.add(mapping)
                await db_session.flush()
                created_mappings += 1
                print(f"  ✓ Mapeamento criado: {cn} → {local_name}")
            else:
                existing_mappings += 1
                print(f"  • Mapeamento já existe: {cn} → {local_name}")

        except Exception as e:
            errors.append(f"{cn}: {e}")
            print(f"  ✗ ERRO: {cn} → {e}")

    await uow.commit()
    print(f"\nResumo: {created_groups} grupos criados, {created_mappings} mapeamentos novos, {existing_mappings} já existiam")
    if errors:
        print(f"Erros: {len(errors)}")
        for e in errors:
            print(f"  • {e}")

    await db.stop()


if __name__ == "__main__":
    asyncio.run(main())
