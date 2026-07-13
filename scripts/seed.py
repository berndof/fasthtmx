import asyncio
import logging.config
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from core.log import LOG_CONFIG
from core.database import db
from core.unit_of_work import UnitOfWork
from core.modules.auth.models.user import User
from core.modules.auth.models.group import Group
from core.modules.auth.utils import hash_password
from sqlalchemy import select

logging.config.dictConfig(LOG_CONFIG)
logger = logging.getLogger("script.seed")

SUPERUSER_DATA = {
    "username": "admin",
    "email": "admin@admin.com",
    "password": "admin",
}

GROUPS = [
    {"name": "users", "description": "Usuários comuns do sistema"},
    {"name": "admin", "description": "Administradores do sistema"},
    {"name": "root", "description": "Acesso total ao sistema"},
]


async def create_groups(uow_db) -> dict[str, Group]:
    groups = {}
    for g in GROUPS:
        result = await uow_db.execute(select(Group).where(Group.name == g["name"]))
        group = result.scalar_one_or_none()
        if not group:
            group = Group(name=g["name"], description=g["description"])
            uow_db.add(group)
            logger.info("Grupo criado: %s", g["name"])
        groups[g["name"]] = group
    await uow_db.flush()
    return groups


async def create_superuser():
    db.start()
    uow = UnitOfWork()
    uow_db = await uow.get_db_session()

    groups = await create_groups(uow_db)

    result = await uow_db.execute(
        select(User).where(User.email == SUPERUSER_DATA["email"])
    )
    user = result.scalar_one_or_none()

    if not user:
        user = User(
            username=SUPERUSER_DATA["username"],
            email=SUPERUSER_DATA["email"],
            password_hash=hash_password(SUPERUSER_DATA["password"]),
        )
        uow_db.add(user)
        await uow_db.flush()
        logger.info("Superuser criado: %s / %s", user.email, SUPERUSER_DATA["password"])

    user.groups = list(groups.values())
    await uow.commit()
    logger.info(
        "Superuser associado aos grupos: %s",
        ", ".join(g.name for g in groups.values()),
    )

    await db.stop()


if __name__ == "__main__":
    asyncio.run(create_superuser())
