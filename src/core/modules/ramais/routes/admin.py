from uuid import UUID

from fastapi import Request, Form
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from starlette.responses import RedirectResponse

from core.router.base import CustomRouter
from core.router.methods import get, post
from core.modules.auth.dependencies import require_group
from core.modules.ramais.models.ramal import Regiao, Ramal


class RamaisAdminRouter(CustomRouter):
    prefix = "/admin/ramais"
    template_path = "../templates"

    @get("/")
    async def admin_list(self, request: Request, _=require_group("admin")):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(Regiao)
            .options(selectinload(Regiao.ramais))
            .order_by(Regiao.ordem)
        )
        regioes = result.scalars().all()

        return self.render_template(
            request, "ramais_admin.html", extra_context={"regioes": regioes}
        )

    @get("/regiao/novo")
    async def regiao_form_novo(self, request: Request, _=require_group("admin")):
        return self.render_template(
            request, "ramais_admin_form_regiao.html", extra_context={"regiao": None}
        )

    @post("/regiao/novo")
    async def regiao_criar(
        self,
        request: Request,
        _=require_group("admin"),
        nome: str = Form(...),
        ordem: int = Form(0),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        regiao = Regiao(nome=nome, ordem=ordem)
        db.add(regiao)
        await uow.commit()

        return RedirectResponse(url="/admin/ramais", status_code=303)

    @get("/regiao/{regiao_id}/editar")
    async def regiao_form_editar(
        self,
        request: Request,
        regiao_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        regiao = await db.get(Regiao, UUID(regiao_id))
        return self.render_template(
            request,
            "ramais_admin_form_regiao.html",
            extra_context={"regiao": regiao},
        )

    @post("/regiao/{regiao_id}/editar")
    async def regiao_atualizar(
        self,
        request: Request,
        regiao_id: str,
        _=require_group("admin"),
        nome: str = Form(...),
        ordem: int = Form(0),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        regiao = await db.get(Regiao, UUID(regiao_id))
        if regiao:
            regiao.nome = nome
            regiao.ordem = ordem
            await uow.commit()

        return RedirectResponse(url="/admin/ramais", status_code=303)

    @post("/regiao/{regiao_id}/excluir")
    async def regiao_excluir(
        self,
        request: Request,
        regiao_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        regiao = await db.get(Regiao, UUID(regiao_id))
        if regiao:
            await db.delete(regiao)
            await uow.commit()

        return RedirectResponse(url="/admin/ramais", status_code=303)

    @get("/ramal/novo")
    async def ramal_form_novo(self, request: Request, _=require_group("admin")):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(select(Regiao).order_by(Regiao.ordem))
        regioes = result.scalars().all()

        return self.render_template(
            request,
            "ramais_admin_form_ramal.html",
            extra_context={"ramal": None, "regioes": regioes},
        )

    @post("/ramal/novo")
    async def ramal_criar(
        self,
        request: Request,
        _=require_group("admin"),
        regiao_id: str = Form(...),
        nome: str = Form(...),
        numero: str = Form(...),
        ordem: int = Form(0),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        ramal = Ramal(regiao_id=UUID(regiao_id), nome=nome, numero=numero, ordem=ordem)
        db.add(ramal)
        await uow.commit()

        return RedirectResponse(url="/admin/ramais", status_code=303)

    @get("/ramal/{ramal_id}/editar")
    async def ramal_form_editar(
        self,
        request: Request,
        ramal_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        ramal = await db.get(Ramal, UUID(ramal_id))
        result = await db.execute(select(Regiao).order_by(Regiao.ordem))
        regioes = result.scalars().all()

        return self.render_template(
            request,
            "ramais_admin_form_ramal.html",
            extra_context={"ramal": ramal, "regioes": regioes},
        )

    @post("/ramal/{ramal_id}/editar")
    async def ramal_atualizar(
        self,
        request: Request,
        ramal_id: str,
        _=require_group("admin"),
        regiao_id: str = Form(...),
        nome: str = Form(...),
        numero: str = Form(...),
        ordem: int = Form(0),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        ramal = await db.get(Ramal, UUID(ramal_id))
        if ramal:
            ramal.regiao_id = UUID(regiao_id)
            ramal.nome = nome
            ramal.numero = numero
            ramal.ordem = ordem
            await uow.commit()

        return RedirectResponse(url="/admin/ramais", status_code=303)

    @post("/ramal/{ramal_id}/excluir")
    async def ramal_excluir(
        self,
        request: Request,
        ramal_id: str,
        _=require_group("admin"),
    ):
        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        ramal = await db.get(Ramal, UUID(ramal_id))
        if ramal:
            await db.delete(ramal)
            await uow.commit()

        return RedirectResponse(url="/admin/ramais", status_code=303)
