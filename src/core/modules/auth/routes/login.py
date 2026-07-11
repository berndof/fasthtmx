from fastapi import Request, Form
from starlette.responses import RedirectResponse
from core.router.base import CustomRouter
from core.router.methods import get, post
from core.modules.auth.services.identity import IdentityService
from core.modules.auth.schemas.auth import UserAuthForm
from pydantic import ValidationError


class Login(CustomRouter):
    prefix: str = ""
    template_path = "../templates"

    @get("/login")
    async def get_login(self, request: Request):
        return self.render_template(request, "login.html")

    @post("/login")
    async def login_post(
        self, request: Request, email: str = Form(...), password: str = Form(...)
    ):
        uow = request.scope.get("uow")
        identity = IdentityService(uow)

        try:
            UserAuthForm(email=email, password=password)
        except ValidationError:
            return self.render_template(
                request, "login.html", extra_context={"error": "Dados inválidos"}
            )

        user = await identity.authenticate(email, password)
        if not user:
            return self.render_template(
                request,
                "login.html",
                extra_context={"error": "Email ou senha inválidos"},
            )

        session = await identity.create_session(user)
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
