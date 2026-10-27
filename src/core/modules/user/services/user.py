from sqlalchemy import exists, select, func

from core.audit import build_update_changes
from core.database import ObjectNotFound, UniqueViolation, DeletionBlockedError
from core.forms import FormError
from core.lists import ListQuery, ListResult
from core.models.basemodel import ObjectStatus
from core.modules.auth.security import hash_password_async
from core.modules.user.models import User
from core.schema import ModelSchema
from core.services import AbstractModelService
from core.settings import SKIP_CREATION_VERIFY, SKIP_REGISTRATION_VERIFY

from ..schemas.user import UserIn, UserUpdate


class UserService(AbstractModelService[User]):
    model = User

    async def create(self, data: UserIn, is_register=False) -> User:
        payload = data.model_dump()
        payload["password"] = await hash_password_async(payload["password"])

        group_names: list[str] = payload.pop("groups")

        try:
            new_user = await super().create(payload, no_commit=True)
        except UniqueViolation as uv:
            raise FormError({uv.key: uv.display})

        if not is_register and SKIP_CREATION_VERIFY:
            new_user.is_verified = True

        if is_register and SKIP_REGISTRATION_VERIFY:
            new_user.is_verified = True

        from ..services import GroupService

        group_service = GroupService(self.dbSession)
        try:
            for group_name in group_names:
                group = await group_service.get_one_by(name=group_name)
                await group_service.add_member(group, new_user, no_commit=True)

            await self.dbSession.commit()
            return new_user
        except Exception as e:
            await self.dbSession.rollback()
            raise e

    async def get_all(self, response_schema=None):
        stmt = select(self.model).where(self.model.status == ObjectStatus.ENABLE)
        result = await self.dbSession.execute(stmt)

        users = result.scalars().all()
        if not response_schema:
            return users

        serialized: list[ModelSchema] = [
            response_schema.model_validate(user) for user in users
        ]

        return serialized

    async def exists_by_username(self, username: str):
        stmt = select(User.id).where(User.username == username)
        exists_stmt = select(exists(stmt))
        result = await self.dbSession.execute(exists_stmt)
        return result.scalar_one()

    async def email_exists(self, email: str):
        stmt = select(self.model).where(User.email == email)
        result = await self.dbSession.execute(stmt)
        return result.scalar() is not None

    async def get_list_for_display(
        self,
        query: ListQuery | None = None,
        *,
        only_enabled=True,
    ) -> ListResult:
        """List view paginada com suporte a busca (`query.q`) e ordenação."""
        return await self.get_list_result(
            query,
            only_enabled=only_enabled,
            search_fields=["first_name", "last_name", "username", "email"],
            load_relations=["groups"],
        )

    async def get_blockers(
        self, user_id, current_user_id
    ) -> list[dict] | None:
        if current_user_id is not None and str(user_id) == str(current_user_id):
            return [
                {
                    "id": str(user_id),
                    "name": "sua própria conta (você está logado nela)",
                }
            ]
        return None

    async def _field_taken(self, field: str, value, exclude_id) -> bool:
        stmt = (
            select(self.model.id)
            .where(
                getattr(self.model, field) == value,
                self.model.id != exclude_id,
                self.model.status == ObjectStatus.ENABLE,
            )
            .limit(1)
        )
        result = await self.dbSession.execute(stmt)
        return result.scalar() is not None

    async def update_user(self, user_id, data: UserUpdate) -> User:
        user = await self.get_one_by(id=user_id)
        payload = data.model_dump()

        errors: dict[str, str] = {}
        if payload["username"] != user.username and await self._field_taken(
            "username", payload["username"], user.id
        ):
            errors["username"] = "Este nome de usuário já está em uso."
        if payload["email"] != user.email and await self._field_taken(
            "email", payload["email"], user.id
        ):
            errors["email"] = "Este e-mail já está em uso."
        if errors:
            raise FormError(errors)

        changes = build_update_changes(
            user,
            {
                "first_name": payload["first_name"],
                "last_name": payload["last_name"],
                "username": payload["username"],
                "email": payload["email"],
                "status": ObjectStatus.ENABLE.value
                if payload["is_enabled"]
                else ObjectStatus.DISABLE.value,
            },
        )

        user.first_name = payload["first_name"]
        user.last_name = payload["last_name"]
        user.username = payload["username"]
        user.email = payload["email"]

        if payload["is_enabled"]:
            if user.status != ObjectStatus.DELETED:
                user.status = ObjectStatus.ENABLE
        else:
            user.status = ObjectStatus.DISABLE

        # sincroniza os grupos por nome
        from ..services import GroupService

        desired = list(dict.fromkeys(payload["groups"]))
        all_groups = await GroupService(self.dbSession).get_list()
        groups_by_name = {g.name: g for g in all_groups}
        missing = [name for name in desired if name not in groups_by_name]
        if missing:
            raise FormError(
                {}, message=f"Grupos não encontrados: {', '.join(missing)}."
            )
        user.groups = [groups_by_name[name] for name in desired]

        await self.save(user)
        if changes:
            await self._log_action("UPDATE", user.id, changes)
        return user

    async def soft_delete(self, obj: User | None = None, **kwargs) -> bool:
        if not obj:
            obj = await self.get_one_by(**kwargs)
        
        blockers = await self.get_blockers(obj.id, current_user_id=kwargs.get("current_user_id"))
        if blockers:
            raise DeletionBlockedError(
                message=f"Não é possível desativar este usuário: {blockers[0]['name']}.",
                blocked_by=blockers,
            )

        now_ts = (await self.dbSession.execute(select(func.now()))).scalar()
        if now_ts:
            obj.username = obj.username + f"-deleted-{now_ts.timestamp()}"
            if obj.email:
                obj.email = obj.email + f"-deleted-{now_ts.timestamp()}"
                
        return await super().soft_delete(obj)

    async def reset_password(self, user: User, new_password: str) -> User:
        user.password = await hash_password_async(new_password)
        await self.save(user)
        return user

    async def verify_user(self, user: User) -> User:
        user.is_verified = True
        await self.save(user)
        return user

