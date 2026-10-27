from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Generic, TypeVar

import fastapi

T = TypeVar("T")

DEFAULT_PER_PAGE_RESULTS = 15


@dataclass
class ListQuery:
    """Parâmetros de uma list view (busca, página e ordenação) resolvidos da query string."""

    page: int = 1
    per_page: int = DEFAULT_PER_PAGE_RESULTS
    sort_by: str = "created_at"
    order: str = "desc"
    q: str = ""

    @classmethod
    def from_params(
        cls,
        page: int | None = None,
        per_page: int | None = None,
        sort_by: str | None = None,
        order: str | None = None,
        q: str | None = None,
        *,
        allowed: list[str] | None = None,
        default_sort: str = "created_at",
    ) -> "ListQuery":
        sort = sort_by or default_sort
        if allowed and sort not in allowed:
            sort = default_sort

        return cls(
            page=max(1, page or 1),
            per_page=max(1, per_page or DEFAULT_PER_PAGE_RESULTS),
            sort_by=sort,
            order=order if order in ("asc", "desc") else "desc",
            q=(q or "").strip(),
        )


@dataclass
class ListResult(Generic[T]):
    """Resultado de uma list view paginada pronto para templates e macros HTMX."""

    items: list[T]
    page: int
    per_page: int
    total_pages: int
    total_count: int
    sort_by: str
    order: str
    q: str = ""

    @classmethod
    def from_paginated(
        cls,
        items: list[T],
        total_pages: int,
        page: int,
        per_page: int,
        total_count: int,
        sort_by: str = "created_at",
        order: str = "desc",
        q: str = "",
    ) -> "ListResult[T]":
        return cls(
            items=items,
            page=page,
            per_page=per_page,
            total_pages=total_pages,
            total_count=total_count,
            sort_by=sort_by,
            order=order,
            q=q,
        )

    @property
    def start_item(self) -> int:
        if not self.items:
            return 0
        return (self.page - 1) * self.per_page + 1

    @property
    def end_item(self) -> int:
        if not self.items:
            return 0
        return min(self.start_item + len(self.items) - 1, self.total_count)

    @property
    def has_previous(self) -> bool:
        return self.page > 1

    @property
    def has_next(self) -> bool:
        return self.page < self.total_pages

    @property
    def is_empty(self) -> bool:
        return not self.items

    @property
    def state(self) -> dict[str, Any]:
        return {
            "items": self.items,
            "current_page": self.page,
            "per_page": self.per_page,
            "total_pages": self.total_pages,
            "total_count": self.total_count,
            "sort_by": self.sort_by,
            "order": self.order,
            "q": self.q,
            "start_item": self.start_item,
            "end_item": self.end_item,
            "has_previous": self.has_previous,
            "has_next": self.has_next,
            "is_empty": self.is_empty,
        }


def list_query_params(
    *,
    allowed: list[str] | None = None,
    default_sort: str = "created_at",
    default_per_page: int = DEFAULT_PER_PAGE_RESULTS,
):
    """Cria um callable para `Depends(...)` que retorna um `ListQuery` normalizado."""

    def _dep(
        page: int = fastapi.Query(1, ge=1),
        per_page: int = fastapi.Query(default_per_page, ge=1),
        sort_by: str = fastapi.Query("", min_length=0),
        order: str = fastapi.Query(""),
        q: str = fastapi.Query(""),
    ) -> ListQuery:
        return ListQuery.from_params(
            page=page,
            per_page=per_page,
            sort_by=sort_by or None,
            order=order or None,
            q=q,
            allowed=allowed,
            default_sort=default_sort,
        )

    return _dep
