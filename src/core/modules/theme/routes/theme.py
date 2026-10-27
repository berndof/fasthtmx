from fastapi import Request
from fastapi.responses import JSONResponse

from core.modules.theme.constants import COOKIE_NAME
from core.router import ContextRouter, route


class ThemeRouter(ContextRouter):
    """Leitura de tema — cookie como fonte SSR."""

    prefix = "/api"
    require_auth = False

    @route.get("/theme", public=True)
    async def get_theme(self, request: Request):
        theme = getattr(request.state, "theme", None) or request.cookies.get(
            COOKIE_NAME, "arctic-light"
        )
        return JSONResponse({"theme": theme})
