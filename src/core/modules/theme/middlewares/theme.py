from __future__ import annotations

import logging
from typing import Any

from starlette.datastructures import MutableHeaders
from starlette.requests import Request
from starlette.responses import Response

from ..constants import (
    COOKIE_MAX_AGE,
    COOKIE_NAME,
    DEFAULT_DARK_THEME,
    DEFAULT_THEME,
    is_valid_theme,
)

logger = logging.getLogger("app.middleware.theme")

SKIP_PREFIXES = ("/static", "/vendor")


class ThemeMiddleware:
    """Resolve tema via cookie (fonte da verdade SSR).

    - Lê ``theme`` do cookie; se ausente/inválido tenta
      ``Sec-CH-Prefers-Color-Scheme`` (Client Hints) para primeira visita
      respeitar ``prefers-color-scheme`` sem JS.
    - Popula ``request.state.theme`` e ``request.state.theme_is_dark``.
    - Se o cookie estava ausente/inválido, injeta ``Set-Cookie`` na resposta
      para que o próximo F5 já venha correto sem JS.
    - Injeta ``Accept-CH: Sec-CH-Prefers-Color-Scheme`` e ``Vary: Cookie,
      Sec-CH-Prefers-Color-Scheme`` para negociação de hint no próximo request.
    - Sidebar permanece 100% client (localStorage) para manter transição suave.
    - Pattern ASGI puro (mesmo de SessionMiddleware) para não bufferizar streaming.
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

        raw = request.cookies.get(COOKIE_NAME)
        if is_valid_theme(raw):
            theme = raw  # type: ignore[assignment]
            needs_cookie = False
        else:
            # Primeira visita sem cookie válido — tenta Client Hints para
            # respeitar prefers-color-scheme sem precisar de JS.
            hint = request.headers.get("sec-ch-prefers-color-scheme", "").lower()
            if raw is None and hint == "dark":
                theme = DEFAULT_DARK_THEME
            elif raw is None and hint == "light":
                theme = DEFAULT_THEME
            else:
                theme = DEFAULT_THEME
            needs_cookie = True
            if raw is not None:
                logger.debug("theme cookie inválido '%s', fallback para %s", raw, theme)

        scope["state"]["theme"] = theme
        scope["state"]["theme_is_dark"] = theme.endswith("-dark")

        if not needs_cookie:
            # Mesmo quando cookie já existe, garante Accept-CH/Vary para
            # próxima primeira visita de outro device/tab.
            async def send_wrapper_no_cookie(message: dict) -> None:
                if message["type"] == "http.response.start":
                    headers = MutableHeaders(scope=message)
                    # Accept-CH para pedir hint na próxima navegação
                    if not headers.get("accept-ch"):
                        headers["accept-ch"] = "Sec-CH-Prefers-Color-Scheme"
                    vary = headers.get("vary")
                    needed = "Sec-CH-Prefers-Color-Scheme"
                    if vary:
                        if "Cookie" not in vary:
                            vary = f"{vary}, Cookie"
                        if needed not in vary:
                            vary = f"{vary}, {needed}"
                        headers["vary"] = vary
                    else:
                        headers["vary"] = f"Cookie, {needed}"
                await send(message)

            await self.app(scope, receive, send_wrapper_no_cookie)
            return

        async def send_wrapper(message: dict) -> None:
            if message["type"] == "http.response.start":
                headers = MutableHeaders(scope=message)
                existing = [v for v in headers.getlist("set-cookie") if v.startswith(f"{COOKIE_NAME}=")]
                if not existing:
                    headers.append("set-cookie", _theme_cookie_header(theme))
                headers["accept-ch"] = "Sec-CH-Prefers-Color-Scheme"
                vary = headers.get("vary")
                needed = "Sec-CH-Prefers-Color-Scheme"
                if vary:
                    parts = [p.strip() for p in vary.split(",")]
                    if "Cookie" not in parts:
                        parts.append("Cookie")
                    if needed not in parts:
                        parts.append(needed)
                    headers["vary"] = ", ".join(parts)
                else:
                    headers["vary"] = f"Cookie, {needed}"
            await send(message)

        await self.app(scope, receive, send_wrapper)


def _theme_cookie_header(value: str) -> str:
    response = Response()
    response.set_cookie(
        key=COOKIE_NAME,
        value=value,
        path="/",
        max_age=COOKIE_MAX_AGE,
        samesite="lax",
        httponly=False,
        secure=False,
    )
    for k, v in response.raw_headers:
        if k == b"set-cookie":
            return v.decode("latin-1")
    return ""
