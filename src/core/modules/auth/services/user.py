from core.service import ModelService
from ..models.user import User
from ..models.group import Group
from core.schemas import BaseSchema
from sqlalchemy import select


class UserService(ModelService):
    model = User

    async def create(self, schema_in: BaseSchema):
        data = await self.request.form()

        v_data = schema_in.model_validate(data)

        new_user = self.model(v_data)

        db = await self.uow.get_db_session()
        db.add(new_user)
        await db.flush()

        result = await db.execute(select(Group).where(Group.name == "users"))
        users_group = result.scalar_one_or_none()
        if users_group:
            new_user.groups = [users_group]

        await self.uow.commit()
        await db.refresh(new_user)
