import asyncio
import logging.config
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from core.log import LOG_CONFIG
from core.database import db
from core.unit_of_work import UnitOfWork
from core.modules.auth.models.user import User
from core.modules.auth.utils import hash_password
from sqlalchemy import select

logging.config.dictConfig(LOG_CONFIG)
logger = logging.getLogger("script.seed")

SUPERUSER_DATA = {
    "username": "admin",
    "email": "admin@admin.com",
    "password": "admin",
}


async def create_superuser():
    db.start()
    uow = UnitOfWork()
    uow_db = await uow.get_db_session()

    result = await uow_db.execute(
        select(User).where(User.email == SUPERUSER_DATA["email"])
    )
    if result.scalar_one_or_none():
        logger.info("Superuser já existe, pulando...")
        return

    user = User(
        username=SUPERUSER_DATA["username"],
        email=SUPERUSER_DATA["email"],
        password_hash=hash_password(SUPERUSER_DATA["password"]),
    )
    uow_db.add(user)
    await uow.commit()
    logger.info("Superuser criado: %s / %s", user.email, SUPERUSER_DATA["password"])

    await db.stop()


if __name__ == "__main__":
    asyncio.run(create_superuser())
