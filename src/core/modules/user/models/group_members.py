from __future__ import annotations

from uuid import UUID

from sqlalchemy import Column, ForeignKey, Table

from core.models import BaseSQLModel

group_members = Table(
    "group_members",
    BaseSQLModel.metadata,
    Column[UUID]("user_id", ForeignKey("user.id"), primary_key=True),
    Column[UUID]("group_id", ForeignKey("group.id"), primary_key=True),
)
