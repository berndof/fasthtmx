from fastapi import APIRouter, Request
from core.modules.auth.services.user import UserService
from core.modules.auth.schemas.user import UserIn

# router = APIRouter(prefix="/users", route_class=ContextRoute)
# registry.register_router(router)


""" @router.get("/create")
def get_create_user(
    request: Request,
):
    return {"Hello", "World"}


@router.post("/create")
def post_create_user(request: Request): """

# service = UserService(request, in_schema=UserIn)

# extrair oque tem de context na request com um pop (remover da request)

# mistrurar o contexto da request com o contexto que vai para o template

# response = await service.create().to_htmx("template para o block")

# push notificaçãõ para user

# monta reposta aqui é´so um 200 e um redirect
