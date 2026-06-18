from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    async_sessionmaker,
    AsyncSession,
    create_async_engine,
)
from collections.abc import AsyncGenerator
from sqlalchemy.pool import AsyncAdaptedQueuePool
from contextlib import asynccontextmanager


class DBSessionManager:
    def __init__(self, db_url):
        self.db_url = db_url
        self.engine: AsyncEngine | None = None
        self.session_factory: async_sessionmaker[AsyncSession] | None = None

    def start(self) -> None:
        self.engine = create_async_engine(
            self.db_url,
            poolclass=AsyncAdaptedQueuePool,
            # pool_size=settings.POOL_SIZE,
            # max_overflow=settings.MAX_OVERFLOW,
            pool_pre_ping=True,
            # pool_recycle=settings.POOL_RECYCLE,
            # echo=True,
        )

        self.session_factory = async_sessionmaker[AsyncSession](
            self.engine,
            expire_on_commit=False,  # autoflush=False
        )

    async def stop(self) -> None:
        if self.engine:
            await self.engine.dispose()

    @asynccontextmanager
    async def get_session(self) -> AsyncGenerator[AsyncSession]:
        if not self.session_factory:
            raise Exception("Database not initialized")

        async with self.session_factory() as session:
            yield session


from core.settings import POSTGRES_DB_URL, SQLITE_DB_URL

pg_manager = DBSessionManager(POSTGRES_DB_URL)
sqlite_manager = DBSessionManager(SQLITE_DB_URL)
