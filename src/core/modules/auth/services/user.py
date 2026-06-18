from core.service import ModelService
from ..models.user import User
from core.schemas import BaseSchema


class UserService(ModelService):
    model = User

    # instancia do schema ?
    async def create(self, schema_in: BaseSchema):
        data = await self.request.form()

        # validar data de entrada com os schemas
        v_data = schema_in.model_validate(data)

        # tratar exceção na validação, formatar erro para o template

        # cria o modelo do orm
        new_user = self.model(v_data)

        # db session,
        db = await self.uow.get_pg_session()
        db.add(new_user)

        # trata exceçção no commit
        await self.uow.commit()

        await db.refresh(new_user)
