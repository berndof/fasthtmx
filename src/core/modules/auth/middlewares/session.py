from __future__ import annotations

import logging
from typing import Any
from uuid import UUID

from starlette.datastructures import MutableHeaders
from starlette.requests import Request
from starlette.responses import Response

from core.database import sessionmanager

from ..models.auth_session import AuthSession
from ..utils import (
    ACCESS_COOKIE,
    COOKIE_PATH,
    REFRESH_COOKIE,
    decode_refresh_token,
    delete_auth_cookies,
    is_refresh_expired,
    issue_access_token,
    resolve_access_token,
)

logger = logging.getLogger("app.middleware.session")

SKIP_PREFIXES = ("/static", "/vendor")


class SessionMiddleware:
    """Resolve e renova a sessão via cookies (ASGI puro, não bufera streaming).

    Popula `scope["state"]["user_payload"]` (AccessTokenPayload | None). Se o
    access expirou/ausente mas o refresh for válido E a sessão estiver ativa no
    DB, renova o access e injeta o cookie na resposta (sem rotação). Se o
    refresh estiver revogado/expirado/inválido, apaga os cookies de auth.
    Não bloqueia nada: rotas públicas e proteção via Depends.
    """

    def __init__(self, app: Any, skip_prefixes: tuple[str, ...] = SKIP_PREFIXES):
        self.app = app
        self.skip_prefixes = skip_prefixes

    async def __call__(self, scope: dict, receive: Any, send: Any) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        path = scope.get("path", "")
        if path.startswith(self.skip_prefixes):
            await self.app(scope, receive, send)
            return

        request = Request(scope)
        scope.setdefault("state", {})

        payload = resolve_access_token(request.cookies.get(ACCESS_COOKIE))

        clear_cookies = False
        new_access: str | None = None

        if payload is None:
            refresh_payload = decode_refresh_token(request.cookies.get(REFRESH_COOKIE))
            if refresh_payload is not None:
                new_access = await self._renew_if_session_active(refresh_payload)
                if new_access:
                    payload = resolve_access_token(new_access)
                else:
                    clear_cookies = True

        scope["state"]["user_payload"] = payload

        if new_access is None and not clear_cookies:
            await self.app(scope, receive, send)
            return

        async def send_wrapper(message: dict) -> None:
            if message["type"] == "http.response.start":
                headers = MutableHeaders(scope=message)
                if clear_cookies:
                    for value in _delete_auth_cookie_headers():
                        headers.append("set-cookie", value)
                elif new_access:
                    headers.append(
                        "set-cookie",
                        _access_cookie_header(ACCESS_COOKIE, new_access),
                    )
            await send(message)

        await self.app(scope, receive, send_wrapper)

    @staticmethod
    async def _renew_if_session_active(refresh_payload) -> str | None:
        if is_refresh_expired(refresh_payload):
            return None

        factory = getattr(sessionmanager, "session_factory", None)
        if factory is None:
            return None

        try:
            async with factory() as db:
                session = await db.get(AuthSession, UUID(refresh_payload.jti))
                if session is None or session.revoked_at is not None:
                    return None
                return issue_access_token(
                    UUID(refresh_payload.sub), refresh_payload.jti
                )
        except Exception:
            logger.exception("falha ao validar sessão no renew")
            return None


def _access_cookie_header(key: str, value: str) -> str:
    response = Response()
    response.set_cookie(
        key=key,
        value=value,
        path=COOKIE_PATH,
        httponly=True,
        samesite="lax",
    )
    for k, v in response.raw_headers:
        if k == b"set-cookie":
            return v.decode("latin-1")
    return ""


def _delete_auth_cookie_headers() -> list[str]:
    response = Response()
    delete_auth_cookies(response)
    return [v.decode("latin-1") for k, v in response.raw_headers if k == b"set-cookie"]
