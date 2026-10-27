import os

from fastapi import Depends, Request
from fastapi.responses import RedirectResponse, Response

from core.deps.db import get_db
from core.forms import FormError, parse_form
from core.router import ContextRouter, route
from core.settings import APP_NAME, LDAP_ENABLED, LDAP_LOCAL_ROOT_USERS

from ..schemas import UserAuthForm
from ..services import AuthService
from ..utils import set_auth_cookies


class Login(ContextRouter):
    prefix: str = ""
    require_auth: bool = False
    post_login_redirect: str = os.environ.get("POST_LOGIN_REDIRECT", "/home")

    @route.get("/login", public=True)
    async def get_login(self, request: Request):
        if getattr(request.state, "current_user", None) is not None:
            return RedirectResponse(self.post_login_redirect, status_code=302)

        page = {"title": f"{APP_NAME} - Login"}
        context = {"page": page, "form": {}}
        return self.dynamic_template_response(request, "login.html", context=context)

    def _render_login_error(self, request: Request, result, page: dict):
        error_msg = result.global_error or "Credenciais inválidas"
        hx_current_url = request.headers.get("HX-Current-URL", "")
        is_dropdown = (
            self.is_htmx_request(request)
            and bool(hx_current_url)
            and not hx_current_url.rstrip("/").endswith("/login")
        )
        if is_dropdown:
            try:
                self.Template.env.get_template("_login_form.html")
                return self.full_template_response(
                    request,
                    "_login_form.html",
                    context={"page": page, "error": error_msg, "form": result.state["form"]},
                )
            except Exception:
                pass

        return self.form_error_response(
            request,
            "login.html",
            result,
            block="login_form",
            context={"page": page, "error": error_msg},
        )

    @route.post("/login", public=True)
    async def post_login(self, request: Request, dbSession=Depends(get_db)):
        page = {"title": f"{APP_NAME} - Login"}

        result = await parse_form(request, UserAuthForm, hidden={"password"})

        if not result.ok:
            return self._render_login_error(request, result, page)

        data: UserAuthForm = result.validated  # pyright: ignore[reportAssignmentType]
        auth_service = AuthService(dbSession)
        user_agent = request.headers.get("user-agent")
        ip = request.client.host if request.client else None

        try:
            ldap_handler = getattr(request.app.state, "ldap_authenticate", None)
            if (
                LDAP_ENABLED
                and ldap_handler is not None
                and data.identifier not in LDAP_LOCAL_ROOT_USERS
            ):
                user = await ldap_handler(dbSession, data.identifier, data.password)
                if user is None:
                    raise FormError(message="Usuário ou senha inválidos")
                token_result = await auth_service.create_session_for_user(
                    user.id, user_agent=user_agent, ip=ip
                )
            else:
                token_result = await auth_service.login(
                    data,
                    user_agent=user_agent,
                    ip=ip,
                )
        except FormError as exc:
            result.add_errors(exc.errors, message=exc.message)
            return self._render_login_error(request, result, page)

        is_htmx = self.is_htmx_request(request)
        response: Response = (
            Response(status_code=200)
            if is_htmx
            else RedirectResponse(self.post_login_redirect, status_code=302)
        )
        set_auth_cookies(response, token_result.pair)
        if is_htmx:
            response.headers["HX-Redirect"] = self.post_login_redirect
        return response
