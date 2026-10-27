import uuid
from uuid import UUID

from sqlalchemy import Boolean, DateTime, ForeignKey, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from core.models import BaseSQLModel, StatusMixin, TimeStampMixin


class Aviso(BaseSQLModel, StatusMixin, TimeStampMixin):
    __tablename__ = "avisos"

    __table_args__ = (
        Index("ix_avisos_created", "created_at"),
        Index("ix_avisos_remetente", "remetente_id"),
    )

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    remetente_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("user.id"), nullable=True, index=True
    )
    titulo: Mapped[str] = mapped_column(String(200), nullable=False)
    mensagem: Mapped[str] = mapped_column(Text, nullable=False)
    nivel: Mapped[str] = mapped_column(String(20), nullable=False, default="info")
    destino: Mapped[str] = mapped_column(String(20), nullable=False, default="all")
    destino_id: Mapped[str | None] = mapped_column(String(200), nullable=True)


class Notificacao(BaseSQLModel, StatusMixin, TimeStampMixin):
    __tablename__ = "notificacoes"

    __table_args__ = (
        Index("ix_notificacoes_user_created", "user_id", "created_at"),
        Index("ix_notificacoes_user_unread", "user_id", "lida", "status"),
        Index("ix_notificacoes_aviso", "aviso_id"),
    )

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id"), nullable=False, index=True
    )
    aviso_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("avisos.id", ondelete="SET NULL"), nullable=True
    )
    nivel: Mapped[str] = mapped_column(String(20), nullable=False, default="info")
    titulo: Mapped[str | None] = mapped_column(String(200), nullable=True)
    mensagem: Mapped[str] = mapped_column(Text, nullable=False)
    lida: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
