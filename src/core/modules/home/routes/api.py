from fastapi import Request, Query
from sqlalchemy import select

from core.router.base import CustomRouter
from core.router.methods import get
from core.modules.home.models.security_tip import SecurityTip
from core.modules.home.models.security_tip_config import SecurityTipConfig


def _truncate(text: str, max_len: int = 180) -> str:
    if len(text) <= max_len:
        return text
    return text[:max_len].rsplit(" ", 1)[0] + "..."


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
        total = len(tips)

        if not total:
            return self.Template.TemplateResponse(
                "componentes/_security_tip_card.html",
                {
                    "request": request,
                    "title": "Sem dicas no momento",
                    "content": "Em breve teremos novidades sobre seguran\u00e7a digital.",
                    "next_offset": 0,
                },
            )

        has_more = total > 1
        idx = offset % total
        tip = tips[idx]
        next_offset = (idx + 1) % total if has_more else 0

        return self.Template.TemplateResponse(
            "componentes/_security_tip_card.html",
            {
                "request": request,
                "title": tip.title,
                "content": _truncate(tip.content),
                "current": idx + 1,
                "total": total,
                "next_offset": next_offset,
            },
        )
