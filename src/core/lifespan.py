__all__ = ["lifespan"]

from contextlib import asynccontextmanager
from fastapi import FastAPI
from core.loader import registry
from core.database.session import db


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.start()

    registry.load_modules(app)

    if db._is_sqlite:
        await db.create_tables()

    try:
        yield
    finally:
        await db.stop()
