from core.models import BaseSqliteModel
from core import registry
from uuid import uuid4, UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, String


@registry.register_model
class UserSession(BaseSqliteModel):
    __tablename__ = "user_session"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    # user_id: #campo uuid , nao é uma relação porque o User esta no BasePGModel
