import json
import os
import signal
import subprocess
import sys
import time
from pathlib import Path

import typer

PID_FILE = Path(__file__).parent.parent / ".dev.pid"
LOG_DIR = Path(__file__).parent.parent / "logs"
PROJECT_ROOT = Path(__file__).parent.parent

app = typer.Typer(help="Gerenciar o servidor de desenvolvimento.")


def _read_pids() -> dict:
    if not PID_FILE.exists():
        return {}
    try:
        return json.loads(PID_FILE.read_text())
    except (json.JSONDecodeError, ValueError):
        return {}


def _write_pids(pids: dict) -> None:
    PID_FILE.write_text(json.dumps(pids))


def _is_alive(pid: int) -> bool:
    try:
        os.kill(pid, 0)
        return True
    except (OSError, ProcessLookupError):
        return False


@app.command()
def start():
    """Inicia o servidor da API em background."""
    existing = _read_pids()
    if existing.get("api") and _is_alive(existing["api"]):
        typer.echo(f"Servidor já está rodando (PID {existing['api']}). Use 'dev stop' para encerrar.")
        raise typer.Exit(1)

    PID_FILE.unlink(missing_ok=True)
    LOG_DIR.mkdir(exist_ok=True)

    env = os.environ.copy()
    env.setdefault("APP_LISTEN_ADDR", "0.0.0.0")
    env.setdefault("APP_LISTEN_PORT", "8000")

    api_proc = subprocess.Popen(
        [sys.executable, "scripts/dev.py"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        cwd=str(PROJECT_ROOT),
        env=env,
        start_new_session=True,
    )

    _write_pids({"api": api_proc.pid})

    typer.echo(f"Servidor rodando (PID {api_proc.pid})")
    typer.echo(f"Logs em {LOG_DIR / 'app.log'}")
    typer.echo(f"Acesse http://{env['APP_LISTEN_ADDR']}:{env['APP_LISTEN_PORT']}")


@app.command()
def stop():
    """Encerra o servidor da API e seus processos filhos."""
    pids = _read_pids()
    if not pids:
        typer.echo("Nenhum processo encontrado.")
        raise typer.Exit()

    pid = pids.get("api")
    if pid and _is_alive(pid):
        try:
            pgid = os.getpgid(pid)
            os.killpg(pgid, signal.SIGTERM)
            typer.echo(f"Servidor encerrado (PID {pid}, grupo {pgid}).")
        except ProcessLookupError:
            typer.echo(f"Processo {pid} já foi encerrado.")
            PID_FILE.unlink(missing_ok=True)
            raise typer.Exit()

        for _ in range(10):
            if not _is_alive(pid):
                break
            time.sleep(0.2)
        else:
            try:
                os.killpg(os.getpgid(pid), signal.SIGKILL)
                typer.echo("Processo não respondeu ao SIGTERM, forçando com SIGKILL.")
            except ProcessLookupError:
                pass
    else:
        typer.echo("Servidor não está rodando.")

    PID_FILE.unlink(missing_ok=True)


@app.command()
def run(
    with_assets: bool = typer.Option(
        False, "--with-assets", "-a", help="Inicia também os watchers de assets (Tailwind + esbuild)"
    )
):
    """Roda o servidor no foreground (logs no console). Ctrl+C para encerrar."""
    existing = _read_pids()
    if existing.get("api") and _is_alive(existing["api"]):
        typer.echo(
            f"Servidor já rodando em background (PID {existing['api']}). Use 'dev stop' antes."
        )
        raise typer.Exit(1)

    env = os.environ.copy()
    env.setdefault("APP_LISTEN_ADDR", "0.0.0.0")
    env.setdefault("APP_LISTEN_PORT", "8000")

    cmd = [sys.executable, "scripts/dev.py"]
    if with_assets:
        cmd.append("--with-assets")

    try:
        subprocess.run(
            cmd,
            cwd=str(PROJECT_ROOT),
            env=env,
        )
    except KeyboardInterrupt:
        typer.echo("\nServidor encerrado.")


@app.command()
def status():
    """Mostra o status do servidor."""
    pids = _read_pids()
    if not pids:
        typer.echo("Servidor parado.")
        raise typer.Exit()

    pid = pids.get("api")
    if pid and _is_alive(pid):
        typer.echo(f"Servidor rodando — PID {pid}")
    else:
        typer.echo("Servidor parado.")

    typer.echo(f"Logs em {LOG_DIR / 'app.log'}")