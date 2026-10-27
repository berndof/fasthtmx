import asyncio
import os
import logging
import logging.config
import sys
from contextlib import asynccontextmanager
from pathlib import Path
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

# corrige o caminho para rodar como se estivesse dentro da pasta /src
# dentro do container a /src é a raiz
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from core.database import sessionmanager, UniqueViolation
from core.forms import FormError
from core.modules.user.schemas.user import UserIn
from core.modules.user.schemas.group import GroupIn
from core.modules.user.services.user import UserService
from core.modules.user.services.group import GroupService
from sqlalchemy.exc import IntegrityError
from core.settings import LOG_CONFIG

logging.config.dictConfig(LOG_CONFIG)

logger = logging.getLogger("script")


@asynccontextmanager
async def get_db():
    async for session in sessionmanager.get_session():
        yield session


async def create_default_users():
    try:
        root_user_data = UserIn.model_validate(
            {
                "username": os.environ.get("ROOT_USERNAME") or "superadmin",
                "email": os.environ.get("ROOT_EMAIL") or "ti@scc.com.br",
                "password": str(os.environ.get("ROOT_PASSWORD") or "lfw-lala"),
                "first_name": "Super",
                "last_name": "Admin",
                "groups": ["admin"],
            }
        )

    except ValidationError as ve:
        raise ve

    users_to_create = []
    users_to_create.append(root_user_data)

    async with get_db() as db_session:
        user_service = UserService(db_session)

        for new_user in users_to_create:
            try:
                user = await user_service.create(new_user)
                await user_service.update(user.id, {"is_verified": True})
            except (UniqueViolation, FormError):
                logger.info(f"Usuário '{new_user.username}' já existe.")
                continue
            except IntegrityError as ie:
                logger.error(f"verificar esse caso \\n {ie} ")
                continue
            except Exception as e:
                raise e


async def create_default_groups():
    logger.info("Criando grupos ...")
    groups = [{"name": "admin"}, {"name": "users"}, {"name": "clients"}]
    groups_to_create: list[GroupIn] = []

    for gp_dict in groups:
        try:
            group_in = GroupIn.model_validate(gp_dict)
            groups_to_create.append(group_in)
        except ValidationError as ve:
            # raise ve
            logger.warning(f"error de validação no schema \\n {ve}")
            continue

    exists = []

    async with get_db() as db_session:
        group_service = GroupService(db_session)

        for new_group in groups_to_create:
            try:
                await group_service.create(new_group)

            except UniqueViolation as uv:
                logger.warning(uv.message)
                exists.append(uv)
                continue
            except IntegrityError as ie:
                logger.error(f"verificar esse caso \\n {ie} ")
                continue
            except Exception as e:
                raise e

    if exists:
        logger.info(f"Grupos criados, já existiam {exists}")
    else:
        logger.info("Grupos criados")

    return


async def create_demo_projects():
    try:
        from decimal import Decimal
        from sqlalchemy import select, func
        from modules.projetos.models import Projeto, TarefaProjeto
    except ImportError:
        return

    async with get_db() as db_session:
        count = (await db_session.execute(select(func.count(Projeto.id)))).scalar() or 0
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
        db_session.add_all([p1, p2, p3])
        await db_session.flush()

        db_session.add_all(
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
        await db_session.commit()
        logger.info("Projetos de demonstração criados com sucesso.")


async def main():
    logger.info("Iniciando script de seed default...")
    try:
        await create_default_groups()
        await create_default_users()
        await create_demo_projects()

    except ValueError as e:
        logger.warning("⚠️ Operação cancelada: %s", e)
    except RuntimeError as e:
        # Tratamento de erros de DB (503) ou Serviço (500)
        logger.error("❌ Erro fatal durante a execução: %s", e)
    except Exception as e:
        logger.exception("❌ Erro inesperado no script principal: %s", e)


if __name__ == "__main__":
    from core.database import ensure_schema

    sessionmanager.init_db()
    asyncio.run(ensure_schema())
    asyncio.run(main())
