from uuid import UUID

from fastapi import Depends, Request
from fastapi.responses import Response

from core.deps import get_current_user, get_db
from core.modules.auth import utils
from core.modules.auth.services import AuthService
from core.router import ContextRouter, route

from ..schemas import UserSession


class Sessions(ContextRouter):
    prefix: str = "/sessions"

    @route.get("")
    async def get_sessions(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user: UserSession = Depends(get_current_user),
    ):
        svc = AuthService(dbSession)
        sessions = await svc.list_user_sessions(user.id)
        current_jti = getattr(getattr(request.state, "user_payload", None), "jti", None)
        if current_jti:
            current_jti = str(UUID(current_jti))
        context = {
            "page": {"title": "Minhas sessões"},
            "user": user,
            "sessions": sessions,
            "current_jti": current_jti,
        }
        return self.dynamic_template_response(request, "sessions.html", context=context)

    @route.post("/revoke/{jti}")
    async def revoke_session(
        self,
        jti: str,
        request: Request,
        dbSession=Depends(get_db),
        user: UserSession = Depends(get_current_user),
    ):
        svc = AuthService(dbSession)
        await svc.revoke_session(jti, user_id=user.id)

        current_jti = getattr(getattr(request.state, "user_payload", None), "jti", None)
        if current_jti:
            current_jti = str(UUID(current_jti))

        if str(UUID(jti)) == current_jti:
            response = Response(status_code=200)
            utils.delete_auth_cookies(response)
            response.headers["HX-Redirect"] = "/login"
            return response

        response = Response(status_code=200)
        response.headers["HX-Refresh"] = "true"
        return response
