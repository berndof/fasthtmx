from uuid import uuid4, UUID

from sqlalchemy import ForeignKey, Uuid, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import BaseModel
from core.loader import registry


@registry.register_model
class Regiao(BaseModel):
    __tablename__ = "regiao"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    nome: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    ordem: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    ramais: Mapped[list["Ramal"]] = relationship(
        back_populates="regiao", order_by="Ramal.ordem", lazy="selectin"
    )


@registry.register_model
class Ramal(BaseModel):
    __tablename__ = "ramal"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    regiao_id: Mapped[UUID] = mapped_column(
        Uuid, ForeignKey("regiao.id", ondelete="CASCADE"), nullable=False
    )
    nome: Mapped[str] = mapped_column(String(200), nullable=False)
    numero: Mapped[str] = mapped_column(String(20), nullable=False)
    ordem: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    regiao: Mapped["Regiao"] = relationship(back_populates="ramais")
