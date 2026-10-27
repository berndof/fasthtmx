from __future__ import annotations

from datetime import datetime, timedelta
from uuid import UUID

from fastapi import Depends, Request
from fastapi.responses import Response, StreamingResponse
from sqlalchemy import func, select

from core.database import ObjectNotFound
from core.deps import PermissionVerify, get_current_user, get_db, get_notifier
from core.forms import parse_form
from core.lists import ListQuery, ListResult, list_query_params
from core.models import ObjectStatus
from core.router import ContextRouter, route
from core.utils.htmx import redirect_htmx_header

from ..auth.schemas import UserSession
from .deps import get_guest_id
from .models import Aviso, Notificacao
from .notifier import Notifier
from .schemas import AvisoIn, NotifyPayload
from .services.aviso import AvisoService


class NotificationsRouter(ContextRouter):
    prefix = ""

    # ---------------- SSE ----------------

    @route.get("/events")
    async def sse_endpoint(
        self,
        request: Request,
        user_session: UserSession = Depends(get_current_user),
        notifier: Notifier = Depends(get_notifier),
    ):
        return StreamingResponse(
            notifier.subscribe(
                request, user_session.id.hex, groups=user_session.groups
            ),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )

    @route.get("/events/guest")
    async def sse_guest_endpoint(
        self,
        request: Request,
        guest_id: str = Depends(get_guest_id),
        notifier: Notifier = Depends(get_notifier),
    ):
        return StreamingResponse(
            notifier.subscribe_guest(request, guest_id),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )

    # ---------------- API (header dropdown) ----------------

    @route.get("/api/notificacoes")
    async def list_notifications(
        self,
        user_session: UserSession = Depends(get_current_user),
        notifier: Notifier = Depends(get_notifier),
        limit: int = 20,
        offset: int = 0,
    ):
        items = await notifier.get_history(
            UUID(user_session.id.hex), limit=limit, offset=offset
        )
        return {"notificacoes": items, "next_offset": offset + len(items)}

    @route.post("/api/notificacoes/read")
    async def mark_notifications_read(
        self,
        user_session: UserSession = Depends(get_current_user),
        notifier: Notifier = Depends(get_notifier),
    ):
        await notifier.mark_as_read(user_session.id)
        return {"ok": True}

    @route.delete("/api/notificacoes")
    async def clear_notifications(
        self,
        user_session: UserSession = Depends(get_current_user),
        notifier: Notifier = Depends(get_notifier),
    ):
        await notifier.clear_history(user_session.id)
        return {"ok": True}

    @route.get("/api/notificacoes/unread-count")
    async def unread_count(
        self,
        user_session: UserSession = Depends(get_current_user),
        notifier: Notifier = Depends(get_notifier),
    ):
        count = await notifier.count_unread(user_session.id)
        return {"count": count}

    # ---------------- Admin: avisos (inbox + compose) ----------------

    @route.get("/admin/avisos")
    async def get_avisos(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
        query: ListQuery = Depends(list_query_params(allowed=["created_at"], default_sort="created_at")),
    ):
        ctx = await self._admin_context(dbSession, user, query)
        return self.dynamic_template_response(request, "pages/admin/avisos.html", context=ctx)

    @route.get("/admin/avisos/items")
    async def avisos_items(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
        query: ListQuery = Depends(list_query_params(allowed=["created_at"], default_sort="created_at")),
    ):
        ctx = await self._admin_context(dbSession, user, query)
        return self.chunk_response(request, "pages/admin/avisos.html", "avisos_table", context=ctx)

    @route.post("/admin/avisos")
    async def post_aviso(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(PermissionVerify(["admin"])),
        notifier: Notifier = Depends(get_notifier),
        query: ListQuery = Depends(list_query_params(allowed=["created_at"], default_sort="created_at")),
    ):
        from core.modules.user.services import GroupService, UserService

        result = await parse_form(request, AvisoIn)

        # validação destino_id (antes do AvisoService)
        if result.ok and result.validated.destino in ("user", "group") and not result.validated.destino_id:  # type: ignore
            result.add_errors({"destino_id": "Selecione o destinatário."})

        if not result.ok:
            ctx = await self._admin_context(dbSession, user, query)
            ctx["form"] = result.state["form"]
            ctx["form_error"] = result.global_error
            ctx["open_add"] = True
            return self.form_error_response(
                request, "pages/admin/avisos.html", result, context=ctx
            )

        data: AvisoIn = result.validated  # type: ignore

        # resolve user_ids por destino (mesma lógica do legado)
        if data.destino == "all":
            users_all = await UserService(dbSession).get_all()
            user_ids = [u.id for u in users_all]
            channel = "notifications:all"
            group = None
            target = None
        elif data.destino == "group":
            group_service = GroupService(dbSession)
            try:
                group = await group_service.get_one_by(name=data.destino_id)
            except ObjectNotFound:
                result.add_errors({"destino_id": "Grupo não encontrado."})
                ctx = await self._admin_context(dbSession, user, query)
                ctx["form"] = result.state["form"]
                ctx["open_add"] = True
                return self.form_error_response(request, "pages/admin/avisos.html", result, context=ctx)
            members = getattr(group, "members", []) or []
            if not members:
                users_all = await UserService(dbSession).get_all()
                members = [u for u in users_all if any(g.name == group.name for g in getattr(u, "groups", []))]
            user_ids = [m.id for m in members]
            if not user_ids:
                result.add_errors({"destino_id": "Grupo sem membros."})
                ctx = await self._admin_context(dbSession, user, query)
                ctx["form"] = result.state["form"]
                ctx["open_add"] = True
                return self.form_error_response(request, "pages/admin/avisos.html", result, context=ctx)
            channel = f"notifications:group:{group.name}"
            target = None
        else:  # user
            try:
                target = await UserService(dbSession).get_one_by(id=UUID(data.destino_id))  # type: ignore
            except Exception:
                result.add_errors({"destino_id": "Usuário não encontrado."})
                ctx = await self._admin_context(dbSession, user, query)
                ctx["form"] = result.state["form"]
                ctx["open_add"] = True
                return self.form_error_response(request, "pages/admin/avisos.html", result, context=ctx)
            user_ids = [target.id]
            channel = None
            group = None

        # persiste Aviso (fonte da verdade do inbox)
        aviso = await AvisoService(dbSession).create(
            {
                "titulo": data.titulo,
                "mensagem": data.mensagem,
                "nivel": data.nivel,
                "destino": data.destino,
                "destino_id": data.destino_id,
                "remetente_id": user.id,
            }
        )

        payload = NotifyPayload(
            title=data.titulo,
            message=data.mensagem,
            variant=data.nivel,  # type: ignore
            persist=True,
            toast=True,
        )

        if data.destino == "all":
            await notifier.broadcast(user_ids, payload, channel=channel, aviso_id=aviso.id)
            await notifier.push_to_user(
                user.id,
                NotifyPayload(
                    title="Aviso enviado",
                    message=f"Aviso enviado para todos ({len(user_ids)} usuários).",
                    variant="success",
                ),
            )
        elif data.destino == "group":
            await notifier.broadcast(user_ids, payload, channel=channel, aviso_id=aviso.id)  # type: ignore
            await notifier.push_to_user(
                user.id,
                NotifyPayload(
                    title="Aviso enviado",
                    message=f"Aviso enviado para o grupo {group.name} ({len(user_ids)} usuários).",  # type: ignore
                    variant="success",
                ),
            )
        else:
            await notifier.broadcast(user_ids, payload, aviso_id=aviso.id)
            await notifier.push_to_user(
                user.id,
                NotifyPayload(
                    title="Aviso enviado",
                    message=f"Aviso enviado para {target.name}.",  # type: ignore
                    variant="success",
                ),
            )

        response = Response(status_code=200)
        return redirect_htmx_header(response, "/admin/avisos")

    # ---------------- Inbox do usuário (/avisos) ----------------

    @route.get("/avisos")
    async def get_inbox(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(get_current_user),
        filtro: str = "todos",
        query: ListQuery = Depends(list_query_params(allowed=["created_at"], default_sort="created_at")),
    ):
        ctx = await self._inbox_context(dbSession, user, query, filtro)
        return self.dynamic_template_response(request, "pages/avisos.html", context=ctx)

    @route.get("/avisos/items")
    async def inbox_items(
        self,
        request: Request,
        dbSession=Depends(get_db),
        user=Depends(get_current_user),
        filtro: str = "todos",
        query: ListQuery = Depends(list_query_params(allowed=["created_at"], default_sort="created_at")),
    ):
        ctx = await self._inbox_context(dbSession, user, query, filtro)
        return self.chunk_response(request, "pages/avisos.html", "inbox_table", context=ctx)

    @route.post("/avisos/{notificacao_id}/read")
    async def inbox_mark_read(
        self,
        request: Request,
        notificacao_id: UUID,
        dbSession=Depends(get_db),
        user=Depends(get_current_user),
    ):
        from sqlalchemy import update

        await dbSession.execute(
            update(Notificacao)
            .where(
                Notificacao.id == notificacao_id,
                Notificacao.user_id == user.id,
                Notificacao.status == ObjectStatus.ENABLE,
            )
            .values(lida=True)
        )
        await dbSession.commit()
        # re-render linha
        result = await dbSession.execute(
            select(Notificacao).where(Notificacao.id == notificacao_id)
        )
        n = result.scalar_one_or_none()
        # busca aviso/remetente para contexto da linha
        aviso = None
        remetente_nome = "Sistema"
        if n and n.aviso_id:
            ar = await dbSession.execute(select(Aviso).where(Aviso.id == n.aviso_id))
            aviso = ar.scalar_one_or_none()
            if aviso and aviso.remetente_id:
                from core.modules.user.models import User

                ur = await dbSession.execute(select(User).where(User.id == aviso.remetente_id))
                u = ur.scalar_one_or_none()
                if u:
                    remetente_nome = u.name  # type: ignore
        # renderiza só a linha via partial (evita block aninhado)
        return self.full_template_response(
            request,
            "partials/avisos-row.html",
            context={"n": n, "aviso": aviso, "remetente_nome": remetente_nome, "user": user},
        )

    @route.delete("/avisos/{notificacao_id}")
    async def inbox_dismiss(
        self,
        request: Request,
        notificacao_id: UUID,
        dbSession=Depends(get_db),
        user=Depends(get_current_user),
    ):
        from sqlalchemy import update

        await dbSession.execute(
            update(Notificacao)
            .where(
                Notificacao.id == notificacao_id,
                Notificacao.user_id == user.id,
                Notificacao.status == ObjectStatus.ENABLE,
            )
            .values(status=ObjectStatus.DELETED)
        )
        await dbSession.commit()
        return Response(status_code=200)

    # ---------------- helpers ----------------

    async def _admin_context(self, dbSession, user, query: ListQuery) -> dict:
        from core.modules.user.services import GroupService, UserService
        from sqlalchemy import func

        users = await UserService(dbSession).get_all()
        groups = await GroupService(dbSession).get_list()

        # paginação de avisos (sent)
        aviso_service = AvisoService(dbSession)
        items, total_pages, page, per_page, total_count = await aviso_service.get_list_paginated(
            page=query.page, per_page=query.per_page, sort_by=query.sort_by, order=query.order
        )
        avisos_result = ListResult.from_paginated(items, total_pages, page, per_page, total_count, query.sort_by, query.order)

        # enriquecimento em lote (recipients + leitura + remetente)
        enriched = await self._enrich_avisos(dbSession, items) if items else []

        # KPIs
        # total avisos já é total_count; para os demais fazemos counts
        total_copias_r = await dbSession.execute(
            select(func.count(Notificacao.id)).where(Notificacao.status == ObjectStatus.ENABLE, Notificacao.aviso_id.is_not(None))
        )
        total_copias = total_copias_r.scalar_one() or 0

        nao_lidos_r = await dbSession.execute(
            select(func.count(Notificacao.id)).where(Notificacao.status == ObjectStatus.ENABLE, Notificacao.lida.is_(False))
        )
        nao_lidos = nao_lidos_r.scalar_one() or 0

        hoje = datetime.utcnow().date()
        hoje_inicio = datetime.combine(hoje, datetime.min.time())
        hoje_r = await dbSession.execute(
            select(func.count(Aviso.id)).where(Aviso.status == ObjectStatus.ENABLE, Aviso.created_at >= hoje_inicio)
        )
        hoje_count = hoje_r.scalar_one() or 0

        return {
            "page": {"title": "Avisos"},
            "user": user,
            "users": users,
            "groups": groups,
            "avisos": items,
            "enriched": enriched,
            "avisos_result": avisos_result,
            "kpis": {
                "total_avisos": total_count,
                "total_copias": total_copias,
                "nao_lidos": nao_lidos,
                "hoje": hoje_count,
            },
            "form": {},
        }

    async def _enrich_avisos(self, dbSession, avisos: list[Aviso]) -> list[dict]:
        from core.modules.user.models import User

        aviso_ids = [a.id for a in avisos]
        if not aviso_ids:
            return []

        # todas as cópias desses avisos
        nr = await dbSession.execute(
            select(Notificacao).where(Notificacao.aviso_id.in_(aviso_ids), Notificacao.status == ObjectStatus.ENABLE)
        )
        notifs = list(nr.scalars().all())

        # agrupar por aviso_id
        by_aviso: dict[UUID, list[Notificacao]] = {aid: [] for aid in aviso_ids}
        all_user_ids: set[UUID] = set()
        remetente_ids: set[UUID] = set()
        for n in notifs:
            if n.aviso_id in by_aviso:
                by_aviso[n.aviso_id].append(n)
                all_user_ids.add(n.user_id)
        for a in avisos:
            if a.remetente_id:
                remetente_ids.add(a.remetente_id)

        # nomes de usuários destinatários + remetentes (1 query)
        wanted_ids = list(all_user_ids | remetente_ids)
        user_map: dict[UUID, str] = {}
        remetente_map: dict[UUID, str] = {}
        if wanted_ids:
            ur = await dbSession.execute(select(User).where(User.id.in_(wanted_ids)))
            for u in ur.scalars().all():
                user_map[u.id] = u.name  # type: ignore
                remetente_map[u.id] = u.name  # type: ignore

        enriched: list[dict] = []
        for aviso in avisos:
            copies = by_aviso.get(aviso.id, [])
            total = len(copies)
            lidas = sum(1 for c in copies if c.lida)
            # nomes ordenados alfabeticamente para preview estável
            names = sorted([user_map.get(c.user_id, str(c.user_id)[:8]) for c in copies])
            preview_names = names[:3]
            resto = total - len(preview_names)
            # label de destino
            if aviso.destino == "all":
                dest_label = "Todos"
            elif aviso.destino == "group":
                dest_label = f"Grupo {aviso.destino_id}" if aviso.destino_id else "Grupo"
            elif aviso.destino == "user" and total == 1 and copies:
                dest_label = user_map.get(copies[0].user_id, aviso.destino_id or "Usuário")
            else:
                dest_label = aviso.destino
            enriched.append(
                {
                    "aviso": aviso,
                    "copies": copies,
                    "total": total,
                    "lidas": lidas,
                    "nao_lidas": total - lidas,
                    "pct": int(lidas / total * 100) if total else 0,
                    "names": names,
                    "preview_names": preview_names,
                    "resto": resto,
                    "dest_label": dest_label,
                    "remetente_nome": remetente_map.get(aviso.remetente_id, "Sistema") if aviso.remetente_id else "Sistema",
                }
            )
        return enriched

    async def _inbox_context(self, dbSession, user, query: ListQuery, filtro: str) -> dict:
        from sqlalchemy import func

        # filtro: todos | nao_lidas
        base = select(Notificacao).where(Notificacao.user_id == user.id, Notificacao.status == ObjectStatus.ENABLE)
        if filtro == "nao_lidas":
            base = base.where(Notificacao.lida.is_(False))
        base = base.order_by(Notificacao.created_at.desc() if query.order == "desc" else Notificacao.created_at.asc())

        count_stmt = select(func.count()).select_from(base.subquery())
        total_r = await dbSession.execute(count_stmt)
        total_count = total_r.scalar_one() or 0
        per_page = query.per_page
        total_pages = (total_count + per_page - 1) // per_page if per_page else 1
        offset = (query.page - 1) * per_page
        page_stmt = base.offset(offset).limit(per_page)
        res = await dbSession.execute(page_stmt)
        items: list[Notificacao] = list(res.scalars().all())
        result = ListResult.from_paginated(items, total_pages, query.page, per_page, total_count, query.sort_by, query.order)

        # remetentes (via aviso)
        aviso_ids = [n.aviso_id for n in items if n.aviso_id]
        aviso_map: dict[UUID, Aviso] = {}
        remetente_map: dict[UUID, str] = {}
        if aviso_ids:
            ar = await dbSession.execute(select(Aviso).where(Aviso.id.in_(aviso_ids)))
            for av in ar.scalars().all():
                aviso_map[av.id] = av
            rem_ids = [av.remetente_id for av in aviso_map.values() if av.remetente_id]
            if rem_ids:
                from core.modules.user.models import User

                ur = await dbSession.execute(select(User).where(User.id.in_(rem_ids)))
                for u in ur.scalars().all():
                    remetente_map[u.id] = u.name  # type: ignore

        # itens enriquecidos para template (n + aviso + remetente_nome)
        inbox_items = []
        for n in items:
            av = aviso_map.get(n.aviso_id) if n.aviso_id else None
            rn = remetente_map.get(av.remetente_id, "Sistema") if av and av.remetente_id else "Sistema"
            inbox_items.append({"n": n, "aviso": av, "remetente_nome": rn})

        # unread count para badge do filtro
        unread_r = await dbSession.execute(
            select(func.count(Notificacao.id)).where(
                Notificacao.user_id == user.id, Notificacao.status == ObjectStatus.ENABLE, Notificacao.lida.is_(False)
            )
        )
        unread_count = unread_r.scalar_one() or 0

        return {
            "page": {"title": "Avisos"},
            "user": user,
            "items": items,
            "inbox_items": inbox_items,
            "result": result,
            "filtro": filtro,
            "unread_count": unread_count,
            "total_count": total_count,
        }
