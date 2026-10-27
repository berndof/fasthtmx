from __future__ import annotations

from decimal import Decimal
from uuid import UUID, uuid4

from sqlalchemy import Boolean, ForeignKey, Numeric, String, Text, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import BaseSQLModel, StatusMixin, TimeStampMixin


class Projeto(BaseSQLModel, StatusMixin, TimeStampMixin):
    __tablename__ = "projetos_demo"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    codigo: Mapped[str] = mapped_column(String(30), unique=True, nullable=False, index=True)
    nome: Mapped[str] = mapped_column(String(140), unique=True, nullable=False)
    categoria: Mapped[str] = mapped_column(String(60), nullable=False, default="Infraestrutura")
    orcamento: Mapped[Decimal] = mapped_column(Numeric(14, 2), nullable=False, default=Decimal("0.00"))
    prioritario: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    tags: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    descricao: Mapped[str | None] = mapped_column(Text, nullable=True)

    tarefas: Mapped[list["TarefaProjeto"]] = relationship(
        "TarefaProjeto",
        back_populates="projeto",
        cascade="all, delete-orphan",
        lazy="selectin",
    )

    @property
    def tag_list(self) -> list[str]:
        return [t.strip() for t in (self.tags or "").split(",") if t.strip()]


class TarefaProjeto(BaseSQLModel, StatusMixin, TimeStampMixin):
    __tablename__ = "tarefas_projeto_demo"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    projeto_id: Mapped[UUID] = mapped_column(
        Uuid, ForeignKey("projetos_demo.id", ondelete="CASCADE"), nullable=False, index=True
    )
    titulo: Mapped[str] = mapped_column(String(160), nullable=False)
    responsavel: Mapped[str] = mapped_column(String(80), nullable=False, default="Equipe Core")
    concluida: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    projeto: Mapped["Projeto"] = relationship("Projeto", back_populates="tarefas")


__all__ = ["Projeto", "TarefaProjeto"]
