from core.models import BasePGModel
from core.loader import registry
from uuid import uuid4, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, String


@registry.register_model
class User(BasePGModel):
    __tablename__ = "user"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    username: Mapped[str] = mapped_column(
        String(100), index=True, nullable=False, unique=True
    )
