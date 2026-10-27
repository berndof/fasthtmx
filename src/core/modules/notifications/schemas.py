from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import ConfigDict
from uuid import UUID

from core.schema import BaseSchema


class NotificacaoOut(BaseSchema):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    aviso_id: UUID | None = None
    nivel: str
    titulo: str | None = None
    mensagem: str
    lida: bool
    created_at: datetime


class AvisoOut(BaseSchema):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    remetente_id: UUID | None = None
    titulo: str
    mensagem: str
    nivel: str
    destino: str
    destino_id: str | None = None
    created_at: datetime


class NotifyPayload(BaseSchema):
    message: str
    title: str | None = None
    variant: Literal["info", "success", "warning", "danger"] = "info"
    status: str = "pending"
    icon: str | None = None
    action: str | None = None
    timeout: int | None = 5000
    toast: bool = True
    persist: bool = False


class AvisoIn(BaseSchema):
    titulo: str
    mensagem: str
    nivel: Literal["info", "success", "warning", "danger"] = "info"
    destino: Literal["user", "group", "all"] = "all"
    destino_id: str | None = None
