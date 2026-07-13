from datetime import datetime
from core.models import BaseModel
from core.loader import registry
from uuid import uuid4, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid, String, DateTime, ForeignKey, func


@registry.register_model
class AdGroupMapping(BaseModel):
    __tablename__ = "ad_group_mapping"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    ad_group_name: Mapped[str] = mapped_column(String(255), nullable=False)
    ad_group_dn: Mapped[str] = mapped_column(String(512), nullable=False)
    group_id: Mapped[UUID] = mapped_column(
        Uuid, ForeignKey("group.id"), nullable=False, unique=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    group: Mapped["Group"] = relationship(back_populates="ad_mapping")
