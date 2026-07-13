from fastapi import Request
from fastapi.responses import RedirectResponse
from sqlalchemy import select

from core.router.base import CustomRouter
from core.router.methods import get
from core.context import request_context
from core.settings import GUEST_SESSIONS_ENABLED
from core.modules.home.models.quick_access import QuickAccessItem


class HomeRouter(CustomRouter):
    prefix: str = ""
    template_path = "../templates"

    @get("/")
    async def root_redirect(self, request: Request):
        ctx = request_context.get({})
        user = ctx.get("user")

        if GUEST_SESSIONS_ENABLED:
            return RedirectResponse(url="/home", status_code=302)
        else:
            if user:
                return RedirectResponse(url="/home", status_code=302)
            return RedirectResponse(url="/login", status_code=302)

    @get("/home")
    async def get_home(self, request: Request):
        ctx = request_context.get({})
        user = ctx.get("user")

        if not GUEST_SESSIONS_ENABLED and not user:
            return RedirectResponse(url="/login", status_code=302)

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
            request, "home.html", extra_context={"quick_access_items": items_data}
        )

    @get("/nada/{name}")
    async def get_nada(self, request: Request, name: str):
        ctx = request_context.get({})
        self.logger.debug(ctx.get("name"))

        return self.render_template(request, "home.html")
