from uuid import UUID

from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.responses import RedirectResponse
from sqlalchemy import select, delete

from core.router.base import CustomRouter
from core.router.methods import get, post
from core.context import request_context
from core.modules.auth.models.favorite import UserFavoriteRamal


class ProfileRouter(CustomRouter):
    prefix = ""
    template_path = "../templates"

    @get("/perfil")
    async def get_perfil(self, request: Request):
        ctx = request_context.get({})
        user = ctx.get("user")

        if not user:
            return RedirectResponse(url="/login", status_code=302)

        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(UserFavoriteRamal)
            .where(UserFavoriteRamal.user_id == user.id)
            .order_by(UserFavoriteRamal.ordem)
        )
        db_favorites = result.scalars().all()

        return self.render_template(
            request,
            "perfil.html",
            extra_context={
                "db_favorites": [
                    {"id": str(f.ramal_id), "ordem": f.ordem}
                    for f in db_favorites
                ],
            },
        )

    @post("/api/favoritos/salvar")
    async def salvar_favoritos(self, request: Request):
        ctx = request_context.get({})
        user = ctx.get("user")

        if not user:
            return JSONResponse({"error": "Não autenticado"}, status_code=401)

        body = await request.json()
        ramal_ids: list[str] = body.get("ramal_ids", [])
        order: list[str] = body.get("order", [])

        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        await db.execute(
            delete(UserFavoriteRamal).where(
                UserFavoriteRamal.user_id == user.id
            )
        )

        for i, rid in enumerate(order if order else ramal_ids):
            if rid in ramal_ids:
                fav = UserFavoriteRamal(
                    user_id=user.id,
                    ramal_id=UUID(rid),
                    ordem=i,
                )
                db.add(fav)

        await uow.commit()

        return JSONResponse({"status": "ok", "count": len(ramal_ids)})

    @get("/api/favoritos")
    async def get_favoritos(self, request: Request):
        ctx = request_context.get({})
        user = ctx.get("user")

        if not user:
            return JSONResponse({"error": "Não autenticado"}, status_code=401)

        uow = request.scope.get("uow")
        db = await uow.get_db_session()

        result = await db.execute(
            select(UserFavoriteRamal)
            .where(UserFavoriteRamal.user_id == user.id)
            .order_by(UserFavoriteRamal.ordem)
        )
        db_favorites = result.scalars().all()

        return JSONResponse({
            "ramal_ids": [str(f.ramal_id) for f in db_favorites],
            "order": [str(f.ramal_id) for f in db_favorites],
        })
