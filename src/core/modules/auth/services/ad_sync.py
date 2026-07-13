from logging import getLogger

from sqlalchemy import select

from core.unit_of_work import UnitOfWork
from core.utils.ldap import search_ldap
from core.modules.auth.models.group import Group
from core.modules.auth.models.ad_mapping import AdGroupMapping
from core.settings import LDAP_BASE_DN, LDAP_USER_SEARCH_BASE

logger = getLogger("app.ad-sync")


class AdSyncResult:
    def __init__(self):
        self.groups_created = 0
        self.mappings_created = 0
        self.mappings_existing = 0
        self.errors: list[str] = []

    @property
    def total(self):
        return self.groups_created + self.mappings_created + self.mappings_existing

    def __str__(self):
        parts = []
        if self.groups_created:
            parts.append(f"{self.groups_created} grupos criados")
        if self.mappings_created:
            parts.append(f"{self.mappings_created} mapeamentos novos")
        if self.mappings_existing:
            parts.append(f"{self.mappings_existing} já existiam")
        if self.errors:
            parts.append(f"{len(self.errors)} erros")
        return ", ".join(parts) if parts else "nada alterado"


class AdSyncService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def sync_groups(
        self,
        search_base: str | None = None,
        group_filter: str = "(objectClass=group)",
        name_prefix: str = "",
    ) -> AdSyncResult:
        result = AdSyncResult()
        _search_base = search_base or LDAP_USER_SEARCH_BASE or LDAP_BASE_DN

        groups_ad = search_ldap(
            search_base=_search_base,
            search_filter=group_filter,
            attributes=[
                "distinguishedName",
                "cn",
                "name",
                "description",
                "sAMAccountName",
            ],
        )

        if not groups_ad and _search_base != LDAP_BASE_DN:
            _search_base = LDAP_BASE_DN
            groups_ad = search_ldap(
                search_base=_search_base,
                search_filter=group_filter,
                attributes=[
                    "distinguishedName",
                    "cn",
                    "name",
                    "description",
                    "sAMAccountName",
                ],
            )

        if not groups_ad:
            return result

        db = await self.uow.get_db_session()

        for ad_group in groups_ad:
            cn = ad_group.get("cn") or ad_group.get("name") or ""
            if isinstance(cn, list):
                cn = cn[0] if cn else "unknown"
            dn = ad_group["dn"]
            desc = ad_group.get("description") or ""
            if isinstance(desc, list):
                desc = desc[0] if desc else ""

            local_name = f"{name_prefix}{cn}" if name_prefix else cn

            try:
                stmt = select(Group).where(Group.name == local_name)
                existing = await db.execute(stmt)
                local_group = existing.scalar_one_or_none()

                if not local_group:
                    local_group = Group(
                        name=local_name,
                        description=desc or f"Importado do AD: {cn}",
                    )
                    db.add(local_group)
                    await db.flush()
                    result.groups_created += 1

                stmt = select(AdGroupMapping).where(
                    AdGroupMapping.group_id == local_group.id
                )
                existing_map = await db.execute(stmt)
                mapping = existing_map.scalar_one_or_none()

                if not mapping:
                    mapping = AdGroupMapping(
                        ad_group_name=cn,
                        ad_group_dn=dn,
                        group_id=local_group.id,
                    )
                    db.add(mapping)
                    await db.flush()
                    result.mappings_created += 1
                else:
                    result.mappings_existing += 1

            except Exception as e:
                result.errors.append(f"{cn}: {e}")
                logger.error(f"Erro ao sincronizar grupo {cn}: {e}")

        await self.uow.commit()
        return result
