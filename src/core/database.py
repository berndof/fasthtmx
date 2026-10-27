from __future__ import annotations

import asyncio
import logging
from collections.abc import AsyncGenerator
from typing import Any, TypeVar

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.pool import AsyncAdaptedQueuePool, NullPool

from core.models import BaseSQLModel
from core.settings import DB_URL, SQLITE_DB_URL

T = TypeVar("T", bound=BaseSQLModel)


logger = logging.getLogger("DBSessionManager")


class SessionManager:
    """Manages asynchronous DB sessions with connection pooling."""

    def __init__(self, db_url: str, use_null_pool: bool = False) -> None:
        self.db_url = db_url

        self.engine: AsyncEngine | None = None
        self.session_factory: async_sessionmaker[AsyncSession] | None = None
        self._use_null_pool = use_null_pool

    def init_db(self) -> None:
        """Initialize the database engine and session factory."""
        is_sqlite = self.db_url.startswith("sqlite")
        pool_class = NullPool if (self._use_null_pool or is_sqlite) else AsyncAdaptedQueuePool

        engine_kwargs: dict[str, Any] = {
            "poolclass": pool_class,
        }
        if not is_sqlite:
            engine_kwargs["pool_pre_ping"] = True

        try:
            self.engine = create_async_engine(
                self.db_url,
                **engine_kwargs,
            )
        except Exception as e:
            raise Exception(f"Failed to create database engine: {e}") from e

        if is_sqlite:
            from sqlalchemy import event

            def _sql_greatest(*args):
                valid = [a for a in args if a is not None]
                return max(valid) if valid else None

            def _sql_least(*args):
                valid = [a for a in args if a is not None]
                return min(valid) if valid else None

            from datetime import datetime, timezone

            @event.listens_for(self.engine.sync_engine, "connect")
            def set_sqlite_pragma(dbapi_connection, connection_record):
                cursor = dbapi_connection.cursor()
                cursor.execute("PRAGMA foreign_keys=ON")
                cursor.execute("PRAGMA journal_mode=WAL")
                cursor.execute("PRAGMA busy_timeout=10000")
                cursor.close()
                try:
                    if hasattr(dbapi_connection, "create_function"):
                        dbapi_connection.create_function("greatest", -1, _sql_greatest)
                        dbapi_connection.create_function("least", -1, _sql_least)
                        dbapi_connection.create_function(
                            "now", 0, lambda: datetime.now(timezone.utc).isoformat()
                        )
                except Exception:
                    pass

        self.session_factory = async_sessionmaker[AsyncSession](
            self.engine,
            expire_on_commit=False,
            autoflush=False,
            class_=AsyncSession,
        )

    async def close(self) -> None:
        """Dispose of the database engine."""
        if self.engine:
            await self.engine.dispose()

    async def get_session(self) -> AsyncGenerator[AsyncSession, None]:
        if not self.session_factory:
            raise RuntimeError("Database session factory is not initialized.")

        async with self.session_factory() as session:
            try:
                yield session
            except HTTPException:
                await session.rollback()
                raise
            except Exception as e:
                await session.rollback()
                logger.error("Erro durante a sessão do banco de dados: %s", e, exc_info=True)
                raise


class UniqueViolation(Exception):
    def __init__(self, model: BaseSQLModel, key: str, value: Any) -> None:
        self.model: BaseSQLModel = model
        self.key: str = key
        self.value: Any = value
        super().__init__()

    @property
    def message(self) -> str:
        return f"O campo '{self.key}' com valor '{self.value}' já existe."

    @property
    def display(self) -> str:
        return f"{self.value} já existe."


class ObjectNotFound(Exception):
    def __init__(self, model: BaseSQLModel) -> None:
        self.model: BaseSQLModel = model
        super().__init__()


class DeletionBlockedError(Exception):
    def __init__(self, message: str, blocked_by: list[dict] | None = None) -> None:
        self.message = message
        self.blocked_by = blocked_by or []
        super().__init__()


# Global instances
sessionmanager = SessionManager(DB_URL)
sqlitemanager = SessionManager(SQLITE_DB_URL, use_null_pool=True)


async def ensure_schema() -> None:
    """Discovers all models and applies all Alembic migrations up to head."""
    from core.loader import loaderRegistry

    loaderRegistry.discover_sqlmodels()
    if sessionmanager.engine is None:
        sessionmanager.init_db()

    from pathlib import Path
    from alembic import command
    from alembic.config import Config

    root = Path(__file__).parent.parent.parent
    alembic_ini = root / "alembic.ini"
    versions_dir = root / "alembic" / "versions"
    has_migrations = versions_dir.exists() and any(
        p.name != "__init__.py" for p in versions_dir.glob("*.py")
    )
    if alembic_ini.exists() and has_migrations:
        try:
            alembic_cfg = Config(str(alembic_ini))
            alembic_cfg.set_main_option("script_location", str(root / "alembic"))
            alembic_cfg.attributes["configure_logger"] = True
            loop = asyncio.get_running_loop()
            await loop.run_in_executor(None, command.upgrade, alembic_cfg, "head")
        except Exception as e:
            logger.warning(
                "Falha ao executar migrações Alembic em ensure_schema: %s. Tentando create_all como fallback.",
                e,
            )

    if sessionmanager.engine:
        async with sessionmanager.engine.begin() as conn:
            await conn.run_sync(BaseSQLModel.metadata.create_all)


async def ensure_default_seed() -> None:
    """Creates default groups and admin user if no users exist in the database."""
    from sqlalchemy import func, select
    from core.modules.user.models.user import User

    if sessionmanager.session_factory is None:
        sessionmanager.init_db()

    try:
        async for session in sessionmanager.get_session():
            result = await session.execute(select(func.count(User.id)))
            count = result.scalar_one()
            if count == 0:
                logger.info("Banco vazio detectado. Executando seed inicial automático...")
                from scripts.default_seed import create_default_groups, create_default_users

                await create_default_groups()
                await create_default_users()
                logger.info("Seed inicial concluído com sucesso.")
            break
    except Exception as e:
        logger.warning("Não foi possível verificar ou executar o seed padrão: %s", e)
