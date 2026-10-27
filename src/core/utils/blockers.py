import html
from typing import Any

from core.database import DeletionBlockedError, ObjectNotFound, UniqueViolation


def build_blocker_html(
    e_or_groups: DeletionBlockedError | list[dict[str, Any]],
    item_icon: str = "box",
    view_prefix: str | None = None,
) -> str:
    """Gera HTML seguro (escapado contra XSS) para o modal de bloqueio de exclusão.

    Aceita dois formatos:
    1) `DeletionBlockedError` com `item_icon` e `view_prefix` (usado nos módulos de domínio)
    2) `groups: list[dict[str, Any]]` com `{label, icon, items: [{id, name, url?, detail?}]}`
    """
    if isinstance(e_or_groups, list):
        return _build_groups_blocker_html(e_or_groups)

    e = e_or_groups
    blocked_by = getattr(e, "blocked_by", None) or []
    count = len(blocked_by)
    plural = "s" if count > 1 else ""
    safe_message = html.escape(str(getattr(e, "message", "Exclusão bloqueada")))

    out = f"""
    <div class="flex flex-col h-full">
        <div class="mb-4">
            <p class="text-[15px] font-medium text-on-surface">
                {safe_message}
            </p>
            <p class="text-sm text-on-surface/60 mt-1.5">
                Para prosseguir com a exclusão, é necessário desvincular ou desativar os registros dependentes abaixo.
            </p>
        </div>

        <div class="flex items-center justify-between mb-3 px-1">
            <span class="text-xs font-bold uppercase tracking-widest text-on-surface/50">
                Vínculos Ativos
            </span>
            <span class="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-warning/20 text-warning border border-warning/30 text-[11px] font-bold">
                {count} item{plural}
            </span>
        </div>

        <div class="flex-1 min-h-0 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-outline/50 hover:scrollbar-thumb-outline">
    """

    icon_svgs = {
        "radio-tower": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>',
        "file-text": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
        "user": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        "box": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
    }

    icon_svg = icon_svgs.get(item_icon, icon_svgs["box"])
    chevron_svg = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-0.5"><path d="m9 18 6-6-6-6"/></svg>'

    for item in blocked_by:
        name = html.escape(str(item.get("name", item.get("id", ""))))
        item_id = html.escape(str(item.get("id", "")), quote=True)

        if view_prefix and item_id:
            safe_prefix = html.escape(str(view_prefix), quote=True)
            out += f"""
            <a href="{safe_prefix}/{item_id}" target="_blank"
               class="group flex items-center justify-between p-3 rounded-radius border border-outline/60 bg-surface-alt/50 hover:bg-surface-alt hover:border-primary/40 shadow-xs transition-all duration-200">
                <div class="flex items-center gap-3 min-w-0 pr-4">
                    <div class="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-outline/30 text-on-surface/60 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                        {icon_svg}
                    </div>
                    <span class="text-[14px] font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
                        {name}
                    </span>
                </div>
                <span class="inline-flex items-center gap-1 text-xs font-medium text-primary/80 group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    Abrir {chevron_svg}
                </span>
            </a>
            """
        else:
            out += f"""
            <div class="flex items-center gap-3 p-3 rounded-radius border border-outline/60 bg-surface-alt/50 shadow-xs">
                <div class="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-outline/30 text-on-surface/60">
                    {icon_svg}
                </div>
                <span class="text-[14px] font-semibold text-on-surface truncate">
                    {name}
                </span>
            </div>
            """

    out += """
        </div>
    </div>
    """
    return out


def _build_groups_blocker_html(groups: list[dict[str, Any]]) -> str:
    sections: list[str] = []

    for g in groups:
        items = g.get("items") or []
        if not items:
            continue

        label = html.escape(str(g.get("label", "Itens vinculados")))
        icon = html.escape(str(g.get("icon", "link")))
        count = len(items)

        rows: list[str] = []
        for item in items:
            name = html.escape(str(item.get("name", item.get("id", ""))))
            detail = html.escape(str(item.get("detail", ""))) if item.get("detail") else ""
            url = item.get("url")

            detail_span = (
                f'<span class="text-xs text-on-surface/50 ml-1.5">({detail})</span>'
                if detail
                else ""
            )

            if url:
                safe_url = html.escape(str(url), quote=True)
                rows.append(
                    f'<li class="flex items-center justify-between py-1.5 px-2 rounded hover:bg-surface-alt/60">'
                    f'<div class="truncate text-sm text-on-surface">{name}{detail_span}</div>'
                    f'<a href="{safe_url}" hx-get="{safe_url}" hx-target="#content" hx-push-url="true" '
                    f'@click="$dispatch(\'close-delete-modal\')" '
                    f'class="text-xs text-primary hover:underline shrink-0 ml-2 flex items-center gap-1">'
                    f'Abrir <i data-lucide="arrow-up-right" class="w-3 h-3"></i></a>'
                    f"</li>"
                )
            else:
                rows.append(
                    f'<li class="py-1.5 px-2 text-sm text-on-surface truncate">{name}{detail_span}</li>'
                )

        rows_html = "".join(rows)
        sections.append(
            f'<div class="rounded-radius border border-outline bg-surface p-3 mb-2 last:mb-0">'
            f'<div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-on-surface/70 mb-1.5">'
            f'<i data-lucide="{icon}" class="w-3.5 h-3.5 text-warning"></i>'
            f"<span>{label} ({count})</span>"
            f"</div>"
            f'<ul class="divide-y divide-outline/40 max-h-40 overflow-y-auto">{rows_html}</ul>'
            f"</div>"
        )

    return "".join(sections)


__all__ = ["build_blocker_html", "DeletionBlockedError", "ObjectNotFound", "UniqueViolation"]