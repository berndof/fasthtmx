from logging import getLogger
import logging.config
from core.log import LOG_CONFIG
from core.unit_of_work import UnitOfWork
from core.modules.auth.services.user import UserService

logging.config.dictConfig(LOG_CONFIG)
logger = getLogger("script.seed")

SUPERUSER_DATA = {"username": "blalblalba"}


async def create_superuser():
    uow = UnitOfWork()
    service = UserService(uow)
