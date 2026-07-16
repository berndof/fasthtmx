from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    async_sessionmaker,
    AsyncSession,
    create_async_engine,
)
from collections.abc import AsyncGenerator
from sqlalchemy.pool import AsyncAdaptedQueuePool, NullPool
from contextlib import asynccontextmanager


class DBSessionManager:
    def __init__(self, db_url):
        self.db_url = db_url
        self.engine: AsyncEngine | None = None
        self.session_factory: async_sessionmaker[AsyncSession] | None = None

    @property
    def _is_sqlite(self) -> bool:
        return self.db_url.startswith("sqlite")

    def start(self) -> None:
        if self._is_sqlite:
            self.engine = create_async_engine(
                self.db_url,
                poolclass=NullPool,
                connect_args={"check_same_thread": False},
            )
        else:
            self.engine = create_async_engine(
                self.db_url,
                poolclass=AsyncAdaptedQueuePool,
                pool_pre_ping=True,
            )

        self.session_factory = async_sessionmaker[AsyncSession](
            self.engine,
            expire_on_commit=False,
        )

    async def stop(self) -> None:
        if self.engine:
            await self.engine.dispose()

    async def create_tables(self) -> None:
        from core.models import BaseModel

        async with self.engine.begin() as conn:
            await conn.run_sync(BaseModel.metadata.create_all)

    @asynccontextmanager
    async def get_session(self) -> AsyncGenerator[AsyncSession]:
        if not self.session_factory:
            raise Exception("Database not initialized")

        async with self.session_factory() as session:
            yield session


from core.settings import DATABASE_URL

db = DBSessionManager(DATABASE_URL)
