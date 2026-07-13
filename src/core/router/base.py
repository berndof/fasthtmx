from inspect import getfile
from logging import getLogger
from pathlib import Path

from fastapi import APIRouter, Request
from fastapi.responses import Response
from jinja2_fragments.fastapi import Jinja2Blocks
from core.router.router import ContextRoute
from core.context import request_context
from core.settings import BASE_DIR


class CustomRouter:
    prefix: str = ""
    routes = []

    def __init__(self, templates_dir: str | None = None):
        self.logger = getLogger(f"app.{self.__class__.__name__.lower()}")
        self.router = APIRouter(
            prefix=self.prefix, route_class=ContextRoute
        )  # route_class =

        self._setup_routes()
        self.Template = self._setup_template(templates_dir)
        self.default_template_block = "content"

    def _setup_routes(self):
        for method, path, func_name in self.routes:
            self.router.add_api_route(path, getattr(self, func_name), methods=[method])

    def _setup_template(self, templates_dir: str | None = None):
        # SETUP JINJA 2 TEMPLATES
        if not templates_dir:
            templates_dir = str(
                Path(getfile(self.__class__)).parent.parent / "templates"
            )

        # self.logger.debug(f"path: {template_path} from {self.__class__.__name__}")

        core_templates = str(BASE_DIR / "core/templates")
        root_templates = str(BASE_DIR / "templates")

        return Jinja2Blocks([templates_dir, core_templates, root_templates])

    @classmethod
    def __init_subclass__(cls):
        cls.routes = []

        for name, obj in cls.__dict__.items():
            if hasattr(obj, "__route__"):
                cls.routes.append((*obj.__route__, name))

    def is_htmx_request(self, request: Request):
        if not request.headers.get("hx-request") == "true":
            return False
        else:
            return True

    def update_htmx_title_after_swap(self, response: Response, title: str):
        response.headers["HX-Trigger-After-Swap"] = str({"updateTitle": title})

        return response

    def render_template(
        self,
        request: Request,
        template: str,
        htmx_block: str | None = "content",
        extra_context: dict | None = None,
    ):
        ctx = request_context.get({})
        user = ctx.get("user")
        session_type = ctx.get("session_type", "guest")
        groups = ctx.get("groups", [])
        context = {
            "request": request,
            "user": user,
            "session_type": session_type,
            "groups": groups,
        }
        if extra_context:
            context.update(extra_context)

        if self.is_htmx_request(request) and htmx_block:
            response = self.Template.TemplateResponse(
                template, context, block_name=htmx_block
            )

        else:
            response = self.Template.TemplateResponse(template, context)

        return response
