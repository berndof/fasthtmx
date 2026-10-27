from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import Boolean, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import BaseSQLModel, ObjectStatus, StatusMixin, TimeStampMixin

if TYPE_CHECKING:
    from .group import Group


class User(BaseSQLModel, StatusMixin, TimeStampMixin):
    __tablename__ = "user"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_admin(self):
        return any(gp.name == "admin" for gp in self.groups)

    @property
    def is_enabled(self):
        return self.status == ObjectStatus.ENABLE

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)

    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(100), index=True, unique=True)

    first_name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)

    password: Mapped[str] = mapped_column(String(255), nullable=False)

    # from_ad: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    groups: Mapped[list["Group"]] = relationship(
        secondary="group_members", back_populates="members", lazy="selectin"
    )
