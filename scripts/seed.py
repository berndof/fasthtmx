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
from core.modules.ramais.models.ramal import Regiao, Ramal
from core.modules.home.models.quick_access import QuickAccessItem
from sqlalchemy import select

logging.config.dictConfig(LOG_CONFIG)
logger = logging.getLogger("script.seed")

SUPERUSER_DATA = {
    "username": "root",
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


RAMAS_DATA = [
    {
        "nome": "Lages",
        "ordem": 0,
        "ramais": [
            {"nome": "Suporte TI", "numero": "3118", "ordem": 0},
            {"nome": "Recepção", "numero": "3100", "ordem": 1},
            {"nome": "Financeiro", "numero": "3101", "ordem": 2},
            {"nome": "RH", "numero": "3102", "ordem": 3},
        ],
    },
    {
        "nome": "Florianópolis",
        "ordem": 1,
        "ramais": [
            {"nome": "Suporte TI", "numero": "9741", "ordem": 0},
            {"nome": "Recepção", "numero": "9700", "ordem": 1},
            {"nome": "Comercial", "numero": "9701", "ordem": 2},
        ],
    },
    {
        "nome": "São Paulo",
        "ordem": 2,
        "ramais": [
            {"nome": "Suporte TI", "numero": "2100", "ordem": 0},
            {"nome": "Recepção", "numero": "2000", "ordem": 1},
        ],
    },
]


async def seed_ramais():
    db.start()
    uow = UnitOfWork()
    uow_db = await uow.get_db_session()

    for r_data in RAMAS_DATA:
        result = await uow_db.execute(select(Regiao).where(Regiao.nome == r_data["nome"]))
        regiao = result.scalar_one_or_none()
        if not regiao:
            regiao = Regiao(nome=r_data["nome"], ordem=r_data["ordem"])
            uow_db.add(regiao)
            await uow_db.flush()
            logger.info("Região criada: %s", r_data["nome"])

        for rm_data in r_data["ramais"]:
            result = await uow_db.execute(
                select(Ramal).where(Ramal.regiao_id == regiao.id, Ramal.numero == rm_data["numero"])
            )
            ramal = result.scalar_one_or_none()
            if not ramal:
                ramal = Ramal(
                    regiao_id=regiao.id,
                    nome=rm_data["nome"],
                    numero=rm_data["numero"],
                    ordem=rm_data["ordem"],
                )
                uow_db.add(ramal)
                logger.info("  Ramal criado: %s — %s", rm_data["nome"], rm_data["numero"])

    await uow.commit()
    await db.stop()


QUICK_ACCESS_DATA = [
    {"name": "Gestão de Pessoas", "abbr": "RH", "href": "#", "bg_class": "bg-black/10", "text_class": "text-black", "ordem": 0},
    {"name": "Financeiro", "abbr": "$", "href": "#", "bg_class": "bg-sky-500/10", "text_class": "text-sky-500", "ordem": 1},
    {"name": "TI & Suporte", "abbr": "TI", "href": "#", "bg_class": "bg-green-500/10", "text_class": "text-green-500", "ordem": 2},
    {"name": "Marketing", "abbr": "MK", "href": "#", "bg_class": "bg-amber-500/10", "text_class": "text-amber-500", "ordem": 3},
    {"name": "Jurídico", "abbr": "JD", "href": "#", "bg_class": "bg-red-500/10", "text_class": "text-red-500", "ordem": 4},
    {"name": "Compras", "abbr": "CM", "href": "#", "bg_class": "bg-black/10", "text_class": "text-black", "ordem": 5},
    {"name": "Logística", "abbr": "LG", "href": "#", "bg_class": "bg-sky-500/10", "text_class": "text-sky-500", "ordem": 6},
    {"name": "Mais Serviços", "abbr": "+", "href": "#", "bg_class": "bg-green-500/10", "text_class": "text-green-500", "ordem": 7, "is_special": True},
]


async def seed_quick_access():
    db.start()
    uow = UnitOfWork()
    uow_db = await uow.get_db_session()

    for qa_data in QUICK_ACCESS_DATA:
        result = await uow_db.execute(
            select(QuickAccessItem).where(QuickAccessItem.name == qa_data["name"])
        )
        existing = result.scalar_one_or_none()
        if not existing:
            item = QuickAccessItem(
                name=qa_data["name"],
                abbr=qa_data["abbr"],
                href=qa_data.get("href", "#"),
                bg_class=qa_data.get("bg_class", "bg-black/10"),
                text_class=qa_data.get("text_class", "text-black"),
                ordem=qa_data.get("ordem", 0),
                is_special=qa_data.get("is_special", False),
                is_active=True,
            )
            uow_db.add(item)
            logger.info("Item de acesso rápido criado: %s", qa_data["name"])

    await uow.commit()
    await db.stop()


if __name__ == "__main__":
    asyncio.run(create_superuser())
    asyncio.run(seed_ramais())
    asyncio.run(seed_quick_access())
