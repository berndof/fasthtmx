import logging
import time
import uuid
from typing import Callable

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from core.router.schemas import RequestContext, RequestContextSchema

logger = logging.getLogger("app.access")
err_logger = logging.getLogger("app.error")
from core.log import LOG_STATIC

class AccessLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        # Gera o ID da requisição
        req_id = request.headers.get("X-Request-ID", uuid.uuid4().hex[:12])
        
        # Seta o RequestContext globalmente (útil para os Services poderem logar com req_id)
        ctx = RequestContextSchema(request_id=req_id, sub_id=None)
        token = RequestContext.set(ctx)

        # Trata IP do cliente
        forwarded = request.headers.get("X-Forwarded-For")
        ip = forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else "127.0.0.1")

        start_time = time.perf_counter()
        
        # Tenta extrair usuário se a rota/middleware de auth populou (o Theme já rodou, mas Auth talvez não)
        # Então vamos verificar após a chamada
        
        try:
            response = await call_next(request)
            status_code = response.status_code
            exc_to_log = None
        except Exception as exc:
            status_code = 500
            response = None
            exc_to_log = exc
        finally:
            duration_ms = (time.perf_counter() - start_time) * 1000
            
            # Pega usuário caso o AuthMiddleware ou ContextRouter tenha injetado
            user_payload = getattr(request.state, "user_payload", None)
            sub = getattr(user_payload, "sub", None) if user_payload else None
            user_id = str(sub) if sub else "anonymous"

            # Identifica requisição HTMX
            is_htmx = request.headers.get("hx-request") == "true"
            htmx_target = request.headers.get("hx-target", "")
            htmx_info = f" [HTMX: #{htmx_target}]" if is_htmx and htmx_target else " [HTMX]" if is_htmx else ""

            # Filtro para arquivos estáticos
            path = request.url.path
            is_static = path.startswith("/static") or path.startswith("/vendor")
            
            should_log = True
            if is_static and not LOG_STATIC:
                should_log = False
                
            if should_log:
                # O formatter access_console e accessfile recebem isso
                # Vamos logar o record formatado com cor baseada no status
                method = request.method
                
                # Monta a linha do console
                console_msg = f"{ip} - {method} {path} {status_code} ({duration_ms:.1f}ms){htmx_info} [User: {user_id}] [Req: {req_id}]"
                
                # O uvicorn.logging.DefaultFormatter mapeia a cor com %(levelprefix)s, mas podemos
                # definir o log-level com base no status para pintar a bolinha da cor certa.
                if status_code >= 500:
                    logger.error(console_msg)
                elif status_code >= 400:
                    logger.warning(console_msg)
                else:
                    logger.info(console_msg)
                    
                # E o access_file (logger secundário que escuta app.access) irá apenas logar o formato estruturado
                # Definimos a formatação no `access_file` como `%(message)s` no log.py, então a linha exata é salva.
                # Como formatar para o arquivo: timestamp é garantido pelo RotatingFileHandler.

            if exc_to_log:
                err_logger.error(
                    "Erro não tratado na requisição HTTP: %s %s (%.2fms) [ReqID: %s, User: %s]: %s",
                    request.method,
                    request.url.path,
                    duration_ms,
                    req_id,
                    user_id,
                    exc_to_log,
                    exc_info=exc_to_log,
                )

            RequestContext.reset(token)

        if response:
            response.headers["X-Request-ID"] = req_id
            response.headers["X-Response-Time-Ms"] = f"{duration_ms:.2f}"
            return response
        else:
            raise exc_to_log

