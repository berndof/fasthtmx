#!/usr/bin/env python3
"""Utilitário de backup para os bancos de dados do Gestão Torres.

Suporta:
- SQLite local (data/db.sqlite) via API online atomic backup (compatível com WAL)
- PostgreSQL Dev (localhost:5433/db) via pg_dump
- PostgreSQL Prod (localhost:5433/db_prod) via pg_dump
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
from rich.table import Table

# Carregar variáveis do .env
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

console = Console()
app = typer.Typer(help="Gerenciamento de backups dos bancos de dados.")

BACKUP_ROOT = PROJECT_ROOT / "backup"
SQLITE_DB_PATH = PROJECT_ROOT / "data" / "db.sqlite"

PG_HOST = os.getenv("POSTGRES_HOST", "127.0.0.1")
PG_PORT = os.getenv("POSTGRES_PORT", "5433")
PG_USER = os.getenv("POSTGRES_USER", "pguser")
PG_PASSWORD = os.getenv("POSTGRES_PASSWORD", "pgpass")
PG_DEV_DB = os.getenv("POSTGRES_DB", "db")
PG_PROD_DB = "db_prod"


def _ensure_dirs():
    (BACKUP_ROOT / "sqlite").mkdir(parents=True, exist_ok=True)
    (BACKUP_ROOT / "postgres_dev").mkdir(parents=True, exist_ok=True)
    (BACKUP_ROOT / "postgres_prod").mkdir(parents=True, exist_ok=True)
    (BACKUP_ROOT / "production").mkdir(parents=True, exist_ok=True)


def _format_size(size_bytes: int) -> str:
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} MB"


def _prune_backups(directory: Path, keep: int = 10):
    """Remove backups antigos mantendo os N mais recentes."""
    files = sorted(
        [f for f in directory.glob("*") if f.is_file() and not f.name.startswith(".")],
        key=lambda x: x.stat().st_mtime,
        reverse=True,
    )
    if len(files) > keep:
        for f in files[keep:]:
            f.unlink()
            console.print(f"[dim]Expurgado backup antigo:[/dim] {f.name}")


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


def _pg_dump_cmd(dbname: str, dest: Path) -> list[str]:
    """Retorna comando para pg_dump via docker (stdout redirecionado ao arquivo host)."""
    base = _pg_cmd_prefix() + ["pg_dump", "-U", PG_USER, "-d", dbname, "-Fc"]
    return base


def _psql_cmd(dbname: str, *args: str) -> list[str]:
    base = _pg_cmd_prefix() + [
        "psql",
        "-U", PG_USER,
        "-d", dbname,
    ]
    return base + list(args)


def _pg_restore_cmd(dbname: str, src: Path) -> list[str]:
    base = _pg_cmd_prefix() + [
        "pg_restore",
        "-U", PG_USER,
        "-d", dbname,
    ]
    return base + ["--clean", "--if-exists", "--no-owner", str(src)]


def _format_size(size_bytes: int) -> str:
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    else:
        return f"{size_bytes / (1024 * 1024):.2f} MB"


def _prune_backups(directory: Path, keep: int = 10):
    """Remove backups antigos mantendo os N mais recentes."""
    files = sorted(
        [f for f in directory.glob("*") if f.is_file() and not f.name.startswith(".")],
        key=lambda x: x.stat().st_mtime,
        reverse=True,
    )
    if len(files) > keep:
        for f in files[keep:]:
            f.unlink()
            console.print(f"[dim]Expurgado backup antigo:[/dim] {f.name}")


def _get_sqlite_table_counts(db_path: Path) -> dict[str, int]:
    if not db_path.exists():
        return {}
    counts = {}
    try:
        conn = sqlite3.connect(str(db_path))
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
        tables = [row[0] for row in cursor.fetchall()]
        for table in sorted(tables):
            try:
                cursor.execute(f'SELECT count(*) FROM "{table}"')
                counts[table] = cursor.fetchone()[0]
            except Exception:
                counts[table] = -1
        conn.close()
    except Exception as e:
        console.print(f"[yellow]Aviso ao ler contagens do SQLite: {e}[/yellow]")
    return counts


def _get_pg_table_counts(dbname: str) -> dict[str, int]:
    counts = {}
    cmd = _psql_cmd(dbname, "-Atc", "SELECT tablename FROM pg_tables WHERE schemaname='public';")
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, check=True)
        tables = [t.strip() for t in res.stdout.splitlines() if t.strip()]
        for table in sorted(tables):
            count_cmd = _psql_cmd(dbname, "-Atc", f'SELECT count(*) FROM "{table}";')
            c_res = subprocess.run(count_cmd, capture_output=True, text=True, check=True)
            try:
                counts[table] = int(c_res.stdout.strip())
            except ValueError:
                counts[table] = -1
    except Exception as e:
        console.print(f"[yellow]Aviso ao ler contagens do PostgreSQL ({dbname}): {e}[/yellow]")
    return counts


@app.command("sqlite")
def backup_sqlite(
    keep: int = typer.Option(10, "--keep", "-k", help="Quantidade de backups a manter"),
):
    """Realiza backup seguro e atômico do banco SQLite local em WAL."""
    _ensure_dirs()
    if not SQLITE_DB_PATH.exists():
        console.print(f"[red]Erro:[/red] Arquivo SQLite não encontrado em {SQLITE_DB_PATH}")
        raise typer.Exit(code=1)

    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    dest_file = BACKUP_ROOT / "sqlite" / f"db_sqlite_{ts}.sqlite"

    console.print(f"[cyan]=> Criando snapshot atômico do SQLite:[/cyan] {dest_file.name}...")
    try:
        src_conn = sqlite3.connect(str(SQLITE_DB_PATH))
        dest_conn = sqlite3.connect(str(dest_file))
        with dest_conn:
            src_conn.backup(dest_conn)
        dest_conn.close()
        src_conn.close()

        # Checar integridade do backup
        check_conn = sqlite3.connect(str(dest_file))
        res = check_conn.execute("PRAGMA integrity_check;").fetchone()
        check_conn.close()
        if res and res[0] != "ok":
            console.print(f"[red]Falha de integridade no backup SQLite:[/red] {res[0]}")
            raise typer.Exit(code=1)

        size_str = _format_size(dest_file.stat().st_size)
        console.print(f"[green]✓ Backup SQLite concluído com sucesso![/green] ({size_str})")

        _prune_backups(BACKUP_ROOT / "sqlite", keep=keep)

        # Mostrar contagens
        counts = _get_sqlite_table_counts(dest_file)
        if counts:
            table = Table(title=f"Dados no Backup SQLite ({dest_file.name})", show_header=True)
            table.add_column("Tabela", style="cyan")
            table.add_column("Registros", justify="right", style="green")
            for t, c in counts.items():
                table.add_row(t, str(c))
            console.print(table)

    except Exception as e:
        console.print(f"[red]Erro durante o backup SQLite:[/red] {e}")
        raise typer.Exit(code=1)


@app.command("postgres-dev")
def backup_postgres_dev(
    keep: int = typer.Option(10, "--keep", "-k", help="Quantidade de backups a manter"),
    format: str = typer.Option("dump", "--format", "-f", help="Formato do backup: dump (custom pg_restore) ou sql"),
):
    """Realiza backup do PostgreSQL de desenvolvimento (db)."""
    _backup_pg(PG_DEV_DB, "postgres_dev", keep=keep, fmt=format)


@app.command("postgres-prod")
def backup_postgres_prod(
    keep: int = typer.Option(10, "--keep", "-k", help="Quantidade de backups a manter"),
    format: str = typer.Option("dump", "--format", "-f", help="Formato do backup: dump (custom pg_restore) ou sql"),
):
    """Realiza backup do PostgreSQL de produção isolado (db_prod)."""
    _backup_pg(PG_PROD_DB, "postgres_prod", keep=keep, fmt=format)


def _backup_pg(dbname: str, folder_name: str, keep: int = 10, fmt: str = "dump"):
    _ensure_dirs()
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    out_dir = BACKUP_ROOT / folder_name

    ext = "dump" if fmt == "dump" else "sql"
    dest_file = out_dir / f"{dbname}_{ts}.{ext}"

    console.print(f"[cyan]=> Executando pg_dump para {dbname}:[/cyan] {dest_file.name}...")
    cmd = _pg_dump_cmd(dbname, dest_file)

    try:
        with open(dest_file, "wb") as f:
            subprocess.run(cmd, stdout=f, check=True)
        size_str = _format_size(dest_file.stat().st_size)
        console.print(f"[green]✓ Backup de {dbname} concluído com sucesso![/green] ({size_str})")

        _prune_backups(out_dir, keep=keep)

        counts = _get_pg_table_counts(dbname)
        if counts:
            table = Table(title=f"Dados em PostgreSQL: {dbname}", show_header=True)
            table.add_column("Tabela", style="cyan")
            table.add_column("Registros", justify="right", style="green")
            for t, c in counts.items():
                table.add_row(t, str(c))
            console.print(table)

    except subprocess.CalledProcessError as e:
        console.print(f"[red]Falha ao executar pg_dump:[/red] código {e.returncode}")
        raise typer.Exit(code=1)
    except Exception as e:
        console.print(f"[red]Erro inesperado no backup do Postgres:[/red] {e}")
        raise typer.Exit(code=1)
    except Exception as e:
        console.print(f"[red]Erro inesperado no backup do Postgres:[/red] {e}")
        raise typer.Exit(code=1)


@app.command("all")
def backup_all(
    keep: int = typer.Option(10, "--keep", "-k", help="Quantidade de backups a manter"),
):
    """Executa backup de todos os bancos (SQLite dev, Postgres dev e Postgres prod)."""
    console.print("[bold yellow]=== Iniciando Backup Completo ===[/bold yellow]\n")

    # 1. SQLite dev
    console.print("[bold]1. Backup SQLite (Dev)[/bold]")
    try:
        backup_sqlite(keep=keep)
    except Exception as e:
        console.print(f"[red]Falha no backup SQLite:[/red] {e}")

    console.print("\n[bold]2. Backup PostgreSQL (Dev - db)[/bold]")
    try:
        backup_postgres_dev(keep=keep)
    except Exception as e:
        console.print(f"[red]Falha no backup PostgreSQL Dev:[/red] {e}")

    console.print("\n[bold]3. Backup PostgreSQL (Prod - db_prod)[/bold]")
    try:
        backup_postgres_prod(keep=keep)
    except Exception as e:
        console.print(f"[red]Falha no backup PostgreSQL Prod:[/red] {e}")

    console.print("\n[bold green]=== Backup Completo Finalizado ===[/bold green]")


@app.command("list")
def list_backups():
    """Lista todos os backups disponíveis e seus tamanhos."""
    _ensure_dirs()
    table = Table(title="Backups Disponíveis no Projeto", show_header=True)
    table.add_column("Origem", style="cyan")
    table.add_column("Arquivo", style="bold")
    table.add_column("Tamanho", justify="right", style="green")
    table.add_column("Criado em", style="dim")

    categories = [
        ("SQLite Dev", BACKUP_ROOT / "sqlite"),
        ("Postgres Dev", BACKUP_ROOT / "postgres_dev"),
        ("Postgres Prod", BACKUP_ROOT / "postgres_prod"),
        ("Prod Original (Dump)", BACKUP_ROOT / "production"),
    ]

    total_files = 0
    total_bytes = 0

    for label, folder in categories:
        if not folder.exists():
            continue
        files = sorted(
            [f for f in folder.glob("*") if f.is_file() and not f.name.startswith(".")],
            key=lambda x: x.stat().st_mtime,
            reverse=True,
        )
        for f in files:
            total_files += 1
            st = f.stat()
            total_bytes += st.st_size
            dt = datetime.fromtimestamp(st.st_mtime).strftime("%d/%m/%Y %H:%M:%S")
            table.add_row(label, f.name, _format_size(st.st_size), dt)

    console.print(table)
    console.print(f"[dim]Total: {total_files} arquivo(s), {_format_size(total_bytes)}[/dim]")


@app.command("status")
def status_dbs():
    """Compara lado a lado os registros de tabelas em SQLite Dev, Postgres Dev e Postgres Prod."""
    sqlite_counts = _get_sqlite_table_counts(SQLITE_DB_PATH)
    pg_dev_counts = _get_pg_table_counts(PG_DEV_DB)
    pg_prod_counts = _get_pg_table_counts(PG_PROD_DB)

    all_tables = sorted(set(list(sqlite_counts.keys()) + list(pg_dev_counts.keys()) + list(pg_prod_counts.keys())))

    table = Table(title="Comparativo de Dados nos Bancos de Dados", show_header=True)
    table.add_column("Tabela", style="cyan", no_wrap=True)
    table.add_column("SQLite Dev", justify="right", style="yellow")
    table.add_column("Postgres Dev (db)", justify="right", style="blue")
    table.add_column("Postgres Prod (db_prod)", justify="right", style="green")

    for t in all_tables:
        sq = str(sqlite_counts.get(t, "-"))
        dev = str(pg_dev_counts.get(t, "-"))
        prod = str(pg_prod_counts.get(t, "-"))
        table.add_row(t, sq, dev, prod)

    console.print(table)


if __name__ == "__main__":
    app()
