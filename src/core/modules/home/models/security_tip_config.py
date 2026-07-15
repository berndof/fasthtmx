from uuid import uuid4, UUID

from typing import Optional
from sqlalchemy import String, Integer, Boolean, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from core.models import BaseModel
from core.loader import registry


@registry.register_model
class SecurityTipConfig(BaseModel):
    __tablename__ = "security_tip_config"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    interval_seconds: Mapped[int] = mapped_column(Integer, default=8, nullable=False)
    is_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
