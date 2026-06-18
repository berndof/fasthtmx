from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
import time


class ExampleMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # --------------------------------------------------
        # 1. ANTES DA ROTA (Código executado na IDA)
        # --------------------------------------------------
        inicio_do_cronometro = time.time()
        # print(# Conectando ao banco de dados..."Foi feita uma requisição para:", request.url.path)

        # Aqui o middleware passa o controle para a rota (ou para o próximo middleware)
        resposta = await call_next(request)

        # --------------------------------------------------
        # 2. DEPOIS DA ROTA (Código executado na VOLTA)
        # --------------------------------------------------
        tempo_total = time.time() - inicio_do_cronometro

        # Modificando a resposta antes de enviar ao cliente
        resposta.headers["X-Tempo-Processamento"] = str(tempo_total)
        print(f"A rota demorou {tempo_total:.4f} segundos para responder.")

        return resposta
