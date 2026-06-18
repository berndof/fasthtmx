__all__ = ["lifespan"]

from contextlib import asynccontextmanager
from fastapi import FastAPI
from core.loader import registry
from core.database.session import pg_manager, sqlite_manager


@asynccontextmanager
async def lifespan(app: FastAPI):
    pg_manager.start()
    sqlite_manager.start()

    registry.load_modules(app)

    try:
        yield
    finally:
        await pg_manager.stop()
        await sqlite_manager.stop()
