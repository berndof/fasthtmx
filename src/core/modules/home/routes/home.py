from urllib.parse import urlparse

from fastapi import Request
from fastapi.responses import RedirectResponse
from sqlalchemy import select

from core.router.base import CustomRouter
from core.router.methods import get
from core.context import request_context
from core.settings import GUEST_SESSIONS_ENABLED
from core.modules.home.models.quick_access import QuickAccessItem
from core.modules.home.models.security_tip import SecurityTip
from core.modules.home.models.security_tip_config import SecurityTipConfig


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
                "favicon_url": compute_favicon_url(i.href, i.icon_url),
            }
            for i in items
        ]

        def truncate(text: str, max_len: int = 180) -> str:
            if len(text) <= max_len:
                return text
            return text[:max_len].rsplit(" ", 1)[0] + "..."

        tips_result = await db.execute(
            select(SecurityTip)
            .where(SecurityTip.is_active == True)
            .order_by(SecurityTip.ordem)
        )
        tips = tips_result.scalars().all()
        tips_data = [
            {"title": t.title, "content": truncate(t.content)} for t in tips
        ]

        config_result = await db.execute(select(SecurityTipConfig))
        tip_config = config_result.scalars().first()

        return self.render_template(
            request, "home.html", extra_context={
                "quick_access_items": items_data,
                "security_tips": tips_data,
                "security_tip_config": tip_config,
            }
        )

    @get("/nada/{name}")
    async def get_nada(self, request: Request, name: str):
        ctx = request_context.get({})
        self.logger.debug(ctx.get("name"))

        return self.render_template(request, "home.html")
