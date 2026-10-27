import html
import inspect
import json
import time
from dataclasses import asdict
from inspect import getfile
from logging import getLogger
from pathlib import Path
from typing import Any, Awaitable, Callable, Coroutine
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse, Response
from fastapi.routing import APIRoute
from jinja2_fragments import BlockNotFoundError
from jinja2_fragments.fastapi import Jinja2Blocks

from core.database import DeletionBlockedError
from core.jinja import register_form_globals, register_list_globals
from core.settings import BASE_DIR, DEBUG, LDAP_ENABLED
from core.utils.blockers import build_blocker_html
from core.utils.jinja import CommentExtension, brl

from .schemas import RequestContext, RequestContextSchema, RouteMetadata, RouteSchema

# Ordem de resolução: 1) src/templates (customizável pelo projeto), 2) src/core/templates (macros e base estrutural)
SHARED_TEMPLATES_PATH = [BASE_DIR / "templates", BASE_DIR / "core/templates"]


class ContextRoute(APIRoute):
    def get_route_handler(self) -> Callable[[Request], Coroutine[Any, Any, Response]]:
        default_handler = super().get_route_handler()

        async def custom_handler(request: Request) -> Response:
            request_id = request.headers.get("X-Request-ID") or str(uuid4())[:12]

            user_payload = getattr(request.state, "user_payload", None)
            sub = getattr(user_payload, "sub", None) if user_payload else None
            sub_id = str(sub) if sub else None

            ctx = RequestContextSchema(sub_id=sub_id, request_id=request_id)
            token = RequestContext.set(ctx)

            start_time = time.perf_counter()
            try:
                response = await default_handler(request)
                response.headers.setdefault("X-Request-ID", request_id)
                return response
            except HTTPException:
                raise
            except Exception as exc:
                duration_ms = (time.perf_counter() - start_time) * 1000
                getLogger("app.error").error(
                    "Erro ao processar rota %s %s (%.2fms) [Request-ID: %s, User: %s]: %s",
                    request.method,
                    request.url.path,
                    duration_ms,
                    request_id,
                    sub_id or "anonymous",
                    exc,
                    exc_info=True,
                )
                raise
            finally:
                RequestContext.reset(token)

        return custom_handler


class ContextRouter:
    """Router base do FastHTMX com suporte nativo a Softnav (`#content`),
    List Views (`#table-paged`), Subpages (`#subpage-card`), Forms (`422`) e OOB Swaps.

    Por padrão, `require_auth = True` exige usuário autenticado em todas as rotas do router,
    a menos que o router defina `require_auth = False` ou a rota use `@route.get(..., public=True)`.
    """

    prefix: str = ""
    templates_path: str | None = None
    require_auth: bool = True
    logger = getLogger(f"app.{__name__.lower()}")
    routes: list[RouteSchema] = []

    @classmethod
    def __init_subclass__(cls):
        cls.routes = []
        for name, obj in cls.__dict__.items():
            if hasattr(obj, "__route__"):
                metadata: RouteMetadata = obj.__route__
                route = RouteSchema(
                    path=metadata.path,
                    func_name=name,
                    methods=metadata.methods,
                    public=metadata.public,
                    dependencies=metadata.dependencies,
                )
                cls.routes.append(route)

    def __init__(self):
        self.api_router = APIRouter(prefix=self.prefix, route_class=ContextRoute)
        self._setup_routes()
        self.Template = self._setup_template()

    def _setup_template(self) -> Jinja2Blocks:
        if not self.templates_path:
            self.templates_path = str(
                Path(getfile(self.__class__)).parent.parent / "templates"
            )

        tpl_path = Path(self.templates_path).resolve()
        core_dir = (BASE_DIR / "core").resolve()
        if tpl_path.is_relative_to(core_dir):
            # Para módulos do core (ex: auth, user), src/templates do projeto pode sobrescrever templates como login.html
            search_paths = [BASE_DIR / "templates", self.templates_path, BASE_DIR / "core/templates"]
        else:
            # Para módulos de domínio (src/modules/*), templates locais do módulo têm prioridade
            search_paths = [self.templates_path, *SHARED_TEMPLATES_PATH]

        template = Jinja2Blocks(search_paths)
        template.env.auto_reload = DEBUG
        if DEBUG:
            template.env.cache = {}

        template.env.add_extension(CommentExtension)
        template.env.filters["brl"] = brl
        template.env.policies["json.dumps_kwargs"] = {"default": str}

        register_form_globals(template.env)
        register_list_globals(template.env)

        return template

    def _setup_routes(self) -> None:
        from core.modules.auth.deps import get_current_user, get_optional_user

        for route in self.routes:
            is_public = (
                route.public if route.public is not None else (not self.require_auth)
            )
            deps = list(route.dependencies or [])
            if not is_public:
                deps.insert(0, Depends(get_current_user))
            else:
                deps.insert(0, Depends(get_optional_user))

            self.api_router.add_api_route(
                route.path,
                getattr(self, route.func_name),
                methods=route.methods,  # pyright: ignore[reportArgumentType]
                dependencies=deps if deps else None,
            )

    def is_htmx_request(self, request: Request) -> bool:
        return request.headers.get("hx-request") == "true"

    def _theme_context(self, request: Request) -> dict[str, Any]:
        theme = getattr(request.state, "theme", None) or "arctic-light"
        is_dark = theme.endswith("-dark") if isinstance(theme, str) else False
        return {"theme": theme, "theme_is_dark": is_dark}

    def _build_context(
        self, request: Request, context: dict[str, Any] | None = None
    ) -> dict[str, Any]:
        request_context = RequestContext.get(None)
        req_ctx_dict = asdict(request_context) if request_context else {}
        current_user = getattr(request.state, "current_user", None)

        merged: dict[str, Any] = {
            "request": request,
            **req_ctx_dict,
            **self._theme_context(request),
            "user": current_user,
            "session_type": "user" if current_user is not None else "guest",
            "groups": current_user.groups if current_user is not None else [],
            "ldap_enabled": LDAP_ENABLED,
        }
        if "regioes" in request.scope:
            merged["regioes"] = request.scope.get("regioes", [])
            merged["regioes_json"] = request.scope.get("regioes_json", "[]")

        if context:
            merged.update(context)
            # Protege contra código legado que passava `"user": RequestContext.get()`
            if isinstance(merged.get("user"), RequestContextSchema) and current_user is not None:
                merged["user"] = current_user


        return merged

    def _apply_triggers(
        self,
        response: Response,
        triggers: dict[str, Any] | None = None,
        after_swap_triggers: dict[str, Any] | None = None,
    ) -> Response:
        if triggers:
            existing = response.headers.get("HX-Trigger")
            data = json.loads(existing) if existing and existing.startswith("{") else {}
            data.update(triggers)
            response.headers["HX-Trigger"] = json.dumps(data)

        if after_swap_triggers:
            existing = response.headers.get("HX-Trigger-After-Swap")
            data = json.loads(existing) if existing and existing.startswith("{") else {}
            data.update(after_swap_triggers)
            response.headers["HX-Trigger-After-Swap"] = json.dumps(data)

        return response

    def dynamic_template_response(
        self,
        request: Request,
        template: str,
        context: dict[str, Any] | None = None,
        content_block: str = "content",
        *,
        title: str | None = None,
        oob_blocks: list[str] | None = None,
        triggers: dict[str, Any] | None = None,
        status_code: int = 200,
    ) -> Response:
        """Renderiza apenas o `content_block` em navegações softnav (`HX-Request: true`),
        ou o template completo (com `layout/template.html`) no `F5` / acesso direto.
        """
        template_context = self._build_context(request, context)
        if title:
            page_dict = dict(template_context.get("page") or {})
            page_dict["title"] = title
            template_context["page"] = page_dict

        if self.is_htmx_request(request) and content_block:
            try:
                if oob_blocks:
                    response = self.chunk_response(
                        request,
                        template,
                        content_block,
                        context=template_context,
                        oob_blocks=oob_blocks,
                        triggers=triggers,
                        status_code=status_code,
                    )
                else:
                    response = self.Template.TemplateResponse(
                        request,
                        template,
                        template_context,
                        block_name=content_block,
                        status_code=status_code,
                    )

                page = template_context.get("page")
                if page and isinstance(page, dict) and page.get("title"):
                    self._apply_triggers(
                        response, after_swap_triggers={"updateTitle": str(page["title"])}
                    )

            except BlockNotFoundError:
                self.logger.warning(
                    "Template '%s' não possui block '%s'; retornando página completa.",
                    template,
                    content_block,
                )
                response = self.Template.TemplateResponse(
                    request, template, template_context, status_code=status_code
                )
        else:
            response = self.Template.TemplateResponse(
                request, template, template_context, status_code=status_code
            )

        return self._apply_triggers(response, triggers=triggers)

    # Alias semântico explícito para rotas de página em modelo softnav
    page_response = dynamic_template_response

    def chunk_response(
        self,
        request: Request,
        template: str,
        block: str | None = None,
        context: dict[str, Any] | None = None,
        *,
        oob_blocks: list[str] | None = None,
        triggers: dict[str, Any] | None = None,
        status_code: int = 200,
    ) -> Response:
        """Renderiza um bloco Jinja específico (ou o template parcial inteiro se `block=None`)
        e opcionalmente múltiplos `oob_blocks` concatenados.
        """
        template_context = self._build_context(request, context)

        try:
            if not block and not oob_blocks:
                response = self.Template.TemplateResponse(
                    request,
                    template,
                    template_context,
                    status_code=status_code,
                )
            elif not oob_blocks:
                response = self.Template.TemplateResponse(
                    request,
                    template,
                    template_context,
                    block_name=block,
                    status_code=status_code,
                )
            else:
                parts: list[str] = []
                blocks_to_render = ([block] if block else []) + list(oob_blocks)
                for b_name in blocks_to_render:
                    part_resp = self.Template.TemplateResponse(
                        request, template, template_context, block_name=b_name
                    )
                    parts.append(bytes(part_resp.body).decode("utf-8"))
                response = HTMLResponse(
                    content="\n".join(parts), status_code=status_code
                )
        except BlockNotFoundError:
            self.logger.error("Bloco '%s' não encontrado no template '%s'", block, template)
            raise

        return self._apply_triggers(response, triggers=triggers)

    async def subpage_response(
        self,
        request: Request,
        template: str | None = None,
        block: str | None = None,
        context: dict[str, Any] | None = None,
        *,
        chunk_template: str | None = None,
        chunk_context: dict[str, Any] | None = None,
        parent_template: str | None = None,
        parent_loader: Callable[[], Awaitable[dict[str, Any]] | dict[str, Any]] | None = None,
        parent_context_builder: Callable[[], Awaitable[dict[str, Any]] | dict[str, Any]] | None = None,
        active_tab: str | None = None,
        subpage_key: str | None = None,
        oob_blocks: list[str] | None = None,
        triggers: dict[str, Any] | None = None,
    ) -> Response:
        """Facilitador de Subpages no modelo Softnav:
        - Se for carregamento da aba (`HX-Request: true` e target != `#content`), retorna apenas o `chunk_response`.
        - Se for `F5` (ou navegação `#content` para a URL da subpage), executa `parent_loader()`, mescla `initial_subpage`
          e renderiza o `parent_template` completo (ou bloco `content` do pai).
        """
        target_tpl = chunk_template or template or ""
        target_ctx = chunk_context if chunk_context is not None else context
        loader_fn = parent_context_builder or parent_loader
        tab_key = subpage_key or active_tab

        hx_target = request.headers.get("hx-target", "").lstrip("#")
        is_subpage_ajax = self.is_htmx_request(request) and hx_target != "content"

        if is_subpage_ajax or not parent_template:
            return self.chunk_response(
                request,
                target_tpl,
                block=block,
                context=target_ctx,
                oob_blocks=oob_blocks,
                triggers=triggers,
            )

        parent_ctx: dict[str, Any] = {}
        if loader_fn is not None:
            loaded = loader_fn()
            if inspect.isawaitable(loaded):
                parent_ctx = await loaded
            elif isinstance(loaded, dict):
                parent_ctx = loaded

        merged_ctx = {
            **(target_ctx or {}),
            **parent_ctx,
        }
        if tab_key:
            merged_ctx["initial_subpage"] = tab_key

        return self.dynamic_template_response(
            request, parent_template, context=merged_ctx
        )

    def form_error_response(
        self,
        request: Request,
        template: str,
        result: Any = None,
        *,
        form: Any = None,
        block: str = "content",
        context: dict[str, Any] | None = None,
        extra: dict[str, Any] | None = None,
        status_code: int = 200,
    ) -> Response:
        """Re-renderiza o formulário com os valores preenchidos e os erros de validação/negócio."""
        form_res = form if form is not None else result
        merged_extra = {**(context or {}), **(extra or {})}
        template_context = {"form": form_res.state["form"], **merged_extra}
        if getattr(form_res, "global_error", None):
            template_context["form_error"] = form_res.global_error

        return self.dynamic_template_response(
            request,
            template,
            context=template_context,
            content_block=block,
            status_code=status_code,
        )

    def blocker_response(
        self,
        e: DeletionBlockedError | None = None,
        *,
        groups: list[dict[str, Any]] | None = None,
        status_code: int = 409,
    ) -> Response:
        """Retorna HTML escapado contra XSS indicando vínculos que impedem a exclusão."""
        if groups is not None:
            html_content = build_blocker_html(groups)
            return HTMLResponse(content=html_content, status_code=status_code)

        if e is None:
            return HTMLResponse(content="", status_code=200)

        blocked_items = "".join(
            f"<li>{html.escape(str(b.get('name', b.get('id', ''))))}</li>"
            for b in (e.blocked_by or [])
        )
        more = (
            f'<ul class="mt-2 ml-4 list-disc text-sm text-on-surface/70">{blocked_items}</ul>'
            if blocked_items
            else ""
        )
        safe_msg = html.escape(str(e.message))
        content = f"""<div class="rounded-radius border border-warning bg-warning/10 p-4 text-on-surface">
            <p class="font-semibold text-warning flex items-center gap-2">
                <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                {safe_msg}
            </p>
            {more}
        </div>"""
        return HTMLResponse(content=content, status_code=status_code)

    def list_response(
        self,
        request: Request,
        template: str,
        result: Any,
        *,
        base_context: dict[str, Any] | None = None,
        page_block: str = "content",
        list_block: str = "table",
        data_url: str | None = None,
        title: str | None = None,
    ) -> Response:
        """Renderiza uma list view completa (`F5` ou `#content`) ou apenas o bloco `#table-paged` (paginação/ordenação/busca)."""
        context = {**(base_context or {}), **result.state}
        context["list_result"] = result
        context["data_url"] = data_url or str(request.url.path)

        hx_target = request.headers.get("hx-target", "").lstrip("#")
        block = list_block if hx_target == "table-paged" else page_block
        return self.dynamic_template_response(
            request, template, context=context, content_block=block, title=title
        )

    def htmx_update_title_after_swap(self, response: Response, title: str) -> Response:
        return self._apply_triggers(response, after_swap_triggers={"updateTitle": title})

    def full_template_response(
        self, request: Request, template: str, context: dict[str, Any] | None = None
    ) -> Response:
        template_context = self._build_context(request, context)
        return self.Template.TemplateResponse(request, template, template_context)

    def htmx_redirect_response(
        self,
        response_or_path: Response | str,
        path: str | None = None,
        target: str = "#content",
        swap: str = "innerHTML",
        extra_headers: dict[str, Any] | None = None,
    ) -> Response:
        """Navegação softnav programática via `HX-Location`.
        Aceita tanto `self.htmx_redirect_response('/rota')` quanto `self.htmx_redirect_response(response, '/rota')`.
        """
        if isinstance(response_or_path, str):
            response = Response(status_code=200)
            target_path = response_or_path
        else:
            response = response_or_path
            target_path = path or "/"

        hx_location_header: dict[str, Any] = {
            "path": target_path,
            "target": target,
            "swap": swap,
        }
        if extra_headers:
            hx_location_header["headers"] = extra_headers

        response.headers["HX-Location"] = json.dumps(hx_location_header)
        return response
