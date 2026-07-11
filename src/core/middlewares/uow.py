from core.unit_of_work import UnitOfWork
from logging import getLogger

logger = getLogger("app.uow.middleware")


class UowMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        uow = UnitOfWork()
        scope["uow"] = uow

        status_code = None

        async def wrapped_send(message):
            nonlocal status_code
            if message["type"] == "http.response.start":
                status_code = message["status"]
            await send(message)

        try:
            await self.app(scope, receive, wrapped_send)
        except Exception:
            await uow.rollback()
            await uow.close()
            raise

        if status_code and 200 <= status_code < 400:
            await uow.commit()
        else:
            await uow.rollback()
        await uow.close()
