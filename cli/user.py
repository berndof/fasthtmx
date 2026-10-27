import asyncio
import sys

import typer

from cli.db import close_db, get_db, init_db
from core.database import ObjectNotFound, UniqueViolation
from core.models import ObjectStatus
from core.modules.auth.security import hash_password
from core.modules.user.schemas import UserIn
from core.modules.user.services import GroupService, UserService

app = typer.Typer(help="Gerenciamento de usuários do sistema.")


def _run(coro):
    async def _main():
        await init_db()
        try:
            return await coro
        finally:
            await close_db()

    return asyncio.run(_main())


@app.command()
def create(
    username: str = typer.Argument(..., help="Nome de usuário (mín. 8 caracteres)."),
    email: str = typer.Argument(..., help="E-mail do usuário."),
    first_name: str = typer.Argument(..., help="Primeiro nome."),
    last_name: str = typer.Argument(..., help="Sobrenome."),
    password: str = typer.Option(  # pyright: ignore[reportCallInDefaultInitializer]
        ...,
        prompt=True,
        hide_input=True,
        confirmation_prompt=True,
        help="Senha do usuário.",
    ),
    groups: list[str] = typer.Option(  # pyright: ignore[reportGeneralTypeIssues, reportCallInDefaultInitializer]
        ["users"],
        "--group",
        "-g",
        help="Grupos do usuário (pode repetir).",
    ),
):
    """Cria um novo usuário no sistema."""

    async def _create():
        async with get_db() as session:
            user_service = UserService(session)

            user_in = UserIn(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=password,
                groups=groups,
            )

            user = await user_service.create(user_in)
            await user_service.update(user.id, {"is_verified": True})
            typer.echo(f"Usuário '{user.username}' criado com sucesso!")

    try:
        _run(_create())
    except UniqueViolation as e:
        typer.echo(f"Erro: {e.message}", err=True)
        raise typer.Exit(1)
    except ObjectNotFound:
        typer.echo("Erro: grupo não encontrado.", err=True)
        raise typer.Exit(1)
    except Exception as e:
        typer.echo(f"Erro inesperado: {e}", err=True)
        raise typer.Exit(1)


@app.command()
def delete(
    identifier: str = typer.Argument(..., help="Username ou e-mail do usuário."),
    force: bool = typer.Option(
        False,
        "--force",
        "-f",
        help="Hard delete (remove permanentemente do banco).",
    ),
):
    """Remove um usuário (soft-delete por padrão)."""

    async def _delete():
        async with get_db() as session:
            user_service = UserService(session)

            try:
                if "@" in identifier:
                    user = await user_service.get_one_by(
                        email=identifier, only_enabled=False
                    )
                else:
                    user = await user_service.get_one_by(
                        username=identifier, only_enabled=False
                    )
            except ObjectNotFound:
                typer.echo(f"Usuário '{identifier}' não encontrado.", err=True)
                raise typer.Exit(1)

            if user.status != ObjectStatus.ENABLE:
                confirm = typer.confirm(
                    f"Usuário '{user.username}' já está com status '{user.status.value}'. Excluir permanentemente?"
                )
                if confirm:
                    await user_service.hard_delete(user)
                    typer.echo(f"Usuário '{user.username}' removido permanentemente.")
                else:
                    typer.echo("Operação cancelada.")
                return

            if force:
                await user_service.hard_delete(user)
                typer.echo(f"Usuário '{user.username}' removido permanentemente.")
            else:
                user.status = ObjectStatus.DELETED
                await user_service.save(user)
                typer.echo(f"Usuário '{user.username}' desativado (soft-delete).")

    try:
        _run(_delete())
    except Exception as e:
        typer.echo(f"Erro inesperado: {e}", err=True)
        raise typer.Exit(1)


@app.command("list")
def list_users(
    all_users: bool = typer.Option(
        False,
        "--all",
        "-a",
        help="Inclui usuários desativados/excluídos.",
    ),
):
    """Lista todos os usuários do sistema."""

    async def _list():
        async with get_db() as session:
            user_service = UserService(session)

            if all_users:
                users = await user_service.get_list()
            else:
                users = await user_service.get_list(only_enabled=True)

            if not users:
                typer.echo("Nenhum usuário encontrado.")
                return

            typer.echo(
                f"\n{'ID':<38} {'Username':<20} {'Email':<30} {'Nome':<25} {'Verified':<10} {'Status':<10} {'Grupos'}"
            )
            typer.echo("-" * 150)
            for user in users:
                status = user.status.value if hasattr(user, "status") else "N/A"
                groups = (
                    ", ".join(g.name for g in user.groups)
                    if hasattr(user, "groups") and user.groups
                    else "-"
                )
                typer.echo(
                    f"{str(user.id):<38} {user.username:<20} {user.email:<30} {user.name:<25} {str(user.is_verified):<10} {status:<10} {groups}"
                )
            typer.echo()

    try:
        _run(_list())
    except Exception as e:
        typer.echo(f"Erro inesperado: {e}", err=True)
        raise typer.Exit(1)


@app.command()
def verify(
    identifier: str = typer.Argument(..., help="Username ou e-mail do usuário."),
):
    """Marca o e-mail de um usuário como verificado."""

    async def _verify():
        async with get_db() as session:
            user_service = UserService(session)

            try:
                if "@" in identifier:
                    user = await user_service.get_one_by(
                        email=identifier, only_enabled=False
                    )
                else:
                    user = await user_service.get_one_by(
                        username=identifier, only_enabled=False
                    )
            except ObjectNotFound:
                typer.echo(f"Usuário '{identifier}' não encontrado.", err=True)
                raise typer.Exit(1)

            if user.is_verified:
                typer.echo(f"Usuário '{user.username}' já está verificado.")
                return

            await user_service.update(user.id, {"is_verified": True})
            typer.echo(f"Usuário '{user.username}' marcado como verificado.")

    try:
        _run(_verify())
    except Exception as e:
        typer.echo(f"Erro inesperado: {e}", err=True)
        raise typer.Exit(1)


@app.command()
def password(
    identifier: str = typer.Argument(..., help="Username ou e-mail do usuário."),
    new_password: str = typer.Option(
        ...,
        prompt=True,
        hide_input=True,
        confirmation_prompt=True,
        help="Nova senha.",
    ),
):
    """Redefine a senha de um usuário."""

    async def _password():
        async with get_db() as session:
            user_service = UserService(session)

            try:
                if "@" in identifier:
                    user = await user_service.get_one_by(
                        email=identifier, only_enabled=False
                    )
                else:
                    user = await user_service.get_one_by(
                        username=identifier, only_enabled=False
                    )
            except ObjectNotFound:
                typer.echo(f"Usuário '{identifier}' não encontrado.", err=True)
                raise typer.Exit(1)

            hashed = hash_password(new_password)
            await user_service.update(user.id, {"password": hashed})
            typer.echo(f"Senha do usuário '{user.username}' atualizada.")

    try:
        _run(_password())
    except Exception as e:
        typer.echo(f"Erro inesperado: {e}", err=True)
        raise typer.Exit(1)
