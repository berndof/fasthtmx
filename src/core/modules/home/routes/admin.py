from uuid import UUID
from urllib.parse import urlparse

from fastapi import Request, Form
from sqlalchemy import select
from starlette.responses import RedirectResponse

from core.router.base import CustomRouter
from core.router.methods import get, post
from core.modules.auth.dependencies import require_group
from core.modules.home.models.quick_access import QuickAccessItem


def compute_favicon_url(href: str, icon_url: str | None = None) -> str | None:
    if icon_url:
        return icon_url
    try:
        if not href.startswith(("http://", "https://")):
            href = f"https://{href}"
        parsed = urlparse(href)
        domain = parsed.netloc
        if domain and "." in domain:
            return f"http://{domain}/favicon.ico"
    except Exception:
        pass
    return None


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
        icon_url: str = Form(""),
        ordem: int = Form(0),
        is_active: bool = Form(False),
    ):
        if href and not href.startswith(("http://", "https://")):
            href = f"https://{href}"
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        item = QuickAccessItem(
            name=name,
            abbr=abbr,
            href=href,
            bg_class="bg-gray-100",
            text_class="text-gray-600",
            icon_url=icon_url or None,
            is_external=True,
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

    @get("/preview")
    async def admin_preview(self, request: Request, _=require_group("admin")):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(QuickAccessItem)
            .where(QuickAccessItem.is_active == True)
            .order_by(QuickAccessItem.is_special, QuickAccessItem.ordem)
        )
        items = result.scalars().all()
        items_data = [
            {
                "id": str(i.id),
                "name": i.name,
                "abbr": i.abbr,
                "href": i.href,
                "bgClass": i.bg_class,
                "textClass": i.text_class,
                "is_special": i.is_special,
            }
            for i in items
        ]

        return self.render_template(
            request, "admin_quick_access_preview.html",
            extra_context={"quick_access_items": items_data},
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
        icon_url: str = Form(""),
        ordem: int = Form(0),
        is_active: bool = Form(False),
    ):
        if href and not href.startswith(("http://", "https://")):
            href = f"https://{href}"
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        item = await db.get(QuickAccessItem, UUID(item_id))
        if item:
            item.name = name
            item.abbr = abbr
            item.href = href
            item.bg_class = "bg-gray-100"
            item.text_class = "text-gray-600"
            item.icon_url = icon_url or None
            item.is_external = True
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
