from core.database import db
from typing import TYPE_CHECKING
from logging import getLogger
from sqlalchemy.ext.asyncio import AsyncSession


if TYPE_CHECKING:
    from core.service import AbstractService

logger = getLogger("app.uow")


class UnitOfWork:
    def __init__(self):
        self.db = db
        # self.sqlite_manager = sqlite_manager

        self.session: AsyncSession | None = None
        # self.sqlite_session: AsyncSession | None = None

        self._ctx = None
        # self._sqlite_ctx = None

    async def get_db_session(self) -> AsyncSession:
        """Inicializa a sessão Postgres se não existir e a retorna."""
        if self.session is None:
            self._ctx = self.db.get_session()
            self.session = await self._ctx.__aenter__()  # Entra no contexto manualmente
        return self.session

    # async def get_sqlite_session(self) -> AsyncSession:
    #    """Inicializa a sessão SQLite se não existir e a retorna."""
    #    if self.sqlite_session is None:
    #        self._sqlite_ctx = self.sqlite_manager.get_session()
    #        self.sqlite_session = await self._sqlite_ctx.__aenter__()
    #    return self.sqlite_session  # pyright: ignore[reportReturnType]

    async def close(self):
        """Garante o fechamento seguro dos contextos abertos."""
        # if self._pg_ctx:
        #    await self._pg_ctx.__aexit__(None, None, None)
        # if self._sqlite_ctx:
        #    await self._sqlite_ctx.__aexit__(None, None, None)
        if self._ctx:
            await self._ctx.__aexit__(None, None, None)

    async def commit(self):
        # if self.pg_session:
        #    await self.pg_session.commit()
        # if self.sqlite_session:
        #    await self.sqlite_session.commit()
        if self.session:
            await self.session.commit()

    async def rollback(self):
        # if self.pg_session:
        #    await self.pg_session.rollback()
        # if self.sqlite_session:
        #    await self.sqlite_session.rollback()
        if self.session:
            await self.session.rollback()
