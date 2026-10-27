from pathlib import Path

import typer

app = typer.Typer(help="Scaffolding de novos módulos no padrão FastHTMX Softnav.")

MODULES_DIR = Path(__file__).parent.parent / "src" / "modules"


@app.command("create")
def create_module(
    name: str = typer.Argument(..., help="Nome do módulo em snake_case (ex: cliente, post, tarefa)"),
    label: str = typer.Option("", "--label", "-l", help="Nome legível no singular (ex: Cliente)"),
    plural: str = typer.Option("", "--plural", "-p", help="Nome legível no plural (ex: Clientes)"),
    icon: str = typer.Option("box", "--icon", "-i", help="Ícone Lucide (ex: box, users, file-text)"),
):
    """Cria a estrutura completa de um módulo em src/modules/<name> já com Softnav + Subpages + List + Form."""
    slug = name.strip().lower().replace("-", "_")
    class_prefix = "".join(part.capitalize() for part in slug.split("_"))
    singular_label = label or class_prefix
    plural_label = plural or f"{singular_label}s"

    mod_dir = MODULES_DIR / slug
    if mod_dir.exists():
        typer.echo(f"Erro: o diretório {mod_dir} já existe.", err=True)
        raise typer.Exit(code=1)

    (mod_dir / "templates" / "subpage").mkdir(parents=True, exist_ok=True)

    (mod_dir / "__init__.py").write_text("", encoding="utf-8")

    (mod_dir / "models.py").write_text(
        f'''from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from core.models import BaseSQLModel


class {class_prefix}(BaseSQLModel):
    __tablename__ = "{slug}"

    name: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
''',
        encoding="utf-8",
    )

    (mod_dir / "schemas.py").write_text(
        f'''from pydantic import Field

from core.schema import FormSchema, OptionalStr


class {class_prefix}Form(FormSchema):
    name: str = Field(min_length=2, max_length=120)
    description: OptionalStr = None
''',
        encoding="utf-8",
    )

    (mod_dir / "services.py").write_text(
        f'''from core.lists import ListQuery, ListResult
from core.services import AbstractModelService

from .models import {class_prefix}


class {class_prefix}Service(AbstractModelService[{class_prefix}]):
    model = {class_prefix}

    async def get_list_for_display(self, query: ListQuery | None = None) -> ListResult[{class_prefix}]:
        return await self.get_list_result(
            query,
            search_fields=["name", "description"],
        )
''',
        encoding="utf-8",
    )

    (mod_dir / "routes.py").write_text(
        f'''from pathlib import Path
from uuid import UUID

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import ObjectNotFound
from core.deps import get_db
from core.forms import parse_form
from core.lists import ListQuery, list_query_params
from core.router import ContextRouter, route

from .schemas import {class_prefix}Form
from .services import {class_prefix}Service


class {class_prefix}Router(ContextRouter):
    prefix: str = "/{slug}"
    templates_path = Path(__file__).parent / "templates"
    resource_slug = "{slug}"
    resource_label = "{singular_label}"

    @route.get("/list")
    async def list_page(
        self,
        request: Request,
        query: ListQuery = Depends(list_query_params),
        db: AsyncSession = Depends(get_db),
    ):
        service = {class_prefix}Service(db)
        result = await service.get_list_for_display(query)
        return self.list_response(
            request,
            "list.html",
            result,
            data_url="/{slug}/list",
            title="{plural_label}",
        )

    @route.get("/create")
    async def create_page(self, request: Request):
        return self.dynamic_template_response(
            request,
            "create.html",
            title="Novo {singular_label}",
        )

    @route.post("/create")
    async def create_submit(
        self,
        request: Request,
        db: AsyncSession = Depends(get_db),
    ):
        form = await parse_form(request, {class_prefix}Form)
        if form.failed:
            return self.form_error_response(request, "create.html", form=form)

        service = {class_prefix}Service(db)
        item = await service.create(form.data)
        return await self.redirect_Compare(request, f"/{slug}/view/{{item.id}}")

    async def _build_view_context(
        self,
        db: AsyncSession,
        item_id: UUID,
        initial_subpage: str = "detalhes",
    ) -> dict:
        service = {class_prefix}Service(db)
        item = await service.get_one_by(id=item_id)
        return {{
            "item": item,
            "initial_subpage": initial_subpage,
            "tabs": [
                {{"key": "detalhes", "label": "Detalhes", "icon": "info", "url": f"/{slug}/view/{{item.id}}/detalhes"}},
            ],
        }}

    @route.get("/view/{{item_id}}")
    async def view_page(
        self,
        item_id: UUID,
        request: Request,
        db: AsyncSession = Depends(get_db),
    ):
        try:
            ctx = await self._build_view_context(db, item_id, "detalhes")
        except ObjectNotFound:
            return await self.redirect_Compare(request, "/{slug}/list")
        return self.dynamic_template_response(
            request,
            "view.html",
            context=ctx,
            title=f"{singular_label}: {{ctx['item'].name}}",
        )

    @route.get("/view/{{item_id}}/detalhes")
    async def view_subpage_detalhes(
        self,
        item_id: UUID,
        request: Request,
        db: AsyncSession = Depends(get_db),
    ):
        return await self.subpage_response(
            request,
            chunk_template="subpage/detalhes.html",
            parent_template="view.html",
            subpage_key="detalhes",
            parent_context_builder=lambda: self._build_view_context(db, item_id, "detalhes"),
            chunk_context={{"item": await {class_prefix}Service(db).get_one_by(id=item_id)}},
        )

    @route.put("/{{item_id}}")
    async def update_submit(
        self,
        item_id: UUID,
        request: Request,
        db: AsyncSession = Depends(get_db),
    ):
        form = await parse_form(request, {class_prefix}Form)
        service = {class_prefix}Service(db)
        if form.failed:
            ctx = await self._build_view_context(db, item_id)
            return self.form_error_response(
                request,
                "view.html",
                form=form,
                block="content",
                extra=ctx,
            )

        await service.update(item_id, form.data.model_dump())
        ctx = await self._build_view_context(db, item_id)
        return self.dynamic_template_response(
            request,
            "view.html",
            context=ctx,
            triggers={{
                "notify": {{
                    "variant": "success",
                    "title": "{singular_label} atualizado",
                    "message": "Alterações salvas com sucesso.",
                }}
            }},
        )

    @route.get("/{{item_id}}/blockers")
    async def check_blockers(self, item_id: UUID):
        return self.blocker_response(None)

    @route.delete("/{{item_id}}")
    async def delete_item(
        self,
        item_id: UUID,
        db: AsyncSession = Depends(get_db),
    ):
        service = {class_prefix}Service(db)
        await service.soft_delete(None, id=item_id)
        return {{"ok": True}}
''',
        encoding="utf-8",
    )

    (mod_dir / "templates" / "list.html").write_text(
        f'''{{% extends "layout/template.html" %}}
{{% from "macros/list.html" import search_bar, sortable_th, plain_th, empty_state, pagination, action_buttons %}}
{{% from "macros/softnav.html" import soft_btn %}}

{{% block content %}}
<div class="content-frame overflow-y-auto">
  <div class="content-header">
    <div class="title">
      <div class="icon">
        <i data-lucide="{icon}"></i>
      </div>
      <div>
        <h2>{plural_label}</h2>
        <p>Gerenciamento e listagem</p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      {{{{ search_bar(list_result, data_url, placeholder='Buscar {plural_label|lower}...') }}}}
      {{{{ soft_btn('/{slug}/create', label='Novo', icon='circle-plus') }}}}
    </div>
  </div>

  <div class="relative flex flex-col flex-1 min-h-0">
    <div id="list-loading" class="htmx-indicator absolute inset-0 z-20 flex items-center justify-center bg-surface/60 backdrop-blur-[1px] rounded-radius">
      <span class="loading loading-spinner loading-md text-primary"></span>
    </div>

    <div id="table-paged" class="flex flex-col flex-1 h-full">
    {{% block table %}}
    <div id="table-container" class="w-full h-full rounded-radius border border-outline flex flex-col bg-surface overflow-hidden">
      <div class="flex-1 min-h-0 overflow-auto w-full">
        <table id="items-table" class="table-list">
          <colgroup>
            <col class="w-14 text-center border-r border-outline">
            <col class="w-[260px] border-r border-outline">
            <col class="w-auto border-r border-outline">
            <col class="w-32 text-center">
          </colgroup>
          <thead>
            <tr>
              {{{{ plain_th('#', 'center') }}}}
              {{{{ sortable_th('name', 'Nome', list_result, data_url) }}}}
              {{{{ plain_th('Descrição') }}}}
              {{{{ plain_th('Ações', 'center', 'border-r-0') }}}}
            </tr>
          </thead>
          <tbody id="table-body">
            {{% if list_result.items %}}
              {{% for item in list_result.items %}}
              <tr id="{slug}-{{{{ item.id }}}}">
                <td class="text-center">
                  <span class="inline-flex items-center justify-center min-w-6 h-5 px-1.5 text-[10px] font-medium bg-surface-alt/70 text-on-surface/60 rounded-full">
                    {{{{ (list_result.page - 1) * list_result.per_page + loop.index }}}}
                  </span>
                </td>
                <td class="px-3 py-2 font-medium text-on-surface">{{{{ item.name }}}}</td>
                <td class="px-3 py-2 text-on-surface/70">{{{{ item.description or '—' }}}}</td>
                <td class="px-3 py-2 text-center">
                  {{{{ action_buttons(item.id, item.name, '/{slug}') }}}}
                </td>
              </tr>
              {{% endfor %}}
            {{% else %}}
              {{{{ empty_state('search-x', 'Nenhum registro encontrado', 'Tente ajustar a busca ou cadastre um novo.', 4) }}}}
            {{% endif %}}
          </tbody>
        </table>
      </div>
      {{{{ pagination(list_result, data_url) }}}}
    </div>
    {{% endblock table %}}
    </div>
  </div>

  {{% include "partials/list/delete-modal.html" %}}
</div>
{{% endblock content %}}
''',
        encoding="utf-8",
    )

    (mod_dir / "templates" / "create.html").write_text(
        f'''{{% extends "layout/template.html" %}}
{{% from "macros/softnav.html" import page_header, soft_link %}}
{{% from "macros/forms.html" import form_alert, form_field, form_textarea, submit_btn %}}

{{% block content %}}
<div class="content-frame overflow-y-auto h-full">
  {{% call page_header('Novo {singular_label}', 'Cadastro', '{icon}') %}}
    {{{{ soft_link('/{slug}/list', label='Voltar', icon='arrow-left', classes='text-sm text-on-surface/70 hover:text-primary flex items-center gap-1.5') }}}}
  {{% endcall %}}

  <div class="content-row">
    <div class="half-col">
      {{% block form %}}
      <form
        hx-post="/{slug}/create"
        hx-target="#content"
        hx-swap="innerHTML"
        hx-push-url="true"
        hx-indicator="#content"
        class="form"
      >
        {{{{ form_alert(form_error) }}}}
        {{{{ form_field(form, 'name', 'Nome', required=True, maxlength=120) }}}}
        {{{{ form_textarea(form, 'description', 'Descrição', rows=3) }}}}

        <div class="form-last-row">
          {{{{ submit_btn('Salvar {singular_label}', icon='circle-plus') }}}}
        </div>
      </form>
      {{% endblock form %}}
    </div>
  </div>
</div>
{{% endblock content %}}
''',
        encoding="utf-8",
    )

    (mod_dir / "templates" / "view.html").write_text(
        f'''{{% extends "layout/template.html" %}}
{{% from "macros/softnav.html" import page_header %}}
{{% from "macros/subpage.html" import subpage_nav, subpage_container %}}
{{% from "macros/forms.html" import form_alert, form_field, form_textarea, submit_btn, delete_btn %}}

{{% block content %}}
<div class="content-frame overflow-y-auto"
     x-data="subpageNav({{
        resourceId: '{{{{ item.id }}}}',
        active: '{{{{ initial_subpage|default("detalhes") }}}}',
        tabs: {{{{ tabs|tojson|safe if tabs is defined else '[]' }}}}
     }})">

  {{% call page_header('{singular_label}: ' ~ item.name, 'Visualizar e editar', '{icon}') %}}
    {{% if tabs is defined %}}
      {{{{ subpage_nav(tabs) }}}}
    {{% endif %}}
  {{% endcall %}}

  <div class="content-row">
    <div class="half-col">
      <form
        hx-put="/{slug}/{{{{ item.id }}}}"
        hx-target="#content"
        hx-swap="innerHTML"
        hx-push-url="false"
        hx-indicator="#content"
        class="form"
      >
        {{{{ form_alert(form_error) }}}}
        {{{{ form_field(form, 'name', 'Nome', value=item.name, required=True, maxlength=120) }}}}
        {{{{ form_textarea(form, 'description', 'Descrição', value=item.description or '', rows=3) }}}}

        <div class="form-last-row">
          {{{{ submit_btn('Salvar alterações', icon='save', classes='form-create-btn max-w-1/3') }}}}
          {{{{ delete_btn(item.id, item.name) }}}}
        </div>
      </form>
    </div>

    {{{{ subpage_container() }}}}
  </div>
</div>

{{% include "partials/list/delete-modal.html" %}}
{{% endblock content %}}
''',
        encoding="utf-8",
    )

    (mod_dir / "templates" / "subpage" / "detalhes.html").write_text(
        f'''<div class="p-4 flex flex-col gap-3 text-sm">
  <h3 class="font-semibold text-on-surface-strong">Detalhes de {{{{ item.name }}}}</h3>
  <p class="text-xs text-on-surface/70">{{{{ item.description or 'Sem descrição cadastrada.' }}}}</p>
</div>
''',
        encoding="utf-8",
    )

    typer.echo(f"==> Módulo '{slug}' criado em: {mod_dir}")
    typer.echo(f"==> Rotas disponíveis automaticamente: /{slug}/list, /{slug}/create, /{slug}/view/<id>")
