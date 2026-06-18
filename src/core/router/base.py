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
        if not templates_dir:
            templates_dir = str(
                Path(getfile(self.__class__)).parent.parent / "templates"
            )

        # self.logger.debug(f"path: {template_path} from {self.__class__.__name__}")

        shared_templates = str(BASE_DIR / "core/templates")

        return Jinja2Blocks([templates_dir, shared_templates])

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
        self, request: Request, template: str, htmx_block: str | None = "content"
    ):
        # extrair o contexto do request.state.ctx

        # context = request.state.pop("ctx")
        cxx = request_context.get("user")
        # self.logger.debug(cxx)

        context = {"request": request}
        # context["request"] = request

        if (
            self.is_htmx_request(request) and htmx_block
        ):  # retorna somente o bloco do htmx
            response = self.Template.TemplateResponse(
                template, context, block_name=htmx_block
            )
            # update title

        else:  # retorna o template inteiro
            response = self.Template.TemplateResponse(template, context)

        return response
