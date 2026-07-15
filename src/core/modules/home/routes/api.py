from fastapi import Request, Query
from sqlalchemy import select

from core.router.base import CustomRouter
from core.router.methods import get
from core.modules.home.models.security_tip import SecurityTip
from core.modules.home.models.security_tip_config import SecurityTipConfig


class SecurityTipsApiRouter(CustomRouter):
    prefix = "/api"
    template_path = "../templates"

    @get("/security-tips/next")
    async def next_tip(
        self,
        request: Request,
        offset: int = Query(0),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(SecurityTip)
            .where(SecurityTip.is_active == True)
            .order_by(SecurityTip.ordem)
        )
        tips = result.scalars().all()

        config_result = await db.execute(select(SecurityTipConfig))
        tip_config = config_result.scalars().first()
        interval = tip_config.interval_seconds if tip_config else 8

        def truncate(text: str, max_len: int = 120) -> str:
            if len(text) <= max_len:
                return text
            return text[:max_len].rsplit(" ", 1)[0] + "..."

        has_more = len(tips) > 1

        if not tips:
            return self.Template.TemplateResponse(
                "componentes/_security_tip_card.html",
                {
                    "request": request,
                    "title": "Sem dicas no momento",
                    "content": "Em breve teremos novidades sobre seguran\u00e7a digital.",
                    "next_offset": 0,
                    "interval": interval,
                    "has_more": False,
                },
            )

        idx = offset % len(tips)
        tip = tips[idx]
        next_offset = (idx + 1) % len(tips) if has_more else 0

        return self.Template.TemplateResponse(
            "componentes/_security_tip_card.html",
            {
                "request": request,
                "title": tip.title,
                "content": truncate(tip.content),
                "next_offset": next_offset,
                "interval": interval,
                "has_more": has_more,
            },
        )
