import asyncio
from datetime import datetime, timezone
from functools import partial
from logging import getLogger

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from core.unit_of_work import UnitOfWork
from core.utils.ldap import authenticate as ldap_authenticate
from core.utils.ldap import get_user_info as ldap_get_user_info
from core.modules.auth.models.user import User
from core.modules.auth.models.group import Group
from core.modules.auth.models.ad_mapping import AdGroupMapping
from core.modules.auth.models.session import UserSession
from core.settings import LDAP_UPN_SUFFIX

logger = getLogger("app.ldap-identity")
logger.setLevel("DEBUG")


class LdapIdentityService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def authenticate(self, username: str, password: str) -> User | None:
        loop = asyncio.get_running_loop()

        valid = await loop.run_in_executor(
            None, partial(ldap_authenticate, username, password)
        )
        if not valid:
            return None

        info = await loop.run_in_executor(
            None, partial(ldap_get_user_info, username)
        )
        if not info:
            return None

        return await self._sync_user(username, info)

    async def _sync_user(self, username: str, info: dict) -> User:
        db = await self.uow.get_db_session()

        result = await db.execute(
            select(User).where(User.ad_username == username)
        )
        user = result.scalar_one_or_none()

        is_first_login = user is None

        if not user:
            email = info.get("mail") or f"{username}@{LDAP_UPN_SUFFIX}"
            display_name = info.get("displayName") or username
            user = User(
                username=display_name,
                email=email,
                password_hash="",
                ad_username=username,
                ad_dn=info.get("dn"),
            )
            db.add(user)
            await db.flush()
        else:
            user.ad_dn = info.get("dn")
            if info.get("mail"):
                user.email = info["mail"]
            if info.get("displayName"):
                user.username = info["displayName"]

        user.last_login = datetime.now(timezone.utc)

        if is_first_login:
            await self._add_to_base_group(db, user)
        else:
            await self._sync_groups(db, user, info.get("memberOf", []))

        await self.uow.commit()
        await db.refresh(user)

        _ = user.groups
        return user

    async def _sync_groups(self, db, user: User, ad_group_dns: list[str]):
        result = await db.execute(
            select(AdGroupMapping).options(selectinload(AdGroupMapping.group))
        )
        all_mappings = result.scalars().all()

        ad_group_dn_set = set(ad_group_dns)

        managed_group_ids = {m.group_id for m in all_mappings}

        mapped_group_ids = [
            m.group_id for m in all_mappings if m.ad_group_dn in ad_group_dn_set
        ]

        if mapped_group_ids:
            result = await db.execute(
                select(Group).where(Group.id.in_(mapped_group_ids))
            )
            ad_groups = result.scalars().all()
        else:
            ad_groups = []

        user.groups = [
            g for g in user.groups if g.id not in managed_group_ids
        ] + list(ad_groups)

    async def _add_to_base_group(self, db, user: User):
        result = await db.execute(
            select(Group).where(Group.name == "users")
        )
        users_group = result.scalar_one_or_none()
        if users_group:
            user.groups = [users_group]

    async def create_session(self, user: User) -> UserSession:
        db = await self.uow.get_db_session()
        session = UserSession(user_id=user.id)
        db.add(session)
        await self.uow.commit()
        await db.refresh(session)
        return session

    async def delete_session(self, session_id):
        from core.modules.auth.services.identity import IdentityService

        svc = IdentityService(self.uow)
        await svc.delete_session(session_id)
