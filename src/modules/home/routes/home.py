from decimal import Decimal
from pathlib import Path

from fastapi import Depends, Request
from pydantic import Field

from core.deps import get_current_user
from core.forms import parse_form
from core.modules.auth.schemas import UserSession
from core.router import ContextRouter, route
from core.schema import (
    FormSchema,
    HtmlCheckbox,
    OptionalBRLDecimal,
    OptionalCleanDigits,
    OptionalStr,
)


class LabPlaygroundForm(FormSchema):
    project_name: str = Field(min_length=3, max_length=60)
    document: OptionalCleanDigits = None
    budget: OptionalBRLDecimal = Decimal("0.00")
    features: list[str] = Field(default_factory=list)
    active: HtmlCheckbox = True
    notes: OptionalStr = None


class HomeRouter(ContextRouter):
    prefix: str = "/home"
    templates_path = Path(__file__).parent.parent / "templates"

    async def _build_parent_context(self, initial_subpage: str = "arquitetura") -> dict:
        return {
            "page": {"title": "FastHTMX — Playground & Core"},
            "initial_subpage": initial_subpage,
            "tabs": [
                {"key": "arquitetura", "label": "Arquitetura", "icon": "layers", "url": "/home/arquitetura"},
                {"key": "macros", "label": "Macros & Softnav", "icon": "code-2", "url": "/home/macros"},
                {"key": "status", "label": "Sessão & Diagnóstico", "icon": "activity", "url": "/home/status"},
            ],
        }

    @route.get("")
    async def index(
        self,
        request: Request,
        user: UserSession = Depends(get_current_user),
    ):
        ctx = await self._build_parent_context("arquitetura")
        return self.dynamic_template_response(
            request,
            "pages/home.html",
            context=ctx,
            title="FastHTMX — Início",
        )

    @route.post("/playground")
    async def submit_playground(
        self,
        request: Request,
        user: UserSession = Depends(get_current_user),
    ):
        form = await parse_form(request, LabPlaygroundForm)
        ctx = await self._build_parent_context("arquitetura")

        if form.failed:
            return self.form_error_response(
                request,
                "pages/home.html",
                form=form,
                block="playground_form",
                extra=ctx,
            )

        ctx["form"] = form
        ctx["submitted_data"] = form.data.model_dump()
        return self.chunk_response(
            request,
            "pages/home.html",
            block="playground_form",
            context=ctx,
            triggers={
                "notify": {
                    "variant": "success",
                    "title": "Formulário validado",
                    "message": f"Projeto '{form.data.project_name}' processado com sucesso.",
                }
            },
        )

    @route.get("/arquitetura")
    async def tab_arquitetura(self, request: Request):
        return await self.subpage_response(
            request,
            chunk_template="subpage/arquitetura.html",
            parent_template="pages/home.html",
            subpage_key="arquitetura",
            parent_context_builder=lambda: self._build_parent_context("arquitetura"),
        )

    @route.get("/macros")
    async def tab_macros(self, request: Request):
        return await self.subpage_response(
            request,
            chunk_template="subpage/macros.html",
            parent_template="pages/home.html",
            subpage_key="macros",
            parent_context_builder=lambda: self._build_parent_context("macros"),
        )

    @route.get("/status")
    async def tab_status(
        self,
        request: Request,
        user: UserSession = Depends(get_current_user),
    ):
        return await self.subpage_response(
            request,
            chunk_template="subpage/status.html",
            parent_template="pages/home.html",
            subpage_key="status",
            parent_context_builder=lambda: self._build_parent_context("status"),
            chunk_context={
                "theme": getattr(request.state, "theme", "arctic-light"),
                "client_ip": request.client.host if request.client else "127.0.0.1",
            },
        )
