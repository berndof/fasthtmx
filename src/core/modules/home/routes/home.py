from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse

# from core import registry
# from core.modules.auth.services.user import UserService
# from core.modules.auth.schemas.user import UserIn
from core.router.base import CustomRouter
from fastapi import Request
from core.router.methods import get
from core.context import request_context
from core.settings import GUEST_SESSIONS_ENABLED


class HomeRouter(CustomRouter):
    prefix: str = ""
    template_path = "../templates"

    @get("/")
    async def root_redirect(self, request: Request):
        ctx = request_context.get({})
        user = ctx.get("user")

        if GUEST_SESSIONS_ENABLED:
            return RedirectResponse(url="/home", status_code=302)
        else:
            if user:
                return RedirectResponse(url="/home", status_code=302)
            return RedirectResponse(url="/login", status_code=302)

    @get("/home")
    async def get_home(self, request: Request):
        # self.logger.debug(request)
        # return {"Hello": "home"}
        ctx = request_context.get({})
        user = ctx.get("user")

        # self.logger.debug(ctx.get("name"))

        if not GUEST_SESSIONS_ENABLED and not user:
            return RedirectResponse(url="/login", status_code=302)

        return self.render_template(request, "home.html")

    @get("/nada/{name}")
    # @permission(group="group_name")
    async def get_nada(self, request: Request, name: str):
        # self.logger.debug(request)
        # self.logger.debug(name)

        ctx = request_context.get({})
        self.logger.debug(ctx.get("name"))

        return self.render_template(request, "home.html")
