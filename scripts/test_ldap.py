"""
uv run python scripts/test_ldap.py
uv run python scripts/test_ldap.py --username meu.usuario --password minha-senha
uv run python scripts/test_ldap.py --username meu.usuario --password minha-senha --check-db
"""

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))


def section(title: str):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


def pass_fail(ok: bool, msg: str = ""):
    status = "PASS" if ok else "FAIL"
    print(f"  [{status}] {msg}")
    return ok


def main():
    parser = argparse.ArgumentParser(description="Teste de conexão LDAP")
    parser.add_argument(
        "--username", help="sAMAccountName ou UPN do usuário a testar"
    )
    parser.add_argument(
        "--password", help="Senha do usuário a testar"
    )
    parser.add_argument(
        "--check-db",
        action="store_true",
        help="Verificar mapeamentos no banco",
    )
    args = parser.parse_args()

    # ── 1. Settings ──────────────────────────────────────────────
    section("1. Configurações LDAP")
    from core import settings

    pass_fail(
        settings.LDAP_ENABLED,
        f"LDAP_ENABLED = {settings.LDAP_ENABLED}",
    )
    if not settings.LDAP_ENABLED:
        print("\n  ⚠  Configure as variáveis LDAP_* no .env e tente novamente.")
        sys.exit(1)

    pass_fail(
        bool(settings.LDAP_SERVER), f"LDAP_SERVER = {settings.LDAP_SERVER}"
    )
    pass_fail(
        bool(settings.LDAP_BASE_DN), f"LDAP_BASE_DN = {settings.LDAP_BASE_DN}"
    )
    pass_fail(
        bool(settings.LDAP_BIND_USER),
        f"LDAP_BIND_USER = {settings.LDAP_BIND_USER}",
    )
    print(f"  INFO  LDAP_UPN_SUFFIX = {settings.LDAP_UPN_SUFFIX}")
    print(f"  INFO  LDAP_USE_SSL = {settings.LDAP_USE_SSL}")
    print(f"  INFO  LDAP_USER_SEARCH_BASE = {settings.LDAP_USER_SEARCH_BASE}")
    print(f"  INFO  LDAP_LOCAL_ROOT_USERS = {settings.LDAP_LOCAL_ROOT_USERS}")

    # ── 2. Bind service account ─────────────────────────────────
    section("2. Bind com service account (LDAP_BIND_USER)")
    from core.utils.ldap import authenticate as ldap_auth

    if settings.LDAP_BIND_USER:
        sa_ok = ldap_auth(
            settings.LDAP_BIND_USER, settings.LDAP_BIND_PASSWORD
        )
        pass_fail(sa_ok, f"Bind como {settings.LDAP_BIND_USER}")
        if not sa_ok:
            print("  ⚠  Verifique LDAP_BIND_USER / LDAP_BIND_PASSWORD")
    else:
        print("  ⏭  LDAP_BIND_USER não configurado")

    # ── 3. Explorar árvore AD ───────────────────────────────────
    section("3. Explorar árvore AD")
    from core.utils.ldap import search_ldap, get_user_info

    search_base = settings.LDAP_USER_SEARCH_BASE or settings.LDAP_BASE_DN

    # 3a. Listar OUs
    print("  ── OUs encontradas ──")
    ous = search_ldap(
        search_base=settings.LDAP_BASE_DN,
        search_filter="(|(objectClass=organizationalUnit)(objectClass=container))",
        attributes=["distinguishedName", "name", "ou", "objectClass"],
    )
    for ou in ous:
        name = ou.get("name") or ou.get("ou") or ""
        if isinstance(name, list):
            name = name[0]
        print(f"    📁 {name}")
        print(f"       {ou['dn']}")

    print(f"\n  Total: {len(ous)} OUs/Containers")

    # 3b. Listar objetos no search_base
    print(f"\n  ── Objetos em {search_base} ──")
    objs = search_ldap(
        search_base=search_base,
        search_filter="(objectClass=*)",
        attributes=[
            "distinguishedName",
            "objectClass",
            "cn",
            "sAMAccountName",
            "displayName",
            "name",
            "description",
        ],
    )

    users = []
    groups = []
    others = []
    for obj in objs:
        cls = obj.get("objectClass")
        if isinstance(cls, list):
            cls_lower = [c.lower() for c in cls]
        else:
            cls_lower = [str(cls).lower()] if cls else []

        if "user" in cls_lower or "person" in cls_lower or "organizationalPerson" in cls_lower:
            users.append(obj)
        elif "group" in cls_lower:
            groups.append(obj)
        else:
            others.append(obj)

    for obj in users:
        name = (
            obj.get("displayName")
            or obj.get("name")
            or obj.get("cn")
            or obj.get("sAMAccountName")
            or ""
        )
        sam = obj.get("sAMAccountName") or ""
        dn = obj["dn"]
        if isinstance(name, list):
            name = name[0]
        if isinstance(sam, list):
            sam = sam[0]
        print(f"    👤 {name}  (sAMAccountName: {sam})")
        print(f"       {dn}")

    for obj in groups:
        name = obj.get("name") or obj.get("cn") or ""
        dn = obj["dn"]
        if isinstance(name, list):
            name = name[0]
        desc = obj.get("description") or ""
        if isinstance(desc, list):
            desc = desc[0] if desc else ""
        print(f"    👥 {name}  ({desc})")
        print(f"       {dn}")

    for obj in others:
        name = obj.get("name") or obj.get("cn") or ""
        cls_list = obj.get("objectClass") or []
        cls_label = cls_list[-1] if isinstance(cls_list, list) and cls_list else "?"
        print(f"    ❓ {name}  ({cls_label})")
        print(f"       {obj['dn']}")

    print(f"\n    {len(users)} usuários, {len(groups)} grupos, {len(others)} outros")

    # 3c. Busca específica
    if args.username:
        print(f"\n  ── Busca específica: {args.username} ──")
        info = get_user_info(args.username)
        if info:
            print(f"    sAMAccountName: {info.get('sAMAccountName')}")
            print(f"    displayName: {info.get('displayName')}")
            print(f"    mail: {info.get('mail')}")
            print(f"    DN: {info.get('dn')}")
            print(f"    memberOf ({len(info['memberOf'])} grupos):")
            for g in info["memberOf"]:
                cn = g.split(",")[0].replace("CN=", "")
                print(f"      • {cn}")
        else:
            print(f"    Nenhum resultado para '{args.username}'")

    # ── 4. Autenticar um usuário (bind direto) ──────────────────
    if args.username and args.password:
        section("4. Autenticar usuário (bind direto)")
        auth_ok = ldap_auth(args.username, args.password)
        pass_fail(auth_ok, f"Login {args.username}")

        if auth_ok:
            info = get_user_info(args.username)
            if info:
                print(f"  INFO  displayName: {info.get('displayName')}")
                print(f"  INFO  mail: {info.get('mail')}")
                print(f"  INFO  memberOf: {len(info['memberOf'])} grupos")
                for g in info["memberOf"]:
                    cn = g.split(",")[0].replace("CN=", "")
                    print(f"    • {cn}")
    else:
        print("\n  ⏭  Pule (use --username e --password para testar)")

    # ── 5. Sincronização (find-or-create no banco) ──────────────
    if args.username and args.password and args.check_db:
        section("5. Sincronizar usuário no banco (LdapIdentityService)")
        import asyncio

        from core.database import db
        from core.unit_of_work import UnitOfWork
        from core.modules.auth.services.ldap_identity import (
            LdapIdentityService,
        )

        async def test_sync():
            db.start()
            uow = UnitOfWork()
            svc = LdapIdentityService(uow)
            user = await svc.authenticate(args.username, args.password)
            if user:
                pass_fail(
                    True,
                    f"User criado/atualizado: {user.username} (id={user.id})",
                )
                print(f"  INFO  email: {user.email}")
                print(f"  INFO  ad_username: {user.ad_username}")
                print(f"  INFO  ad_dn: {user.ad_dn}")
                print(f"  INFO  last_login: {user.last_login}")
                print(f"  INFO  groups: {[g.name for g in user.groups]}")
            else:
                pass_fail(False, "Falha ao sincronizar usuário")
            await db.stop()

        asyncio.run(test_sync())
    elif args.check_db and not (args.username and args.password):
        print(
            "\n  ⏭  Pule (adicione --username e --password para testar sincronização)"
        )

    # ── 6. Listar mapeamentos AD → Grupos ───────────────────────
    if args.check_db:
        section("6. Mapeamentos AD → Grupos locais")
        import asyncio

        from sqlalchemy import select
        from sqlalchemy.orm import selectinload

        from core.database import db
        from core.unit_of_work import UnitOfWork
        from core.modules.auth.models.ad_mapping import AdGroupMapping

        async def list_mappings():
            db.start()
            uow = UnitOfWork()
            db_session = await uow.get_db_session()
            result = await db_session.execute(
                select(AdGroupMapping).options(
                    selectinload(AdGroupMapping.group)
                )
            )
            mappings = result.scalars().all()
            if mappings:
                for m in mappings:
                    print(f"  • AD: {m.ad_group_name}")
                    print(f"    DN: {m.ad_group_dn}")
                    print(f"    → Grupo local: {m.group.name}")
            else:
                print("  (nenhum mapeamento configurado)")
                print(
                    "  Acesse /admin/ldap-mapping para criar mapeamentos"
                )
            await db.stop()

        asyncio.run(list_mappings())

    print(f"\n{'='*60}")
    print("  Concluído!")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
