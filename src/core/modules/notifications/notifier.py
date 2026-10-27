from __future__ import annotations

import asyncio
import json
import logging
from collections.abc import AsyncGenerator
from typing import Any
from uuid import UUID

from fastapi import Request
from sqlalchemy import delete, select, update

from core.database import sessionmanager
from core.models import ObjectStatus
from core.settings import REDIS_ENABLED, REDIS_URL

from .models import Notificacao
from .schemas import NotifyPayload

logger = logging.getLogger("app.notification")


class MemoryPubSub:
    """In-memory pubsub session simulating Redis pubsub for local development."""

    def __init__(self, parent: MemoryPubSubClient) -> None:
        self.parent = parent
        self.channels: set[str] = set()
        self.queue: asyncio.Queue[str] = asyncio.Queue()

    async def subscribe(self, *channels: str) -> None:
        for ch in channels:
            self.channels.add(ch)
            self.parent.subscribers.setdefault(ch, set()).add(self)

    async def unsubscribe(self, *channels: str) -> None:
        for ch in channels:
            self.channels.discard(ch)
            if ch in self.parent.subscribers:
                self.parent.subscribers[ch].discard(self)

    async def get_message(
        self, ignore_subscribe_messages: bool = True, timeout: float = 15.0
    ) -> dict[str, Any] | None:
        try:
            msg = await asyncio.wait_for(self.queue.get(), timeout=timeout)
            return {"type": "message", "data": msg}
        except asyncio.TimeoutError:
            return None

    async def aclose(self) -> None:
        await self.unsubscribe(*list(self.channels))


class MemoryPubSubClient:
    """In-memory message bus when Redis is disabled or offline."""

    def __init__(self) -> None:
        self.subscribers: dict[str, set[MemoryPubSub]] = {}

    def pubsub(self) -> MemoryPubSub:
        return MemoryPubSub(self)

    async def publish(self, channel: str, message: str) -> int:
        subs = self.subscribers.get(channel, set())
        for sub in list(subs):
            sub.queue.put_nowait(message)
        return len(subs)


class Notifier:
    """Persists user notifications in DB and distributes events via Redis or in-memory bus."""

    def __init__(self) -> None:
        self._redis: Any = None
        self._memory_client: MemoryPubSubClient | None = None
        self._use_memory: bool = not REDIS_ENABLED

    def _redis_client(self) -> Any:
        if self._redis is None:
            from redis.asyncio import Redis

            self._redis = Redis.from_url(REDIS_URL, decode_responses=True)
        return self._redis

    def _get_memory_client(self) -> MemoryPubSubClient:
        if self._memory_client is None:
            self._memory_client = MemoryPubSubClient()
        return self._memory_client

    def _get_pubsub(self):
        if not self._use_memory:
            try:
                return self._redis_client().pubsub()
            except Exception as e:
                logger.warning("Redis indisponível (%s). Usando barramento em memória.", e)
                self._use_memory = True
        return self._get_memory_client().pubsub()

    async def _publish(self, channel: str, data: str) -> None:
        if not self._use_memory:
            try:
                await self._redis_client().publish(channel, data)
                return
            except Exception as e:
                logger.warning("Erro ao publicar no Redis (%s). Usando barramento em memória.", e)
                self._use_memory = True
        await self._get_memory_client().publish(channel, data)

    @staticmethod
    def _user_channel(user_id: UUID | str) -> str:
        return f"notifications:user:{user_id.hex if isinstance(user_id, UUID) else user_id}"

    @staticmethod
    def _group_channel(group_name: str) -> str:
        return f"notifications:group:{group_name}"

    # --- Push methods ---

    async def push_to_user(self, user_id: UUID, payload: NotifyPayload) -> None:
        persisted_id: str | None = None
        if payload.persist:
            persisted_id = await self._persist(user_id, payload)
        data = payload.model_dump(mode="json")
        if persisted_id:
            data["id"] = persisted_id
        await self._publish(self._user_channel(user_id), json.dumps(data))

    async def push_to_group(self, group_name: str, payload: NotifyPayload) -> None:
        await self._publish(
            self._group_channel(group_name), json.dumps(payload.model_dump(mode="json"))
        )

    async def push_to_guests(self, payload: NotifyPayload) -> None:
        await self._publish(
            "notifications:guests", json.dumps(payload.model_dump(mode="json"))
        )

    async def push_to_all(self, payload: NotifyPayload) -> None:
        await self._publish(
            "notifications:all", json.dumps(payload.model_dump(mode="json"))
        )

    async def broadcast(
        self,
        user_ids: list[UUID],
        payload: NotifyPayload,
        channel: str | None = None,
        aviso_id: UUID | None = None,
    ) -> None:
        # persiste uma linha por usuário alvo (fan-out); publica 1x no canal compartilhado
        for uid in user_ids:
            await self._persist(uid, payload, aviso_id=aviso_id)
        data = payload.model_dump(mode="json")
        # para o frontend deduplicar, não usamos id único por linha no broadcast;
        # o payload é o mesmo para todos (id não é por destinatário)
        if channel:
            await self._publish(channel, json.dumps(data))
        else:
            for uid in user_ids:
                await self._publish(self._user_channel(uid), json.dumps(data))

    # --- SSE ---

    async def subscribe(
        self, request: Request, user_id: str, groups: list[str] | None = None
    ) -> AsyncGenerator[str, None]:
        pubsub = self._get_pubsub()
        channels = [self._user_channel(user_id), "notifications:all"]
        channels.extend(self._group_channel(group) for group in (groups or []))
        await pubsub.subscribe(*channels)
        try:
            yield ": connected\n\n"
            while not await request.is_disconnected():
                message = await pubsub.get_message(
                    ignore_subscribe_messages=True, timeout=15
                )
                if message and message["type"] == "message":
                    yield f"data: {message['data']}\n\n"
                else:
                    yield ": heartbeat\n\n"
        finally:
            await pubsub.unsubscribe(*channels)
            await pubsub.aclose()

    async def subscribe_guest(
        self, request: Request, guest_id: str
    ) -> AsyncGenerator[str, None]:
        pubsub = self._get_pubsub()
        await pubsub.subscribe("notifications:guests")
        try:
            yield ": connected\n\n"
            while not await request.is_disconnected():
                message = await pubsub.get_message(
                    ignore_subscribe_messages=True, timeout=15
                )
                if message and message["type"] == "message":
                    yield f"data: {message['data']}\n\n"
                else:
                    yield ": heartbeat\n\n"
        finally:
            await pubsub.unsubscribe("notifications:guests")
            await pubsub.aclose()

    # --- Persistence ---

    async def _persist(
        self, user_id: UUID, payload: NotifyPayload, aviso_id: UUID | None = None
    ) -> str | None:
        async for session in sessionmanager.get_session():
            obj = Notificacao(
                user_id=user_id,
                aviso_id=aviso_id,
                nivel=payload.variant,
                titulo=payload.title,
                mensagem=payload.message,
            )
            session.add(obj)
            await session.commit()
            await session.refresh(obj)
            return str(obj.id)
        return None

    async def get_history(self, user_id: UUID, limit: int = 20, offset: int = 0) -> list[Notificacao]:
        limit = min(max(limit, 1), 100)
        offset = max(offset, 0)
        async for session in sessionmanager.get_session():
            result = await session.execute(
                select(Notificacao)
                .where(
                    Notificacao.user_id == user_id,
                    Notificacao.status == ObjectStatus.ENABLE,
                )
                .order_by(Notificacao.created_at.desc())
                .offset(offset)
                .limit(limit)
            )
            return list(result.scalars().all())
        return []

    async def clear_history(self, user_id: UUID) -> None:
        async for session in sessionmanager.get_session():
            await session.execute(
                update(Notificacao)
                .where(Notificacao.user_id == user_id, Notificacao.status == ObjectStatus.ENABLE)
                .values(status=ObjectStatus.DELETED)
            )
            await session.commit()

    async def mark_as_read(self, user_id: UUID) -> None:
        async for session in sessionmanager.get_session():
            await session.execute(
                update(Notificacao)
                .where(
                    Notificacao.user_id == user_id,
                    Notificacao.status == ObjectStatus.ENABLE,
                    Notificacao.lida.is_(False),
                )
                .values(lida=True)
            )
            await session.commit()

    async def count_unread(self, user_id: UUID) -> int:
        from sqlalchemy import func

        async for session in sessionmanager.get_session():
            result = await session.execute(
                select(func.count(Notificacao.id)).where(
                    Notificacao.user_id == user_id,
                    Notificacao.status == ObjectStatus.ENABLE,
                    Notificacao.lida.is_(False),
                )
            )
            return result.scalar_one()
        return 0


notifier = Notifier()
