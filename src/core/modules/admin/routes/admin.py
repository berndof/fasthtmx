from fastapi import Request, Depends
from core.router.base import CustomRouter
from core.router.methods import get
from core.modules.auth.dependencies import require_group


class AdminRouter(CustomRouter):
    prefix = "/admin"
    template_path = "../templates"

    @get("/")
    async def admin_index(self, request: Request, _=require_group("admin")):
        return self.render_template(request, "admin.html")
