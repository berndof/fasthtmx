import subprocess
import sys
from contextlib import asynccontextmanager
from pathlib import Path
from typing import AsyncGenerator

import typer
from alembic import command
from alembic.config import Config
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import sessionmanager
from scripts.backup_db import app as backup_app
from scripts.restore_db import app as restore_app

PROJECT_ROOT = Path(__file__).parent.parent
ALEMBIC_INI = PROJECT_ROOT / "alembic.ini"

app = typer.Typer(help="Gerenciamento do banco de dados e migrações.")
app.add_typer(backup_app, name="backup", help="Gerenciamento de backups dos bancos de dados.")
app.add_typer(restore_app, name="restore", help="Gerenciamento de restauração dos bancos de dados.")


def _get_alembic_config() -> Config:
    cfg = Config(str(ALEMBIC_INI))
    cfg.set_main_option("script_location", str(PROJECT_ROOT / "alembic"))
    return cfg


# Funções utilitárias mantidas para outros comandos CLI (ex: cli/user.py)
async def init_db():
    sessionmanager.init_db()


async def close_db():
    await sessionmanager.close()


@asynccontextmanager
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async for session in sessionmanager.get_session():
        yield session


@app.command("migrate")
def migrate(
    revision: str = typer.Argument("head", help="Revisão de destino (padrão: head)"),
):
    """Aplica migrações pendentes no banco de dados."""
    cfg = _get_alembic_config()
    typer.echo(f"==> Aplicando migrações até: '{revision}'...")
    command.upgrade(cfg, revision)
    typer.echo("==> Migrações aplicadas com sucesso.")


@app.command("rollback")
def rollback(
    revision: str = typer.Argument("-1", help="Revisão para rollback (padrão: -1)"),
):
    """Reverte a última migração ou migrações até a revisão informada."""
    cfg = _get_alembic_config()
    typer.echo(f"==> Revertendo migração para: '{revision}'...")
    command.downgrade(cfg, revision)
    typer.echo("==> Rollback concluído com sucesso.")


@app.command("revision")
def revision(
    message: str = typer.Option(
        ..., "-m", "--message", help="Descrição sucinta das alterações na migração"
    ),
    autogenerate: bool = typer.Option(
        True,
        "--autogenerate/--empty",
        help="Detectar diferenças automaticamente a partir dos modelos",
    ),
):
    """Cria uma nova revisão de migração no Alembic."""
    cfg = _get_alembic_config()
    typer.echo(f"==> Criando revisão: '{message}' (autogenerate={autogenerate})...")
    command.revision(cfg, message=message, autogenerate=autogenerate)
    typer.echo("==> Revisão criada em alembic/versions/.")


@app.command("current")
def current(
    verbose: bool = typer.Option(False, "--verbose", "-v", help="Modo verboso"),
):
    """Exibe a revisão atual aplicada no banco de dados."""
    cfg = _get_alembic_config()
    command.current(cfg, verbose=verbose)


@app.command("history")
def history(
    verbose: bool = typer.Option(False, "--verbose", "-v", help="Modo verboso"),
):
    """Exibe o histórico de todas as migrações disponíveis."""
    cfg = _get_alembic_config()
    command.history(cfg, verbose=verbose)


@app.command("check")
def check():
    """Verifica se há modelos modificados que ainda não geraram migração."""
    cfg = _get_alembic_config()
    try:
        command.check(cfg)
        typer.echo("==> Banco de dados e modelos estão sincronizados. Nenhuma migração pendente.")
    except Exception as e:
        typer.echo(f"==> Diferenças detectadas ou erro na checagem: {e}", err=True)
        raise typer.Exit(code=1)


@app.command("seed")
def seed(
    tipo: str = typer.Option(
        "default",
        "--type",
        "-t",
        help="Tipo de seed: default, teste, grande, clean",
    ),
):
    """Executa script de seed no banco de dados."""
    scripts_map = {
        "default": "scripts/default_seed.py",
        "teste": "scripts/seed_teste.py",
        "grande": "scripts/seed_grande.py",
        "clean": "scripts/seed_grande.py --cleanup",
    }
    target = scripts_map.get(tipo)
    if not target:
        typer.echo(f"Tipo inválido: '{tipo}'. Opções válidas: {list(scripts_map.keys())}", err=True)
        raise typer.Exit(code=1)

    cmd = [sys.executable] + target.split()
    subprocess.run(cmd, cwd=str(PROJECT_ROOT), check=True)


@app.command("reset")
def reset(
    confirm: bool = typer.Option(False, "--yes", "-y", help="Pular confirmação interativa"),
):
    """Reseta a base SQLite local, reaplicando todas as migrações e o seed inicial."""
    from core.settings import DB_ENGINE, SQLITE_DB_DIR

    if DB_ENGINE != "sqlite":
        typer.echo("O comando 'reset' está disponível apenas para SQLite.", err=True)
        raise typer.Exit(code=1)

    if not confirm and not typer.confirm("Deseja realmente apagar o banco SQLite local e recriá-lo?"):
        typer.echo("Operação cancelada.")
        raise typer.Exit()

    for f in [
        SQLITE_DB_DIR / "db.sqlite",
        SQLITE_DB_DIR / "db.sqlite-wal",
        SQLITE_DB_DIR / "db.sqlite-shm",
    ]:
        if f.exists():
            f.unlink()
    typer.echo("==> Banco de dados SQLite local removido.")

    cfg = _get_alembic_config()
    typer.echo("==> Aplicando migrações...")
    command.upgrade(cfg, "head")
    typer.echo("==> Migrações aplicadas.")

    typer.echo("==> Executando seed inicial...")
    subprocess.run([sys.executable, "scripts/default_seed.py"], cwd=str(PROJECT_ROOT), check=True)
    typer.echo("==> Reset concluído com sucesso!")
