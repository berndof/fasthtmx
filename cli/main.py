import typer

from cli.core_sync import app as core_app
from cli.db import app as db_app
from cli.dev import app as dev_app
from cli.module import app as module_app
from cli.user import app as user_app

app = typer.Typer(
    name="fasthtmx",
    help="CLI para gestão e scaffolding do framework FastHTMX.",
    add_completion=False,
    invoke_without_command=True,
)


@app.callback()
def callback(ctx: typer.Context):
    if ctx.invoked_subcommand is None:
        typer.echo(ctx.get_help())
        raise typer.Exit()


app.add_typer(dev_app, name="dev", help="Servidor de desenvolvimento.")
app.add_typer(user_app, name="user", help="Gerenciar usuários.")
app.add_typer(db_app, name="db", help="Gerenciar banco de dados e migrações.")
app.add_typer(module_app, name="module", help="Gerar novos módulos no padrão Softnav.")
app.add_typer(core_app, name="core", help="Sincronizar src/core entre projetos.")


def main():
    app()


if __name__ == "__main__":
    main()
