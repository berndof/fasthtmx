from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from starlette.responses import Response
from core.unit_of_work import UnitOfWork
from logging import getLogger
from fastapi.responses import RedirectResponse

logger = getLogger("app.session.middleware")


class SessionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        session = request.cookies.get("appSession")
        enable_guest_session = True

        logger.debug("Acessando uow de sessao agora")
        uow = request.scope["uow"]

        # try validate session

        if not session:
            # se guest enable
            # criar uma guest session
            ...
            if not enable_guest_session:
                return RedirectResponse("/login")

        # tenta ver se tenho uma sessao conectada
        # se nao existir uma sessao, e guest session for permitio, criar sessao nova.

        # se sessao expirada / invalida ou sem sessao
        # redirect to /login

        response = await call_next(request)

        # Depois da rota
        return response
