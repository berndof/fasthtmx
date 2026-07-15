from uuid import uuid4, UUID

from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, Boolean, Text, Uuid, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from core.models import BaseModel
from core.loader import registry


@registry.register_model
class SecurityTip(BaseModel):
    __tablename__ = "security_tip"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    ordem: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime, server_default=func.now(), nullable=True
    )
