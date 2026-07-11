from abc import ABC
from typing import TypeVar, Generic, Optional
from sqlalchemy.orm import DeclarativeBase
from core.unit_of_work import UnitOfWork
from logging import getLogger
from fastapi import Request

T = TypeVar("T", bound=DeclarativeBase)


class AbstractService(ABC):
    def __init__(self, request: Request, uow: Optional[UnitOfWork] = None):
        self.request: Request = request

        # melhorar assinatura
        self.uow: UnitOfWork = request.scope.get("uow")

        self.logger = getLogger(f"app.service{self.__class__.__name__.lower()}")


class ModelService(AbstractService, Generic[T]):
    model: type[T]

    def __init__(self, request: Request):
        super().__init__(request)
