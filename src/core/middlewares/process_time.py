from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from starlette.responses import Response
import time


class ProcessResponseTimeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        # ANTES DA ROTA

        start_time = time.perf_counter()

        response = await call_next(request)

        # Depois da rota

        process_time = time.perf_counter() - start_time
        response.headers["X-Process-Time"] = str(process_time)

        return response
