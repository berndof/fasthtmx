from fastapi import APIRouter, Request

# from core import registry
# from core.modules.auth.services.user import UserService
# from core.modules.auth.schemas.user import UserIn
from core.router.base import CustomRouter
from fastapi import Request
from core.router.methods import get, post
from core.context import request_context


class Login(CustomRouter):
    prefix: str = ""
    template_path = "../templates"

    @get("/login")
    async def get_login(self, request: Request):
        # self.logger.debug(request)

        # return {"Hello": "home"}
        # self.logger.debug(request_context.get("name"))

        return self.render_template(request, "home.html", htmx_block=None)

    @post("/login")
    async def get_nada(self, request: Request, user_auth_form: UserAuthForm):
        # self.logger.debug(request)
        # self.logger.debug(name)
        self.logger.debug(request_context.get("name"))

        return self.render_template(request, "home.html", htmx_block=None)
