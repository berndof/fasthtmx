from __future__ import annotations

from uuid import UUID

from sqlalchemy import select

from core.database import DeletionBlockedError, UniqueViolation
from core.forms import FormError
from core.lists import ListQuery, ListResult
from core.models import ObjectStatus
from core.services import AbstractModelService

from .models import Projeto, TarefaProjeto
from .schemas import ProjetoForm, TarefaForm


class ProjetoService(AbstractModelService[Projeto]):
    model = Projeto

    async def ensure_demo_seed(self) -> None:
        from decimal import Decimal
        from sqlalchemy import func

        count = (await self.dbSession.execute(select(func.count(Projeto.id)))).scalar() or 0
        if count > 0:
            return

        p1 = Projeto(
            codigo="PRJ-001",
            nome="Gestão de Torres & Infraestrutura",
            categoria="Infraestrutura",
            orcamento=Decimal("185000.00"),
            prioritario=True,
            tags="htmx, async, postgis, softnav",
            descricao="Sistema georreferenciado de torres, terrenos, contratos e faixas de altura.",
        )
        p2 = Projeto(
            codigo="PRJ-002",
            nome="Portal Comercial de Envio de Materiais",
            categoria="Comercial",
            orcamento=Decimal("42500.50"),
            prioritario=True,
            tags="htmx, forms, sse",
            descricao="Portal de submissão de materiais comerciais com verificação por PIN e notificações.",
        )
        p3 = Projeto(
            codigo="PRJ-003",
            nome="Intranet Corporativa & Catálogo de Ramais",
            categoria="Intranet",
            orcamento=Decimal("28900.00"),
            prioritario=False,
            tags="htmx, softnav, async",
            descricao="Portal interno com acesso rápido, dicas de segurança, ramais por região e integração AD/LDAP.",
        )
        self.dbSession.add_all([p1, p2, p3])
        await self.dbSession.flush()
        self.dbSession.add_all(
            [
                TarefaProjeto(
                    projeto_id=p1.id,
                    titulo="Validar polígonos e faixas de altura",
                    responsavel="Engenharia",
                    concluida=False,
                ),
                TarefaProjeto(
                    projeto_id=p1.id,
                    titulo="Padronizar listagens com ListQuery",
                    responsavel="Equipe Core",
                    concluida=True,
                ),
                TarefaProjeto(
                    projeto_id=p2.id,
                    titulo="Testar upload assíncrono em streaming",
                    responsavel="Comercial",
                    concluida=False,
                ),
            ]
        )
        await self.dbSession.commit()

    async def get_list_for_display(self, query: ListQuery | None = None) -> ListResult:
        await self.ensure_demo_seed()
        return await self.get_list_result(
            query,
            search_fields=["nome", "codigo", "categoria", "tags"],
            load_relations=["tarefas"],
        )

    async def create_projeto(self, data: ProjetoForm) -> Projeto:
        payload = {
            "codigo": data.codigo.upper().strip(),
            "nome": data.nome.strip(),
            "categoria": data.categoria,
            "orcamento": data.orcamento,
            "prioritario": data.prioritario,
            "tags": ", ".join(data.tags),
            "descricao": data.descricao,
        }
        try:
            return await super().create(payload)
        except UniqueViolation as uv:
            raise FormError({uv.key: uv.display})

    async def get_blockers(self, projeto_id: UUID) -> list[dict] | None:
        stmt = select(TarefaProjeto).where(
            TarefaProjeto.projeto_id == projeto_id,
            TarefaProjeto.status == ObjectStatus.ENABLE,
            TarefaProjeto.concluida.is_(False),
        )
        pendentes = list((await self.dbSession.execute(stmt)).scalars().all())
        if pendentes:
            return [
                {"id": str(t.id), "name": f"{t.titulo} ({t.responsavel})"}
                for t in pendentes
            ]
        return None

    async def check_blockers(self, projeto_id: UUID) -> None:
        blockers = await self.get_blockers(projeto_id)
        if blockers:
            raise DeletionBlockedError(
                message="Este projeto possui tarefas pendentes em aberto.",
                blocked_by=blockers,
            )

    async def delete_projeto(self, projeto_id: UUID) -> bool:
        await self.check_blockers(projeto_id)
        projeto = await self.get_one_by(id=projeto_id)
        return await self.soft_delete(projeto)

    async def add_tarefa(self, projeto_id: UUID, data: TarefaForm) -> TarefaProjeto:
        tarefa = TarefaProjeto(
            projeto_id=projeto_id,
            titulo=data.titulo.strip(),
            responsavel=data.responsavel.strip(),
            concluida=False,
        )
        self.dbSession.add(tarefa)
        await self.dbSession.commit()
        await self.dbSession.refresh(tarefa)
        return tarefa

    async def toggle_tarefa(self, tarefa_id: UUID) -> TarefaProjeto | None:
        stmt = select(TarefaProjeto).where(TarefaProjeto.id == tarefa_id)
        tarefa = (await self.dbSession.execute(stmt)).scalar_one_or_none()
        if not tarefa:
            return None
        tarefa.concluida = not tarefa.concluida
        await self.dbSession.commit()
        await self.dbSession.refresh(tarefa)
        return tarefa

    async def delete_tarefa(self, tarefa_id: UUID) -> None:
        stmt = select(TarefaProjeto).where(TarefaProjeto.id == tarefa_id)
        tarefa = (await self.dbSession.execute(stmt)).scalar_one_or_none()
        if tarefa:
            await self.dbSession.delete(tarefa)
            await self.dbSession.commit()
