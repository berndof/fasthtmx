from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse

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

    # REDIRECT / -> /home
    # @get("/")
    # async def root_redirect(self, request: Request):  # verificar cookie de user):
    #    return RedirectResponse(url="/home", #status_code=302)

    @get("/home")
    async def get_home(self, request: Request):
        # self.logger.debug(request)
        # return {"Hello": "home"}
        self.logger.debug(request_context.get("name"))

        return self.render_template(request, "home.html")

    @get("/nada/{name}")
    # @permission(group="group_name")
    async def get_nada(self, request: Request, name: str):
        # self.logger.debug(request)
        # self.logger.debug(name)

        self.logger.debug(request_context.get("name"))

        return self.render_template(request, "home.html")
