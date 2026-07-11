from uuid import UUID
from fastapi import Request, Response
from uuid import uuid4
from typing import Callable
from fastapi.routing import APIRoute
from core.context import request_context


class ContextRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def include_context_handler(request: Request) -> Response:
            request_id = str(uuid4())

            user = None
            session_id = request.cookies.get("appSession")
            if session_id:
                try:
                    from core.unit_of_work import UnitOfWork
                    from core.modules.auth.models.session import UserSession
                    from core.modules.auth.models.user import User

                    uow: UnitOfWork = request.scope.get("uow")
                    db = await uow.get_db_session()
                    session = await db.get(UserSession, UUID(session_id))
                    if session:
                        user = await db.get(User, session.user_id)
                except Exception:
                    pass

            stoken = request_context.set({"user": user})

            response: Response = await original_route_handler(request)

            response.headers["Request-ID"] = request_id

            request_context.reset(stoken)

            return response

        return include_context_handler
