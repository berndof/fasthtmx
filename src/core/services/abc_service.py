import logging
import re
from datetime import datetime
from typing import Any, Generic, TypeVar

from sqlalchemy import Select, exists, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.audit import build_create_changes, build_update_changes, create_audit_entry
from core.database import ObjectNotFound, UniqueViolation
from core.models import BaseSQLModel, ObjectStatus
from core.schema import BaseSchema, ModelSchema
from core.user_context import get_current_user_id

logger = logging.getLogger("app.core.service")

T = TypeVar("T", bound=BaseSQLModel)


class AbstractBaseService:
    def __init__(self, dbSession: AsyncSession):
        self.dbSession = dbSession
        self.logger = logging.getLogger(
            f"app.service.{self.__class__.__name__.lower()}"
        )


class AbstractModelService(AbstractBaseService, Generic[T]):
    model: type[T]  # pyright: ignore[reportUninitializedInstanceVariable]

    def __init__(self, dbSession: AsyncSession):
        super().__init__(dbSession)

        # self.get_all = self.get_list

    async def save(self, obj: T, no_commit: bool = False):
        # SAVEPOINT com begin_nested (SQLAlchemy-aware) — mantém o outer
        # transaction válido após IntegrityError, preservando `other` (ex.: user,
        # ORM do contexto de erro) para o re-render. Para update (obj já dirty
        # antes do save), capturamos as mudanças pendentes, limpamos antes do
        # snapshot e reaplicamos DENTRO do savepoint, senão o flush do snapshot
        # antes do savepoint já falha fora e exige rollback total.
        from sqlalchemy import inspect as sa_inspect

        is_new = obj not in self.dbSession
        pending: dict[str, Any] = {}
        if not is_new:
            insp = sa_inspect(obj)
            for attr in insp.attrs:
                # só captura colunas — relacionamentos (ex.: User.groups) causam
                # TypeError se reaplicados via setattr com valor não-lista
                if attr.key in insp.mapper.relationships:
                    continue
                if attr.key not in insp.mapper.column_attrs:
                    continue
                hist = attr.history
                if hist.has_changes():
                    # hist.added[0] é o novo valor pendente
                    pending[attr.key] = hist.added[0] if hist.added else getattr(obj, attr.key)
            if pending:
                # descarta pendências antes do snapshot do begin_nested
                self.dbSession.expire(obj)

        try:
            async with self.dbSession.begin_nested():
                if pending:
                    for k, v in pending.items():
                        setattr(obj, k, v)
                self.dbSession.add(obj)
                await self.dbSession.flush()
            if not no_commit:
                await self.dbSession.commit()

            await self.dbSession.refresh(obj)
            return obj

        except Exception as e:
            if isinstance(e, IntegrityError):
                # savepoint já fez rollback; para is_new expunge, para update
                # o expire acima já descartou o pending e o savepoint desfez o flush
                try:
                    if is_new:
                        self.dbSession.expunge(obj)
                    else:
                        # já expirado; garante que fica expirado para reload do old
                        self.dbSession.expire(obj)
                except Exception:
                    pass
                self._handle_integrity_error(e)

            if not isinstance(e, IntegrityError):
                try:
                    await self.dbSession.rollback()
                except Exception:
                    pass
            raise e

    def _handle_integrity_error(self, e: IntegrityError):
        error_msg = str(e.orig)

        # asyncpg.UniqueViolationError (PostgreSQL)
        match = re.search(r"Key \((.*?)\)=\((.*?)\) already exists", error_msg)
        if match:
            key = match.group(1)
            value = match.group(2)
            raise UniqueViolation(self.model, key, value)  # pyright: ignore[reportArgumentType]

        # sqlite3.IntegrityError (SQLite) — pega coluna real (torre.name -> name)
        sqlite_match = re.search(r"UNIQUE constraint failed:\s*(?:[a-zA-Z0-9_]+\.)?([a-zA-Z0-9_]+)", error_msg)
        if sqlite_match:
            # constraint pode ser "torre.name" ou "name"; normaliza para nome da coluna
            raw_key = sqlite_match.group(1)
            key = raw_key.split(".")[-1]
            raise UniqueViolation(self.model, key, "valor")  # pyright: ignore[reportArgumentType]

        raise e

    async def get_one(
        self,
        filters: list | None = None,
        options: list | None = None,
    ) -> T:
        stmt = select(self.model)

        if filters:
            stmt = stmt.where(*filters)

        if options:
            stmt = stmt.options(*options)

        result = await self.dbSession.execute(stmt)

        instance = result.scalar_one_or_none()

        if not instance:
            raise ObjectNotFound(self.model)  # pyright: ignore[reportArgumentType]

        return instance

    async def get_one_by(
        self, only_enabled=True, load_relations: list | None = None, **kwargs
    ) -> T:
        stmt = select(self.model)

        if load_relations:
            for rel in load_relations:
                # VERIFICAR SE EXISTE A REFERENCIA
                # ex: Torre.terreno
                if hasattr(self.model, rel):
                    attr = getattr(self.model, rel)

                    stmt = stmt.options(selectinload(attr))

                else:
                    pass

        for key, value in kwargs.items():
            if hasattr(self.model, key):
                column = getattr(self.model, key)
                stmt = stmt.where(column == value)
            else:  # se nao existe so passa
                logger.warning(
                    f"Buscando coluna que nao existe no modelo: {self.model.__name__}, {key}"
                )
                continue

        # se status nao foi passado no filtro, filtra por status == enabled
        if hasattr(self.model, "status") and "status" not in kwargs and only_enabled:
            stmt = stmt.where(getattr(self.model, "status") == ObjectStatus.ENABLE)

        # logger.debug(f"Buscando {self.model.__name__} unico por: {stmt}")

        result = await self.dbSession.execute(stmt)
        instance = result.scalar_one_or_none()

        if not instance:
            raise ObjectNotFound(self.model)  # pyright: ignore

        return instance

    async def create(
        self, schema: BaseSchema | dict, no_commit: bool = False, *args, **kwargs
    ):
        if isinstance(schema, BaseSchema):
            payload = schema.model_dump()
        else:
            payload = schema

        obj = await self.save(self.model(**payload), no_commit)
        await self._log_action(
            "CREATE", obj.id, build_create_changes(payload), commit=not no_commit
        )

        return obj

    async def _log_action(
        self,
        action: str,
        entity_id,
        changes: dict | None = None,
        commit: bool = True,
    ):
        if self.model.__tablename__ == "audit_log":
            return
        audit = create_audit_entry(
            entity_type=self.model.__tablename__,
            entity_id=entity_id,
            action=action,
            changes=changes,
            user_id=get_current_user_id(),
        )
        self.dbSession.add(audit)
        # no_commit=True (ex: UserService) deixa o caller comitar o audit junto.
        if commit:
            await self.dbSession.commit()

    async def after_save_hook(self):
        """SOBREESCREVER O METODO QUE RECEBE O PAYLOAD E É CHAMADO ANTES DE SALVAR A INSTANCIA CRIADA NO DB"""
        # ex criar o objeto do audit log
        ...

    async def get_list(
        self,
        out_schema: ModelSchema | None = None,
        only_enabled=True,
        load_relations: list | None = None,
        stmt: Select | None = None,
    ):
        if stmt is None:
            stmt = select(self.model)

        if load_relations:
            for rel in load_relations:
                # VERIFICAR SE EXISTE A REFERENCIA
                # ex: Torre.terreno
                if hasattr(self.model, rel):
                    attr = getattr(self.model, rel)
                    stmt = stmt.options(selectinload(attr))

                else:
                    pass

        if only_enabled and hasattr(self.model, "status"):
            status = getattr(self.model, "status")
            stmt = stmt.where(status == ObjectStatus.ENABLE)

        result = await self.dbSession.execute(stmt)

        items = result.scalars().all()

        # .unique() é recomendado ao usar joins ou selectinload para evitar duplicatas nos resultados
        # items = result.scalars().unique().all()

        if not out_schema:
            return items

        #
        # cogitar uso de type adapter
        else:
            parsed = [out_schema.model_validate(item) for item in items]
            return parsed

    async def count(stmt): ...

    async def get_list_paginated(
        self,
        page: int = 1,
        per_page: int = 10,
        only_enabled: bool = True,
        sort_by: str = "created_at",
        order: str = "desc",
        entity: Any | None = None,
        q: str = "",
        search_fields: list[str] | None = None,
        load_relations: list[str] | None = None,
        extra_filters: list | None = None,
    ):
        from sqlalchemy import String, cast, or_

        target = entity if entity is not None else self.model
        stmt = select(target)

        if load_relations:
            for rel in load_relations:
                if hasattr(self.model, rel):
                    stmt = stmt.options(selectinload(getattr(self.model, rel)))

        if only_enabled and hasattr(self.model, "status"):
            stmt = stmt.where(getattr(self.model, "status") == ObjectStatus.ENABLE)

        if extra_filters:
            stmt = stmt.where(*extra_filters)

        if q and search_fields:
            pattern = f"%{q.strip()}%"
            clauses = []
            for field_name in search_fields:
                if hasattr(self.model, field_name):
                    col = getattr(self.model, field_name)
                    clauses.append(cast(col, String).ilike(pattern))
            if clauses:
                stmt = stmt.where(or_(*clauses))

        column = None
        if hasattr(self.model, sort_by):
            column = getattr(self.model, sort_by)
        elif hasattr(self.model, "created_at"):
            column = getattr(self.model, "created_at")
        elif hasattr(self.model, "id"):
            column = getattr(self.model, "id")

        if column is not None:
            stmt = stmt.order_by(column.desc() if order == "desc" else column.asc())

        count_stmt = select(func.count()).select_from(stmt.subquery())
        total_result = await self.dbSession.execute(count_stmt)
        total_count = total_result.scalar() or 0

        offset = (page - 1) * per_page
        stmt = stmt.offset(offset).limit(per_page)

        result = await self.dbSession.execute(stmt)
        items = result.scalars().all()

        total_pages = (total_count + per_page - 1) // per_page

        return items, total_pages, page, per_page, total_count

    async def get_list_result(
        self,
        query: Any | None = None,
        *,
        only_enabled: bool = True,
        search_fields: list[str] | None = None,
        load_relations: list[str] | None = None,
        extra_filters: list | None = None,
    ):
        """Executa listagem paginada + busca (`query.q`) + ordenação e retorna um `ListResult`."""
        from core.lists import ListQuery, ListResult

        q_obj = query if isinstance(query, ListQuery) else ListQuery()
        (
            items,
            total_pages,
            page,
            per_page,
            total_count,
        ) = await self.get_list_paginated(
            page=q_obj.page,
            per_page=q_obj.per_page,
            only_enabled=only_enabled,
            sort_by=q_obj.sort_by,
            order=q_obj.order,
            q=q_obj.q,
            search_fields=search_fields,
            load_relations=load_relations,
            extra_filters=extra_filters,
        )
        return ListResult.from_paginated(
            items,
            total_pages,
            page,
            per_page,
            total_count,
            q_obj.sort_by,
            q_obj.order,
            q=q_obj.q,
        )

    async def exists_by(self, **kwargs):
        stmt = select(exists(self.model))  # inicializa query do modelo
        for key, value in kwargs.items():
            # analiza o kwargs pra ver se o model tem uma propriedade que pode ser filtrada
            if hasattr(self.model, key):
                column = getattr(self.model, key)
                # adiciona cada um dos kwargs analisados ao stmt
                stmt = stmt.where(column == value)
            else:  # se nao existe so passa
                logger.warning(
                    f"Buscando coluna que nao existe no modelo: {self.model.__name__}, {key}"
                )
                pass

        stmt.exists()

        raw_result = await self.dbSession.execute(stmt)
        result = raw_result.scalar()

        # self.logger.debug(result)
        return result

    async def soft_delete(self, obj: T | None, **kwargs) -> bool:
        if not obj:
            obj = await self.get_one_by(**kwargs)

        obj.status = ObjectStatus.DELETED  # pyright: ignore[reportAttributeAccessIssue]

        if hasattr(obj, "deleted_at"):
            obj.deleted_at = datetime.now()  # pyright: ignore[reportAttributeAccessIssue]

        instance = await self.save(obj)
        await self._log_action("DELETE", obj.id)
        return True

    async def hard_delete(self, obj: T):
        try:
            await self.dbSession.delete(obj)
            await self.dbSession.commit()
        except Exception as e:
            await self.dbSession.rollback()
            raise e
        await self._log_action("DELETE", obj.id)
        return True

    async def get_last(self, limit: int = 3):
        # TODO verificar se o modelo tem a propriedade created_at

        if not hasattr(self.model, "created_at"):
            raise Exception("Desgraça nao tem created_at")

        created_at = getattr(self.model, "created_at")
        stmt = select(self.model).order_by(created_at.desc())

        # filter enableds
        if hasattr(self.model, "status"):
            status = getattr(self.model, "status")
            stmt = stmt.filter(status == ObjectStatus.ENABLE).limit(limit)

        result = await self.dbSession.execute(stmt)
        return result.scalars().all()

    async def update(self, obj_id, data: dict) -> T:
        obj = await self.get_one_by(id=obj_id, only_enabled=False)
        changes = build_update_changes(obj, data)
        for key, value in data.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        obj = await self.save(obj)
        if changes:
            await self._log_action("UPDATE", obj.id, changes)
        return obj
