from fastapi import Request, Form
from fastapi.responses import HTMLResponse, Response
from starlette.responses import RedirectResponse
from sqlalchemy import or_, select
from core.router.base import CustomRouter
from core.router.methods import get, post
from core.context import request_context
from core.modules.auth.services.identity import IdentityService
from core.modules.auth.services.ldap_identity import LdapIdentityService
from core.modules.auth.models.user import User
from core.modules.auth.utils import verify_password
from core.settings import LDAP_ENABLED, LDAP_LOCAL_ROOT_USERS


class Login(CustomRouter):
    prefix: str = ""
    template_path = "../templates"

    @get("/login")
    async def get_login(self, request: Request):
        return self.render_template(
            request,
            "login.html",
            extra_context={"ldap_enabled": LDAP_ENABLED},
        )

    @post("/login")
    async def login_post(
        self,
        request: Request,
        username: str = Form(...),
        password: str = Form(...),
    ):
        uow = request.scope.get("uow")
        is_htmx = self.is_htmx_request(request)

        if not username or not password:
            return self._login_error_response(request, "Dados inválidos", is_htmx)

        if LDAP_ENABLED:
            if username in LDAP_LOCAL_ROOT_USERS:
                user = await self._local_auth(uow, username, password)
            else:
                ldap_identity = LdapIdentityService(uow)
                user = await ldap_identity.authenticate(username, password)
                if user:
                    session = await ldap_identity.create_session(user)
                    return self._make_session_response(session, is_htmx)

            if not user:
                return self._login_error_response(request, "Usuário ou senha inválidos", is_htmx)

            identity = IdentityService(uow)
            session = await identity.create_session(user)
        else:
            identity = IdentityService(uow)
            user = await identity.authenticate(username, password)
            if not user:
                return self._login_error_response(request, "Email ou senha inválidos", is_htmx)

            session = await identity.create_session(user)

        return self._make_session_response(session, is_htmx)

    async def _local_auth(self, uow, username: str, password: str) -> User | None:
        db = await uow.get_db_session()
        result = await db.execute(
            select(User).where(
                or_(User.username == username, User.email == username)
            )
        )
        user = result.scalar_one_or_none()
        if not user or not verify_password(password, user.password_hash):
            return None
        return user

    def _make_session_response(self, session, is_htmx: bool = False):
        if is_htmx:
            response = Response(status_code=200)
            response.headers["HX-Redirect"] = "/home"
        else:
            response = RedirectResponse(url="/home", status_code=302)
        response.set_cookie(
            key="appSession",
            value=str(session.id),
            httponly=True,
            samesite="lax",
            max_age=86400 * 7,
            path="/",
        )
        return response

    def _login_error_response(self, request: Request, error: str, is_htmx: bool):
        context = {"error": error, "ldap_enabled": LDAP_ENABLED}
        if is_htmx:
            ctx = request_context.get({})
            context.update({
                "request": request,
                "user": ctx.get("user"),
                "session_type": ctx.get("session_type", "guest"),
                "groups": ctx.get("groups", []),
            })
            html = self.Template.get_template("_login_form.html").render(context)
            return HTMLResponse(content=html)
        return self.render_template(
            request, "login.html", extra_context=context
        )

    @post("/logout")
    async def logout_post(self, request: Request):
        session_id = request.cookies.get("appSession")
        if session_id:
            from uuid import UUID

            uow = request.scope.get("uow")
            identity = IdentityService(uow)
            await identity.delete_session(UUID(session_id))

        response = RedirectResponse(url="/login", status_code=302)
        response.delete_cookie("appSession", path="/")
        return response
