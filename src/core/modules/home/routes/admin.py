from uuid import UUID

from fastapi import Request, Form
from sqlalchemy import select
from starlette.responses import RedirectResponse

from core.router.base import CustomRouter
from core.router.methods import get, post
from core.modules.auth.dependencies import require_group
from core.modules.home.models.quick_access import QuickAccessItem


class QuickAccessAdminRouter(CustomRouter):
    prefix = "/admin/acesso-rapido"
    template_path = "../templates"

    @get("/")
    async def admin_list(self, request: Request, _=require_group("admin")):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(QuickAccessItem).order_by(QuickAccessItem.is_special, QuickAccessItem.ordem)
        )
        items = result.scalars().all()

        return self.render_template(
            request, "admin_quick_access.html", extra_context={"items": items}
        )

    @get("/novo")
    async def form_novo(self, request: Request, _=require_group("admin")):
        return self.render_template(
            request, "admin_quick_access_form.html", extra_context={"item": None}
        )

    @post("/novo")
    async def criar(
        self,
        request: Request,
        _=require_group("admin"),
        name: str = Form(...),
        abbr: str = Form(...),
        href: str = Form("#"),
        bg_class: str = Form("bg-black/10"),
        text_class: str = Form("text-black"),
        ordem: int = Form(0),
        is_active: bool = Form(False),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        item = QuickAccessItem(
            name=name,
            abbr=abbr,
            href=href,
            bg_class=bg_class,
            text_class=text_class,
            ordem=ordem,
            is_active=is_active,
        )
        db.add(item)
        await uow.commit()

        return RedirectResponse(url="/admin/acesso-rapido", status_code=303)

    @get("/{item_id}/editar")
    async def form_editar(
        self,
        request: Request,
        item_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        item = await db.get(QuickAccessItem, UUID(item_id))
        return self.render_template(
            request,
            "admin_quick_access_form.html",
            extra_context={"item": item},
        )

    @post("/{item_id}/editar")
    async def atualizar(
        self,
        request: Request,
        item_id: str,
        _=require_group("admin"),
        name: str = Form(...),
        abbr: str = Form(...),
        href: str = Form("#"),
        bg_class: str = Form("bg-black/10"),
        text_class: str = Form("text-black"),
        ordem: int = Form(0),
        is_active: bool = Form(False),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        item = await db.get(QuickAccessItem, UUID(item_id))
        if item:
            item.name = name
            item.abbr = abbr
            item.href = href
            item.bg_class = bg_class
            item.text_class = text_class
            item.ordem = ordem
            item.is_active = is_active
            await uow.commit()

        return RedirectResponse(url="/admin/acesso-rapido", status_code=303)

    @post("/{item_id}/excluir")
    async def excluir(
        self,
        request: Request,
        item_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        item = await db.get(QuickAccessItem, UUID(item_id))
        if item and not item.is_special:
            await db.delete(item)
            await uow.commit()

        return RedirectResponse(url="/admin/acesso-rapido", status_code=303)
