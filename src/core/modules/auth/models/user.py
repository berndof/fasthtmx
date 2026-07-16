from datetime import datetime
from core.models import BaseModel
from core.loader import registry
from uuid import uuid4, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid, String, DateTime


@registry.register_model
class User(BaseModel):
    __tablename__ = "user"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    username: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False, unique=True
    )
    email: Mapped[str] = mapped_column(
        String(255), index=True, nullable=False, unique=True
    )
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    ad_username: Mapped[str | None] = mapped_column(
        String(100), nullable=True, unique=True
    )
    ad_dn: Mapped[str | None] = mapped_column(String(512), nullable=True)
    last_login: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    groups: Mapped[list["Group"]] = relationship(
        secondary="user_group", back_populates="users", lazy="selectin"
    )

    favorites: Mapped[list["UserFavoriteRamal"]] = relationship(
        back_populates="user", lazy="selectin"
    )
