from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from starlette.responses import Response
from core.unit_of_work import UnitOfWork
from logging import getLogger

logger = getLogger("app.uow.middleware")


class UowMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        # ANTES DA ROTA

        uow = UnitOfWork()
        # logger.debug("Injecting uow on request now")
        request.state.uow = uow

        response = await call_next(request)

        # Depois da rota
        return response


class teste(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        uow = UnitOfWork()
        logger.debug("Injecting uow on request now")
        request.state.uow = uow

        try:
            response = await call_next(request)

            # Se a rota respondeu com sucesso (HTTP 2xx/3xx), confirma as alterações
            if 200 <= response.status_code < 400:
                await uow.commit()
            else:
                await uow.rollback()

            return response

        except Exception as e:
            # Se a rota estourou qualquer erro não tratado, desfaz tudo em ambos os bancos
            await uow.rollback()
            raise e

        finally:
            # Independentemente de sucesso ou falha, fecha as conexões com as dbs
            await uow.close()
