from fastapi import Depends, Request
from fastapi.responses import RedirectResponse, Response

from core.deps import get_db
from core.router import ContextRouter, route

from ..services import AuthService
from ..utils import (
    ACCESS_COOKIE,
    REFRESH_COOKIE,
    decode_refresh_token,
    delete_auth_cookies,
    resolve_access_token,
)


class Logout(ContextRouter):
    prefix: str = ""
    require_auth: bool = False

    @route.post("/logout", public=True)
    async def post_logout(self, request: Request, dbSession=Depends(get_db)):
        jti = None

        refresh_payload = decode_refresh_token(request.cookies.get(REFRESH_COOKIE))
        if refresh_payload is not None:
            jti = refresh_payload.jti
        else:
            access_payload = resolve_access_token(request.cookies.get(ACCESS_COOKIE))
            jti = access_payload.jti if access_payload else None

        if jti:
            await AuthService(dbSession).revoke_session(jti)

        is_htmx = request.headers.get("hx-request") == "true"
        response: Response = (
            Response(status_code=200) if is_htmx else RedirectResponse("/login", 302)
        )
        delete_auth_cookies(response)
        if is_htmx:
            response.headers["HX-Redirect"] = "/login"
        return response
