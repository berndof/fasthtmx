from fastapi import Request, Response
from uuid import uuid4
from typing import Callable
from fastapi.routing import APIRoute
from core.context import request_context


class ContextRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def include_context_handler(request: Request) -> Response:
            # request tracking
            request_id = str(uuid4())

            # get context here
            context = {"name": "admin"}  # example

            # request.state.ctx = context
            stoken = request_context.set({"context": context})

            # process route handler
            response: Response = await original_route_handler(request)

            response.headers["Request-ID"] = request_id

            request_context.reset(stoken)  # boa pratica?

            return response

        return include_context_handler
