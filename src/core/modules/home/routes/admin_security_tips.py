from uuid import UUID

from fastapi import Request, Form
from sqlalchemy import select
from starlette.responses import RedirectResponse

from core.router.base import CustomRouter
from core.router.methods import get, post
from core.modules.auth.dependencies import require_group
from core.modules.home.models.security_tip import SecurityTip
from core.modules.home.models.security_tip_config import SecurityTipConfig


class SecurityTipsAdminRouter(CustomRouter):
    prefix = "/admin/dicas-seguranca"
    template_path = "../templates"

    @get("/")
    async def admin_list(self, request: Request, _=require_group("admin")):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(SecurityTip).order_by(SecurityTip.ordem)
        )
        tips = result.scalars().all()

        config = await db.execute(select(SecurityTipConfig))
        config = config.scalars().first()

        return self.render_template(
            request, "admin_security_tips.html",
            extra_context={"tips": tips, "config": config}
        )

    @get("/novo")
    async def form_novo(self, request: Request, _=require_group("admin")):
        return self.render_template(
            request, "admin_security_tips_form.html", extra_context={"tip": None}
        )

    @post("/novo")
    async def criar(
        self,
        request: Request,
        _=require_group("admin"),
        title: str = Form(...),
        content: str = Form(...),
        ordem: int = Form(0),
        is_active: bool = Form(False),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        tip = SecurityTip(
            title=title,
            content=content,
            ordem=ordem,
            is_active=is_active,
        )
        db.add(tip)
        await uow.commit()

        return RedirectResponse(url="/admin/dicas-seguranca", status_code=303)

    @get("/{tip_id}/editar")
    async def form_editar(
        self,
        request: Request,
        tip_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        tip = await db.get(SecurityTip, UUID(tip_id))
        return self.render_template(
            request,
            "admin_security_tips_form.html",
            extra_context={"tip": tip},
        )

    @post("/{tip_id}/editar")
    async def atualizar(
        self,
        request: Request,
        tip_id: str,
        _=require_group("admin"),
        title: str = Form(...),
        content: str = Form(...),
        ordem: int = Form(0),
        is_active: bool = Form(False),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        tip = await db.get(SecurityTip, UUID(tip_id))
        if tip:
            tip.title = title
            tip.content = content
            tip.ordem = ordem
            tip.is_active = is_active
            await uow.commit()

        return RedirectResponse(url="/admin/dicas-seguranca", status_code=303)

    @post("/{tip_id}/excluir")
    async def excluir(
        self,
        request: Request,
        tip_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        tip = await db.get(SecurityTip, UUID(tip_id))
        if tip:
            await db.delete(tip)
            await uow.commit()

        return RedirectResponse(url="/admin/dicas-seguranca", status_code=303)

    @post("/config")
    async def salvar_config(
        self,
        request: Request,
        _=require_group("admin"),
        interval_seconds: int = Form(8),
        is_enabled: bool = Form(False),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(select(SecurityTipConfig))
        config = result.scalars().first()

        if config:
            config.interval_seconds = interval_seconds
            config.is_enabled = is_enabled
        else:
            config = SecurityTipConfig(
                interval_seconds=interval_seconds,
                is_enabled=is_enabled,
            )
            db.add(config)

        await uow.commit()

        return RedirectResponse(url="/admin/dicas-seguranca", status_code=303)
