from logging import getLogger
from typing import AsyncGenerator

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import sessionmanager, ObjectNotFound, sqlitemanager

logger = getLogger("app.dep.db")


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async for session in sessionmanager.get_session():
        yield session


async def get_sqlite() -> AsyncGenerator[AsyncSession, None]:
    async for session in sqlitemanager.get_session():
        yield session
