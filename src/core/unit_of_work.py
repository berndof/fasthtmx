from core.database import pg_manager, sqlite_manager
from typing import TYPE_CHECKING
from logging import getLogger
from sqlalchemy.ext.asyncio import AsyncSession


if TYPE_CHECKING:
    from core.service import AbstractService

logger = getLogger("app.uow")


class UnitOfWork:
    def __init__(self):
        self.pg_manager = pg_manager
        self.sqlite_manager = sqlite_manager

        self.pg_session: AsyncSession | None = None
        self.sqlite_session: AsyncSession | None = None

        self._pg_ctx = None
        self._sqlite_ctx = None

    async def get_pg_session(self) -> AsyncSession:
        """Inicializa a sessão Postgres se não existir e a retorna."""
        if self.pg_session is None:
            self._pg_ctx = self.pg_manager.get_session()
            self.pg_session = (
                await self._pg_ctx.__aenter__()
            )  # Entra no contexto manualmente
        return self.pg_session

    async def get_sqlite_session(self) -> AsyncSession:
        """Inicializa a sessão SQLite se não existir e a retorna."""
        if self.sqlite_session is None:
            self._sqlite_ctx = self.sqlite_manager.get_session()
            self.sqlite_session = await self._sqlite_ctx.__aenter__()
        return self.sqlite_session  # pyright: ignore[reportReturnType]

    async def close(self):
        """Garante o fechamento seguro dos contextos abertos."""
        if self._pg_ctx:
            await self._pg_ctx.__aexit__(None, None, None)
        if self._sqlite_ctx:
            await self._sqlite_ctx.__aexit__(None, None, None)

    async def commit(self):
        if self.pg_session:
            await self.pg_session.commit()
        if self.sqlite_session:
            await self.sqlite_session.commit()

    async def rollback(self):
        if self.pg_session:
            await self.pg_session.rollback()
        if self.sqlite_session:
            await self.sqlite_session.rollback()
