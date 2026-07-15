import json
from logging import getLogger

logger = getLogger("app.ramais.middleware")


class RamaisMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        uow = scope.get("uow")
        if uow:
            try:
                from sqlalchemy import select
                from sqlalchemy.orm import selectinload
                from core.modules.ramais.models.ramal import Regiao

                db = await uow.get_db_session()
                result = await db.execute(
                    select(Regiao)
                    .options(selectinload(Regiao.ramais))
                    .order_by(Regiao.ordem)
                )
                regioes_orm = result.scalars().all()
                regioes = [
                    {
                        "id": str(r.id),
                        "nome": r.nome,
                        "ramais": [
                            {"id": str(rd.id), "nome": rd.nome, "numero": rd.numero}
                            for rd in r.ramais
                        ],
                    }
                    for r in regioes_orm
                ]
                scope["regioes"] = regioes
                scope["regioes_json"] = json.dumps(regioes, ensure_ascii=False)
            except Exception:
                logger.exception("Erro ao buscar ramais na middleware")
                scope["regioes"] = []
                scope["regioes_json"] = "[]"

        await self.app(scope, receive, send)
