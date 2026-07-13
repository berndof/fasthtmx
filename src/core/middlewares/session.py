from uuid import uuid4
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from starlette.responses import Response
from logging import getLogger
from core.settings import GUEST_SESSIONS_ENABLED

logger = getLogger("app.session.middleware")


class SessionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        session = request.cookies.get("appSession")
        enable_guest_session = GUEST_SESSIONS_ENABLED

        if not session and enable_guest_session:
            guest_id = str(uuid4())
            request.state.guest_session_id = guest_id

        response = await call_next(request)

        if not session and enable_guest_session:
            guest_id = request.state.guest_session_id
            response.set_cookie(
                key="appSession",
                value=guest_id,
                httponly=True,
                samesite="lax",
                max_age=86400 * 7,
                path="/",
            )

        return response
