import logging

from fastapi import Depends, HTTPException, Request

from core.deps import PermissionVerify, get_db
from core.router import ContextRouter, route

from ..models.audit_log import AuditLog
from ..services.audit import AuditLogService

logger = logging.getLogger("app.pages.historico")

ENTITY_GROUPS: dict[str, list[str]] = {
    "user": ["user"],
    "group": ["group"],
}

GROUP_LABELS: dict[str, str] = {
    "user": "Usuários",
    "group": "Grupos",
}

ENTITY_LABELS: dict[str, str] = {
    "user": "Usuário",
    "group": "Grupo",
    "audit_log": "Audit Log",
}

ACTION_LABELS = {
    "CREATE": "Criação",
    "UPDATE": "Edição",
    "DELETE": "Exclusão",
}

PER_PAGE = 50
_NAME_KEYS = ("name", "title", "nickname", "username", "first_name")


def register_audit_entity(
    group_slug: str,
    group_label: str,
    entity_types: dict[str, str] | None = None,
) -> None:
    """Permite que módulos de domínio registrem suas entidades no histórico de auditoria."""
    types_map = entity_types or {group_slug: group_label}
    ENTITY_GROUPS[group_slug] = list(types_map.keys())
    GROUP_LABELS[group_slug] = group_label
    ENTITY_LABELS.update(types_map)


def _label_group(entity_group: str) -> str:
    return GROUP_LABELS.get(entity_group, entity_group.capitalize())


def _resolve_group_types(entity_group: str) -> list[str]:
    return ENTITY_GROUPS.get(entity_group, [entity_group])


def _extract_item_name(items: list[AuditLog], fallback: str) -> str:
    for item in items:
        if not item.changes:
            continue
        for key in _NAME_KEYS:
            change = item.changes.get(key)
            value = change.get("new") if isinstance(change, dict) else None
            if value:
                if key == "first_name":
                    last = item.changes.get("last_name")
                    last = last.get("new") if isinstance(last, dict) else None
                    return f"{value} {last or ''}".strip()
                return str(value)
    return fallback


class AuditRouter(ContextRouter):
    prefix: str = "/admin/historico"

    def _build_audit_context(
        self,
        request: Request,
        user,
        items,
        total_pages,
        current_page,
        per_page,
        total_count,
        action,
        page_mode,
        current_group,
        entity_id=None,
        item_name=None,
    ) -> dict:
        groups = [(slug, GROUP_LABELS[slug]) for slug in ENTITY_GROUPS]

        if page_mode == "item":
            chunk_url = f"/admin/historico/{current_group}/{entity_id}/items"
            base_url = f"/admin/historico/{current_group}/{entity_id}"
        elif page_mode == "group":
            chunk_url = f"/admin/historico/{current_group}/items"
            base_url = f"/admin/historico/{current_group}"
        else:
            chunk_url = "/admin/historico/items"
            base_url = "/admin/historico"

        group_url = (
            f"/admin/historico/{current_group}" if current_group else "/admin/historico"
        )

        return {
            "request": request,
            "user": user,
            "items": items,
            "current_page": current_page,
            "total_pages": total_pages,
            "per_page": per_page,
            "total_count": total_count,
            "action": action,
            "page_mode": page_mode,
            "current_group": current_group,
            "entity_id": entity_id,
            "item_name": item_name,
            "chunk_url": chunk_url,
            "base_url": base_url,
            "group_url": group_url,
            "groups": groups,
            "group_labels": GROUP_LABELS,
            "entity_labels": ENTITY_LABELS,
            "action_labels": ACTION_LABELS,
        }

    @route.get("")
    async def historico_page(
        self,
        request: Request,
        action: str | None = None,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ):
        service = AuditLogService(dbSession)
        (
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
        ) = await service.get_history_paginated(
            page=1, per_page=PER_PAGE, action=action
        )

        context = self._build_audit_context(
            request,
            user,
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
            action,
            "all",
            "",
        )
        context["page"] = {"title": "Histórico de Edição"}

        return self.dynamic_template_response(
            request, "pages/admin/historico.html", context=context
        )

    @route.get("/items")
    async def historico_items(
        self,
        request: Request,
        page: int = 1,
        per_page: int = PER_PAGE,
        action: str | None = None,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ):
        if not self.is_htmx_request(request):
            raise HTTPException(403)

        service = AuditLogService(dbSession)
        (
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
        ) = await service.get_history_paginated(
            page=page, per_page=per_page, action=action
        )

        context = self._build_audit_context(
            request,
            user,
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
            action,
            "all",
            "",
        )

        return self.chunk_response(
            request, "pages/admin/historico.html", block="table", context=context
        )

    @route.get("/{entity_group}")
    async def historico_group_page(
        self,
        entity_group: str,
        request: Request,
        action: str | None = None,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ):
        entity_types = _resolve_group_types(entity_group)

        service = AuditLogService(dbSession)
        (
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
        ) = await service.get_history_paginated(
            page=1, per_page=PER_PAGE, entity_types=entity_types, action=action
        )

        context = self._build_audit_context(
            request,
            user,
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
            action,
            "group",
            entity_group,
        )
        context["page"] = {"title": f"Histórico — {_label_group(entity_group)}"}

        return self.dynamic_template_response(
            request, "pages/admin/historico.html", context=context
        )

    @route.get("/{entity_group}/items")
    async def historico_group_items(
        self,
        entity_group: str,
        request: Request,
        page: int = 1,
        per_page: int = PER_PAGE,
        action: str | None = None,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ):
        if not self.is_htmx_request(request):
            raise HTTPException(403)

        entity_types = _resolve_group_types(entity_group)

        service = AuditLogService(dbSession)
        (
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
        ) = await service.get_history_paginated(
            page=page, per_page=per_page, entity_types=entity_types, action=action
        )

        context = self._build_audit_context(
            request,
            user,
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
            action,
            "group",
            entity_group,
        )

        return self.chunk_response(
            request, "pages/admin/historico.html", block="table", context=context
        )

    @route.get("/{entity_group}/{entity_id}")
    async def historico_item_page(
        self,
        entity_group: str,
        entity_id: str,
        request: Request,
        action: str | None = None,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ):
        service = AuditLogService(dbSession)
        (
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
        ) = await service.get_history_paginated(
            page=1, per_page=PER_PAGE, entity_id=entity_id, action=action
        )

        fallback = f"{_label_group(entity_group)} · {entity_id[:8]}"
        item_name = _extract_item_name(items, fallback)

        context = self._build_audit_context(
            request,
            user,
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
            action,
            "item",
            entity_group,
            entity_id=entity_id,
            item_name=item_name,
        )
        context["page"] = {"title": f"Histórico — {item_name}"}

        return self.dynamic_template_response(
            request, "pages/admin/historico.html", context=context
        )

    @route.get("/{entity_group}/{entity_id}/items")
    async def historico_item_items(
        self,
        entity_group: str,
        entity_id: str,
        request: Request,
        page: int = 1,
        per_page: int = PER_PAGE,
        action: str | None = None,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
    ):
        if not self.is_htmx_request(request):
            raise HTTPException(403)

        service = AuditLogService(dbSession)
        (
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
        ) = await service.get_history_paginated(
            page=page, per_page=per_page, entity_id=entity_id, action=action
        )

        item_name = _extract_item_name(
            items, f"{_label_group(entity_group)} · {entity_id[:8]}"
        )

        context = self._build_audit_context(
            request,
            user,
            items,
            total_pages,
            current_page,
            per_page,
            total_count,
            action,
            "item",
            entity_group,
            entity_id=entity_id,
            item_name=item_name,
        )

        return self.chunk_response(
            request, "pages/admin/historico.html", block="table", context=context
        )
