from core.models import BaseModel
from core.loader import registry
from uuid import uuid4, UUID
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid, String, DateTime, func, Table, Column, ForeignKey


user_group = Table(
    "user_group",
    BaseModel.metadata,
    Column("user_id", Uuid, ForeignKey("user.id"), primary_key=True),
    Column("group_id", Uuid, ForeignKey("group.id"), primary_key=True),
)


@registry.register_model
class Group(BaseModel):
    __tablename__ = "group"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(
        String(100), unique=True, index=True, nullable=False
    )
    description: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    users: Mapped[list["User"]] = relationship(
        secondary="user_group", back_populates="groups", lazy="selectin"
    )
