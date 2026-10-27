#!/usr/bin/env python3
"""Utilitário de restauração dos bancos de dados do Gestão Torres.

Suporta:
- Restaurar SQLite local (com backup de segurança automático antes de sobrescrever)
- Restaurar PostgreSQL Dev (db) a partir de snapshot .dump ou .sql
- Restaurar PostgreSQL Prod (db_prod) a partir de snapshot ou do dump original
- Clonar dados de Prod para Dev para testes realistas
"""

import os
import shutil
import sqlite3
import subprocess
from datetime import datetime
from pathlib import Path
from typing import Optional

import typer
from dotenv import load_dotenv
from rich.console import Console

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

console = Console()
app = typer.Typer(help="Gerenciamento de restauração dos bancos de dados.")

BACKUP_ROOT = PROJECT_ROOT / "backup"
SQLITE_DB_PATH = PROJECT_ROOT / "data" / "db.sqlite"

PG_HOST = os.getenv("POSTGRES_HOST", "127.0.0.1")
PG_PORT = os.getenv("POSTGRES_PORT", "5433")
PG_USER = os.getenv("POSTGRES_USER", "pguser")
PG_PASSWORD = os.getenv("POSTGRES_PASSWORD", "pgpass")
PG_DEV_DB = os.getenv("POSTGRES_DB", "db")
PG_PROD_DB = "db_prod"


def _docker_available() -> bool:
    try:
        subprocess.run(
            ["docker", "exec", "torres_db", "true"],
            capture_output=True, check=True, timeout=5,
        )
        return True
    except Exception:
        return False


def _pg_cmd_prefix() -> list[str]:
    """Retorna o prefixo do comando para executar no container Postgres (docker) ou localmente."""
    if _docker_available():
        return ["docker", "exec", "torres_db"]
    return []


def _psql_cmd(dbname: str, *args: str) -> list[str]:
    """Retorna comando psql via docker com stdin (stdin redirecionado ao arquivo host se '-f')."""
    return _pg_cmd_prefix() + ["psql", "-U", PG_USER, "-d", dbname]


def _pg_restore_cmd(dbname: str, src: Path) -> list[str]:
    """Retorna comando pg_restore via docker com stdin do arquivo host."""
    return _pg_cmd_prefix() + ["pg_restore", "-U", PG_USER, "-d", dbname, "--clean", "--if-exists", "--no-owner"]


def _get_latest_backup(folder: Path, extensions: list[str]) -> Optional[Path]:
    if not folder.exists():
        return None
    candidates = []
    for ext in extensions:
        candidates.extend(folder.glob(f"*.{ext}"))
    if not candidates:
        return None
    candidates.sort(key=lambda x: x.stat().st_mtime, reverse=True)
    return candidates[0]


@app.command("sqlite")
def restore_sqlite(
    file: Optional[Path] = typer.Option(
        None, "--file", "-f", help="Caminho do arquivo .sqlite de backup. Se omitido, usa o mais recente."
    ),
    yes: bool = typer.Option(False, "--yes", "-y", help="Pular confirmação interativa"),
):
    """Restaura o banco SQLite local a partir de um backup."""
    if file is None:
        file = _get_latest_backup(BACKUP_ROOT / "sqlite", ["sqlite"])
        if file is None:
            console.print("[red]Nenhum backup encontrado em backup/sqlite/[/red]")
            raise typer.Exit(code=1)
        console.print(f"[cyan]Nenhum arquivo especificado. Usando o backup mais recente:[/cyan] {file.name}")

    if not file.exists():
        console.print(f"[red]Arquivo não encontrado:[/red] {file}")
        raise typer.Exit(code=1)

    if not yes:
        confirm = typer.confirm(f"Deseja realmente sobrescrever '{SQLITE_DB_PATH.name}' com '{file.name}'?")
        if not confirm:
            console.print("Operação cancelada.")
            raise typer.Exit()

    # 1. Backup de segurança automático do estado atual se existir
    if SQLITE_DB_PATH.exists():
        safety_ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        safety_file = SQLITE_DB_PATH.parent / f"db.sqlite.safety_before_restore_{safety_ts}.bak"
        shutil.copy2(SQLITE_DB_PATH, safety_file)
        console.print(f"[dim]Backup de segurança criado em {safety_file.name}[/dim]")

    # 2. Remover arquivos WAL/SHM antigos para não misturar transações
    for ext in ["-wal", "-shm"]:
        aux = Path(str(SQLITE_DB_PATH) + ext)
        if aux.exists():
            aux.unlink()

    # 3. Copiar o arquivo restaurado
    shutil.copy2(file, SQLITE_DB_PATH)

    # 4. Validar integridade
    conn = sqlite3.connect(str(SQLITE_DB_PATH))
    res = conn.execute("PRAGMA integrity_check;").fetchone()
    conn.close()

    if res and res[0] == "ok":
        console.print(f"[green]✓ SQLite restaurado com sucesso a partir de {file.name}![/green]")
    else:
        console.print(f"[red]Aviso: Falha de integridade após restauração:[/red] {res}")


@app.command("postgres-dev")
def restore_postgres_dev(
    file: Optional[Path] = typer.Option(
        None, "--file", "-f", help="Caminho do arquivo (.dump ou .sql). Se omitido, usa o mais recente."
    ),
    yes: bool = typer.Option(False, "--yes", "-y", help="Pular confirmação"),
):
    """Restaura o PostgreSQL de desenvolvimento (db)."""
    _restore_pg(PG_DEV_DB, BACKUP_ROOT / "postgres_dev", file, yes)


@app.command("postgres-prod")
def restore_postgres_prod(
    file: Optional[Path] = typer.Option(
        None, "--file", "-f", help="Caminho do arquivo (.dump ou .sql). Se omitido, usa o mais recente."
    ),
    yes: bool = typer.Option(False, "--yes", "-y", help="Pular confirmação"),
):
    """Restaura o PostgreSQL de produção (db_prod)."""
    _restore_pg(PG_PROD_DB, BACKUP_ROOT / "postgres_prod", file, yes)


@app.command("load-prod-dump")
def load_prod_dump(
    target: str = typer.Option("prod", "--target", "-t", help="Banco de destino: 'prod' (db_prod) ou 'dev' (db)"),
    yes: bool = typer.Option(False, "--yes", "-y", help="Pular confirmação"),
):
    """Carrega o dump original de produção (backup/production/prodbackp.sql) no PostgreSQL."""
    dump_file = BACKUP_ROOT / "production" / "prodbackp.sql"
    if not dump_file.exists():
        console.print(f"[red]Arquivo original de produção não encontrado em {dump_file}[/red]")
        raise typer.Exit(code=1)

    dbname = PG_PROD_DB if target.lower() == "prod" else PG_DEV_DB

    if not yes:
        confirm = typer.confirm(f"Deseja carregar o dump de produção no banco '{dbname}'? Isso recriará o schema public.")
        if not confirm:
            console.print("Operação cancelada.")
            raise typer.Exit()

    env = os.environ.copy()
    env["PGPASSWORD"] = PG_PASSWORD

    console.print(f"[cyan]=> Limpando e recriando schema public em {dbname}...[/cyan]")
    reset_cmd = _psql_cmd(dbname, "-c", "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;")
    subprocess.run(reset_cmd, env=env, check=True)

    console.print(f"[cyan]=> Restaurando {dump_file.name} em {dbname}...[/cyan]")
    restore_cmd = _psql_cmd(dbname, "-f", str(dump_file))
    with open(dump_file, "rb") as f:
        subprocess.run(restore_cmd, stdin=f, env=env, check=True)
    console.print(f"[green]✓ Dump de produção carregado com sucesso em '{dbname}'![/green]")


@app.command("clone-prod-to-dev")
def clone_prod_to_dev(
    yes: bool = typer.Option(False, "--yes", "-y", help="Pular confirmação"),
):
    """Copia todos os dados de db_prod para o banco de dev (db) no PostgreSQL."""
    if not yes:
        confirm = typer.confirm(
            f"Deseja substituir o banco de desenvolvimento ('{PG_DEV_DB}') com os dados de produção ('{PG_PROD_DB}')?"
        )
        if not confirm:
            console.print("Operação cancelada.")
            raise typer.Exit()

    console.print("[cyan]=> Clonando db_prod para db no PostgreSQL...[/cyan]")
    env = os.environ.copy()
    env["PGPASSWORD"] = PG_PASSWORD

    kill_cmd = _psql_cmd("postgres", "-c", f"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '{PG_DEV_DB}';")
    subprocess.run(kill_cmd, env=env, capture_output=True)

    reclone_sql = f"DROP DATABASE IF EXISTS {PG_DEV_DB}; CREATE DATABASE {PG_DEV_DB} WITH TEMPLATE {PG_PROD_DB} OWNER {PG_USER};"
    cmd = _psql_cmd("postgres", "-c", reclone_sql)
    try:
        subprocess.run(cmd, env=env, check=True)
        console.print(f"[green]✓ Banco '{PG_DEV_DB}' clonado com sucesso a partir de '{PG_PROD_DB}'![/green]")
    except Exception as e:
        console.print(f"[red]Erro ao clonar banco:[/red] {e}")
        raise typer.Exit(code=1)
        console.print(f"[green]✓ Banco '{PG_DEV_DB}' clonado com sucesso a partir de '{PG_PROD_DB}'![/green]")
    except Exception as e:
        console.print(f"[red]Erro ao clonar banco:[/red] {e}")
        raise typer.Exit(code=1)


def _restore_pg(dbname: str, folder: Path, file: Optional[Path], yes: bool):
    if file is None:
        file = _get_latest_backup(folder, ["dump", "sql"])
        if file is None:
            console.print(f"[red]Nenhum backup encontrado em {folder}[/red]")
            raise typer.Exit(code=1)
        console.print(f"[cyan]Nenhum arquivo especificado. Usando o backup mais recente:[/cyan] {file.name}")

    if not file.exists():
        console.print(f"[red]Arquivo não encontrado:[/red] {file}")
        raise typer.Exit(code=1)

    if not yes:
        confirm = typer.confirm(f"Deseja restaurar '{file.name}' no banco '{dbname}'?")
        if not confirm:
            console.print("Operação cancelada.")
            raise typer.Exit()

    env = os.environ.copy()
    env["PGPASSWORD"] = PG_PASSWORD

    console.print(f"[cyan]=> Restaurando {file.name} em {dbname}...[/cyan]")
    try:
        if file.suffix == ".dump":
            cmd = _pg_restore_cmd(dbname, file)
            with open(file, "rb") as f:
                subprocess.run(cmd, stdin=f, env=env, capture_output=True, text=True)
            console.print(f"[green]✓ Restauração de {dbname} concluída com sucesso![/green]")
        else:
            cmd = _psql_cmd(dbname, "-f", str(file))
            with open(file, "rb") as f:
                subprocess.run(cmd, stdin=f, env=env, check=True)

        console.print(f"[green]✓ Restauração de {dbname} concluída com sucesso![/green]")
    except Exception as e:
        console.print(f"[red]Erro durante a restauração do PostgreSQL:[/red] {e}")
        raise typer.Exit(code=1)


if __name__ == "__main__":
    app()
