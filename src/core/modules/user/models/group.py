from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import String, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import BaseSQLModel, StatusMixin, TimeStampMixin

if TYPE_CHECKING:
    from .user import User


class Group(BaseSQLModel, StatusMixin, TimeStampMixin):
    __tablename__ = "group"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)

    name: Mapped[str] = mapped_column(String(100), index=True, unique=True)

    members: Mapped[list["User"]] = relationship(
        secondary="group_members", back_populates="groups", lazy="selectin"
    )
