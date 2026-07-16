from uuid import uuid4, UUID
from core.models import BaseModel
from core.loader import registry
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid, ForeignKey, Integer, UniqueConstraint


@registry.register_model
class UserFavoriteRamal(BaseModel):
    __tablename__ = "user_favorite_ramal"
    __table_args__ = (
        UniqueConstraint("user_id", "ramal_id", name="uq_user_ramal"),
    )

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )
    ramal_id: Mapped[UUID] = mapped_column(Uuid, nullable=False)
    ordem: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    user: Mapped["User"] = relationship(back_populates="favorites")
