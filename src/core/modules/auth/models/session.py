from core.models import BaseModel
from core.loader import registry
from uuid import uuid4, UUID
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, String, DateTime, func


@registry.register_model
class UserSession(BaseModel):
    __tablename__ = "user_session"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(Uuid, index=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
