from logging import getLogger
from uuid import UUID

from fastapi import Depends, Request, HTTPException
from fastapi.responses import HTMLResponse, Response

from core.database import DeletionBlockedError, ObjectNotFound
from core.utils.blockers import build_blocker_html
from core.deps import PermissionVerify, get_db
from core.forms import FormError, parse_form
from core.lists import ListQuery, list_query_params
from core.modules.notifications import Notifier, NotifyPayload, get_notifier
from core.router import ContextRouter, route
from core.utils.htmx import redirect_htmx_header

from ..schemas.group import GroupOut
from ..schemas.user import UserIn, UserUpdate, UserView
from ..services import GroupService, UserService

logger = getLogger("app.pages.core")

SORTABLE_COLUMNS = ["username", "first_name", "last_name", "email", "created_at"]


class User(ContextRouter):
    prefix: str = "/user"

    ### LIST VIEW ###
    @route.get("/list")
    async def get_list(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
        query: ListQuery = Depends(list_query_params(allowed=SORTABLE_COLUMNS)),
    ):
        return await self._render_list(request, dbSession, user, query)

    @route.get("/list/items")
    async def get_list_items(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
        query: ListQuery = Depends(list_query_params(allowed=SORTABLE_COLUMNS)),
    ):
        return await self._render_list(request, dbSession, user, query)

    async def _render_list(self, request, dbSession, user, query: ListQuery):
        result = await UserService(dbSession).get_list_for_display(query)

        base = {
            "user": user,
            "page": {"title": "Usuários"},
            "list_config": {"resource": "user", "base_path": self.prefix},
        }
        return self.list_response(
            request,
            "list.html",
            result,
            base_context=base,
            data_url=f"{self.prefix}/list/items",
        )

    ### CREATE ###
    @route.get("/create")
    async def get_create(
        self,
        request: Request,
        user=Depends(PermissionVerify(["admin"])),
    ) -> Response:
        page = {"title": "Novo usuário"}
        context = {"page": page, "user": user, "form": {}}
        return self.dynamic_template_response(
            request, "create_user.html", context=context
        )

    @route.post("/create")
    async def post_create(
        self,
        request: Request,
        dbSession=Depends(get_db),
        notifier: Notifier = Depends(get_notifier),
        user=Depends(PermissionVerify(["admin"])),
    ) -> Response:
        page = {"title": "Novo usuário"}

        result = await parse_form(request, UserIn, hidden={"password"})

        if not result.ok:
            return self.form_error_response(
                request,
                "create_user.html",
                result,
                context={"page": page, "user": user},
            )

        try:
            new_user = await UserService(dbSession).create(result.validated)
        except FormError as exc:
            result.add_errors(exc.errors)
            result.global_error = exc.message
            return self.form_error_response(
                request,
                "create_user.html",
                result,
                context={"page": page, "user": user},
            )

        await notifier.push_to_user(
            user.id,
            NotifyPayload(
                message=f"{new_user.name} foi criado com sucesso.",
                title="Usuário Criado!",
                variant="success",
            ),
        )

        response = Response(status_code=200)
        return redirect_htmx_header(response, f"{self.prefix}/list")

    ### VIEW ###
    @route.get("/view/{user_id}")
    async def view_user(
        self,
        user_id: UUID,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ) -> Response:
        return await self._render_view(
            request, dbSession, user, user_id, form={}, form_error=None
        )

    async def _render_view(
        self,
        request: Request,
        dbSession,
        user,
        user_id: UUID,
        *,
        form: dict | None = None,
        form_error: str | None = None,
    ) -> Response:
        service = UserService(dbSession)
        item = await service.get_one_by(id=user_id)
        item_view = UserView.model_validate(item)

        group_service = GroupService(dbSession)
        raw_groups = await group_service.get_list(out_schema=GroupOut)
        all_groups = [{"id": str(g.id), "name": g.name} for g in raw_groups]
        selected_group_names = [g.name for g in item_view.groups]

        # erros de update: repopula grupos/status com o que foi submetido
        form = form or {}
        if form.get("groups", {}).get("value"):
            selected_group_names = [
                name.strip()
                for name in str(form["groups"]["value"]).split(",")
                if name.strip()
            ]
        enabled_value = form.get("is_enabled", {}).get("value", "")
        if enabled_value == "":
            enabled = item_view.is_enabled
        else:
            enabled = str(enabled_value).lower() in ("true", "1", "on")

        page = {"title": f"Usuário: {item_view.name}"}
        context = {
            "user": user,
            "page": page,
            "item": item_view,
            "all_groups": all_groups,
            "selected_group_names": selected_group_names,
            "form": form,
            "form_error": form_error,
            "form_enabled": enabled,
            "list_config": {"resource": "user", "base_path": self.prefix},
        }
        return self.dynamic_template_response(
            request, "view_user.html", context=context
        )

    ### UPDATE ###
    @route.put("/{user_id}")
    async def update(
        self,
        user_id: UUID,
        request: Request,
        dbSession=Depends(get_db),
        notifier: Notifier = Depends(get_notifier),
        user=Depends(PermissionVerify(["admin"])),
    ) -> Response:
        result = await parse_form(request, UserUpdate)

        if not result.ok:
            return await self._render_view(
                request,
                dbSession,
                user,
                user_id,
                form=result.state["form"],
                form_error=result.global_error,
            )

        try:
            updated = await UserService(dbSession).update_user(user_id, result.validated)
        except FormError as exc:
            result.add_errors(exc.errors)
            result.global_error = exc.message
            return await self._render_view(
                request,
                dbSession,
                user,
                user_id,
                form=result.state["form"],
                form_error=result.global_error,
            )

        await notifier.push_to_user(
            user.id,
            NotifyPayload(
                message=f"{updated.name} foi atualizado com sucesso.",
                title="Usuário Atualizado!",
                variant="success",
            ),
        )

        response = Response(status_code=200)
        return redirect_htmx_header(response, f"{self.prefix}/view/{user_id}")

    ### DELETE ###
    @route.get("/{user_id}/blockers")
    async def check_blockers(
        self,
        user_id: UUID,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ):
        service = UserService(dbSession)
        blockers = await service.get_blockers(user_id, current_user_id=user.id)
        if not blockers:
            return HTMLResponse(content="", status_code=200)
            
        err = DeletionBlockedError(
            message=f"Não é possível desativar este usuário: {blockers[0]['name']}.",
            blocked_by=blockers,
        )
        res = self.blocker_response(err)
        res.status_code = 200
        return res

    @route.delete("/{user_id}")
    async def soft_delete(
        self,
        user_id: UUID,
        request: Request,
        dbSession=Depends(get_db),
        notifier: Notifier = Depends(get_notifier),
        user=Depends(PermissionVerify(["admin"])),
    ):
        service = UserService(dbSession)
        try:
            target = await service.get_one_by(id=user_id)
        except ObjectNotFound:
            raise HTTPException(404, "Usuário não encontrado")

        try:
            await service.soft_delete(target, current_user_id=user.id)
        except DeletionBlockedError as e:
            return self.blocker_response(e)

        await notifier.push_to_user(
            user.id,
            NotifyPayload(
                message=f"{target.name} foi desativado com sucesso.",
                title="Usuário Desativado",
                variant="success",
            ),
        )

        response = Response(status_code=200)
        return redirect_htmx_header(response, f"{self.prefix}/list")