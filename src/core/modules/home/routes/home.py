from fastapi import APIRouter, Request

# from core import registry
# from core.modules.auth.services.user import UserService
# from core.modules.auth.schemas.user import UserIn
from core.router.base import CustomRouter
from fastapi import Request
from core.router.methods import get
from core.context import request_context


class HomeRouter(CustomRouter):
    prefix: str = ""
    template_path = "../templates"

    @get("/home")
    async def get_home(self, request: Request):
        # self.logger.debug(request)
        # return {"Hello": "home"}
        self.logger.debug(request_context.get("name"))

        return self.render_template(request, "home.html")

    @get("/nada/{name}")
    async def get_nada(self, request: Request, name: str):
        # self.logger.debug(request)
        # self.logger.debug(name)
        request_context.set({"name": name})
        self.logger.debug(request_context.get("name"))

        return self.render_template(request, "home.html")
