from fastapi import Request
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from core.router.base import CustomRouter
from core.router.methods import get
from core.modules.ramais.models.ramal import Regiao


class RamaisApiRouter(CustomRouter):
    prefix = "/api"
    template_path = "../templates"

    @get("/ramais")
    async def listar_ramais(self, request: Request):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(Regiao)
            .options(selectinload(Regiao.ramais))
            .order_by(Regiao.ordem)
        )
        regioes = result.scalars().all()

        data = []
        for regiao in regioes:
            data.append({
                "id": str(regiao.id),
                "nome": regiao.nome,
                "ramais": [
                    {
                        "id": str(ramal.id),
                        "nome": ramal.nome,
                        "numero": ramal.numero,
                    }
                    for ramal in regiao.ramais
                ],
            })

        return data
