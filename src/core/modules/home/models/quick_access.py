from uuid import uuid4, UUID

from typing import Optional
from sqlalchemy import String, Integer, Boolean, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from core.models import BaseModel
from core.loader import registry


@registry.register_model
class QuickAccessItem(BaseModel):
    __tablename__ = "quick_access_item"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    abbr: Mapped[str] = mapped_column(String(10), nullable=False)
    href: Mapped[str] = mapped_column(String(500), nullable=False, default="#")
    bg_class: Mapped[str] = mapped_column(String(100), nullable=False, default="bg-black/10")
    text_class: Mapped[str] = mapped_column(String(100), nullable=False, default="text-black")
    ordem: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_special: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    icon_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True, default=None)
    is_external: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
