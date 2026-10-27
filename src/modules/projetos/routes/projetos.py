from uuid import UUID

from fastapi import Depends, HTTPException, Request
from fastapi.responses import HTMLResponse, Response

from core.database import DeletionBlockedError, ObjectNotFound
from core.deps import get_current_user, get_db, get_notifier
from core.forms import FormError, parse_form
from core.lists import ListQuery, list_query_params
from core.modules.notifications.notifier import Notifier, NotifyPayload
from core.router import ContextRouter, route
from core.utils.blockers import build_blocker_html

from ..schemas import ProjetoForm, TarefaForm
from ..services import ProjetoService

CATEGORIAS_OPCOES = ["Infraestrutura", "Comercial", "Intranet", "Portal"]
TAGS_OPCOES = ["htmx", "async", "softnav", "postgis", "sse", "forms"]


class ProjetosRouter(ContextRouter):
    prefix: str = "/projetos"

    @route.get("/list")
    @route.get("/list/items")
    async def list_projetos(
        self,
        request: Request,
        query: ListQuery = Depends(list_query_params),
        dbSession=Depends(get_db),
    ) -> Response:
        service = ProjetoService(dbSession)
        result = await service.get_list_for_display(query)
        return self.list_response(
            request,
            "projetos/list.html",
            result,
            base_context={"page": {"title": "Projetos — Showcase CRUD"}},
            data_url="/projetos/list",
        )

    @route.get("/create")
    async def get_create(self, request: Request) -> Response:
        return self.dynamic_template_response(
            request,
            "projetos/create.html",
            context={
                "page": {"title": "Novo Projeto"},
                "form": {},
                "categorias": CATEGORIAS_OPCOES,
                "tags_opcoes": TAGS_OPCOES,
            },
        )

    @route.post("/create")
    async def post_create(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(get_current_user),
        notifier: Notifier = Depends(get_notifier),
    ) -> Response:
        result = await parse_form(request, ProjetoForm)
        base_ctx = {
            "page": {"title": "Novo Projeto"},
            "categorias": CATEGORIAS_OPCOES,
            "tags_opcoes": TAGS_OPCOES,
        }
        if not result.ok:
            return self.form_error_response(
                request,
                "projetos/create.html",
                result,
                block="form",
                context=base_ctx,
            )

        service = ProjetoService(dbSession)
        try:
            projeto = await service.create_projeto(result.validated)  # type: ignore[arg-type]
        except FormError as exc:
            result.add_errors(exc.errors, message=exc.message)
            return self.form_error_response(
                request,
                "projetos/create.html",
                result,
                block="form",
                context=base_ctx,
            )

        await notifier.push_to_user(
            user.id,
            NotifyPayload(
                title="Projeto Criado",
                message=f"O projeto '{projeto.nome}' ({projeto.codigo}) foi cadastrado.",
                variant="success",
            ),
        )
        return self.htmx_redirect_response(f"/projetos/view/{projeto.id}")

    async def _load_parent_context(self, dbSession, projeto_id: UUID) -> dict:
        service = ProjetoService(dbSession)
        try:
            projeto = await service.get_one_by(id=projeto_id)
        except ObjectNotFound:
            raise HTTPException(status_code=404, detail="Projeto não encontrado")
        return {
            "page": {"title": f"Projeto — {projeto.nome}"},
            "projeto": projeto,
            "tarefas": projeto.tarefas,
        }

    @route.get("/view/{projeto_id}")
    @route.get("/view/{projeto_id}/tarefas")
    async def view_projeto_tarefas(
        self,
        request: Request,
        projeto_id: UUID,
        dbSession=Depends(get_db),
    ) -> Response:
        parent_ctx = await self._load_parent_context(dbSession, projeto_id)
        return await self.subpage_response(
            request,
            "projetos/subpage/tarefas.html",
            "subpage",
            context={**parent_ctx, "active_subpage": "tarefas", "form": {}},
            parent_template="projetos/view.html",
            parent_loader=lambda: self._load_parent_context(dbSession, projeto_id),
        )

    @route.get("/view/{projeto_id}/arquitetura")
    async def view_projeto_arquitetura(
        self,
        request: Request,
        projeto_id: UUID,
        dbSession=Depends(get_db),
    ) -> Response:
        parent_ctx = await self._load_parent_context(dbSession, projeto_id)
        return await self.subpage_response(
            request,
            "projetos/subpage/arquitetura.html",
            "subpage",
            context={**parent_ctx, "active_subpage": "arquitetura"},
            parent_template="projetos/view.html",
            parent_loader=lambda: self._load_parent_context(dbSession, projeto_id),
        )

    @route.post("/view/{projeto_id}/tarefas")
    async def add_tarefa(
        self,
        request: Request,
        projeto_id: UUID,
        dbSession=Depends(get_db),
    ) -> Response:
        result = await parse_form(request, TarefaForm)
        service = ProjetoService(dbSession)
        if result.ok and result.validated:
            await service.add_tarefa(projeto_id, result.validated)

        parent_ctx = await self._load_parent_context(dbSession, projeto_id)
        return self.chunk_response(
            request,
            "projetos/subpage/tarefas.html",
            "subpage",
            context={**parent_ctx, "form": {} if result.ok else result.state["form"]},
        )

    @route.patch("/view/{projeto_id}/tarefas/{tarefa_id}/toggle")
    async def toggle_tarefa(
        self,
        request: Request,
        projeto_id: UUID,
        tarefa_id: UUID,
        dbSession=Depends(get_db),
    ) -> Response:
        service = ProjetoService(dbSession)
        await service.toggle_tarefa(tarefa_id)
        parent_ctx = await self._load_parent_context(dbSession, projeto_id)
        return self.chunk_response(
            request,
            "projetos/subpage/tarefas.html",
            "subpage",
            context={**parent_ctx, "form": {}},
        )

    @route.delete("/view/{projeto_id}/tarefas/{tarefa_id}")
    async def remove_tarefa(
        self,
        request: Request,
        projeto_id: UUID,
        tarefa_id: UUID,
        dbSession=Depends(get_db),
    ) -> Response:
        service = ProjetoService(dbSession)
        await service.delete_tarefa(tarefa_id)
        parent_ctx = await self._load_parent_context(dbSession, projeto_id)
        return self.chunk_response(
            request,
            "projetos/subpage/tarefas.html",
            "subpage",
            context={**parent_ctx, "form": {}},
        )

    @route.get("/{projeto_id}/blockers")
    async def check_blockers(
        self,
        projeto_id: UUID,
        dbSession=Depends(get_db),
    ) -> Response:
        service = ProjetoService(dbSession)
        try:
            await service.check_blockers(projeto_id)
            return HTMLResponse(content="", status_code=200)
        except DeletionBlockedError as e:
            html_content = build_blocker_html(
                e, item_icon="file-text", view_prefix="/projetos/view"
            )
            return HTMLResponse(content=html_content, status_code=200)

    @route.delete("/{projeto_id}")
    async def delete_projeto(
        self,
        request: Request,
        projeto_id: UUID,
        query: ListQuery = Depends(list_query_params),
        dbSession=Depends(get_db),
        user=Depends(get_current_user),
        notifier: Notifier = Depends(get_notifier),
    ) -> Response:
        service = ProjetoService(dbSession)
        try:
            projeto = await service.get_one_by(id=projeto_id)
            nome = projeto.nome
            await service.delete_projeto(projeto_id)
        except DeletionBlockedError as e:
            html_content = build_blocker_html(
                e, item_icon="file-text", view_prefix="/projetos/view"
            )
            return HTMLResponse(content=html_content, status_code=409)

        await notifier.push_to_user(
            user.id,
            NotifyPayload(
                title="Projeto Excluído",
                message=f"O projeto '{nome}' foi removido com sucesso.",
                variant="info",
            ),
        )
        result = await service.get_list_for_display(query)
        return self.list_response(
            request,
            "projetos/list.html",
            result,
            base_context={"page": {"title": "Projetos — Showcase CRUD"}},
            data_url="/projetos/list",
        )
