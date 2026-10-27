from sqlalchemy import func, select

from core.services import AbstractModelService

from ..models.audit_log import AuditLog


class AuditLogService(AbstractModelService[AuditLog]):
    model = AuditLog

    async def get_history_paginated(
        self,
        page: int = 1,
        per_page: int = 50,
        entity_type: str | None = None,
        entity_types: list[str] | None = None,
        entity_id: str | None = None,
        action: str | None = None,
    ):
        stmt = select(AuditLog).order_by(AuditLog.created_at.desc())

        if entity_type:
            stmt = stmt.where(AuditLog.entity_type == entity_type)
        if entity_types:
            stmt = stmt.where(AuditLog.entity_type.in_(entity_types))
        if entity_id:
            stmt = stmt.where(AuditLog.entity_id == entity_id)
        if action:
            stmt = stmt.where(AuditLog.action == action)

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_count = (await self.dbSession.execute(count_stmt)).scalar() or 0

        offset = (page - 1) * per_page
        stmt = stmt.offset(offset).limit(per_page)

        result = await self.dbSession.execute(stmt)
        items = result.scalars().all()

        total_pages = (total_count + per_page - 1) // per_page

        return items, total_pages, page, per_page, total_count
