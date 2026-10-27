from __future__ import annotations

import filecmp
import shutil
from pathlib import Path
from typing import Annotated

import typer

app = typer.Typer(
    name="core",
    help="Sincronizar e inspecionar o diretório src/core entre projetos FastHTMX.",
    invoke_without_command=True,
)

ROOT_DIR = Path(__file__).resolve().parent.parent
DEFAULT_TARGETS = [
    ROOT_DIR.parent / "gestao-torres",
    ROOT_DIR.parent / "sccintranetfasthtmx",
    ROOT_DIR.parent / "uploadscomercial",
]

IGNORE_NAMES = {"__pycache__", ".pytest_cache", ".ruff_cache", ".DS_Store"}


def _should_ignore(path: Path) -> bool:
    return any(part in IGNORE_NAMES or part.endswith(".pyc") for part in path.parts)


def _sync_tree(
    src_root: Path,
    dst_root: Path,
    *,
    dry_run: bool = False,
) -> tuple[list[str], list[str], list[str]]:
    added: list[str] = []
    updated: list[str] = []
    removed: list[str] = []

    src_files: dict[Path, Path] = {}
    for p in src_root.rglob("*"):
        rel = p.relative_to(src_root)
        if _should_ignore(rel):
            continue
        if p.is_file():
            src_files[rel] = p

    dst_files: dict[Path, Path] = {}
    if dst_root.exists():
        for p in dst_root.rglob("*"):
            rel = p.relative_to(dst_root)
            if _should_ignore(rel):
                continue
            if p.is_file():
                dst_files[rel] = p

    # Copy added and updated files
    for rel, src_file in sorted(src_files.items()):
        dst_file = dst_root / rel
        if rel not in dst_files:
            added.append(str(rel))
            if not dry_run:
                dst_file.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_file, dst_file)
        elif not filecmp.cmp(src_file, dst_file, shallow=False):
            updated.append(str(rel))
            if not dry_run:
                dst_file.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_file, dst_file)

    # Remove obsolete files in destination
    for rel, dst_file in sorted(dst_files.items()):
        if rel not in src_files:
            removed.append(str(rel))
            if not dry_run:
                dst_file.unlink(missing_ok=True)

    # Clean empty directories in destination
    if dst_root.exists() and not dry_run:
        for d in sorted(dst_root.rglob("*"), key=lambda x: len(x.parts), reverse=True):
            if d.is_dir():
                # Remove __pycache__ if directory is otherwise obsolete
                pycache = d / "__pycache__"
                if pycache.exists() and not any(
                    child != pycache for child in d.iterdir()
                ):
                    shutil.rmtree(pycache, ignore_errors=True)
                try:
                    d.rmdir()
                except OSError:
                    pass

    return added, updated, removed


@app.callback()
def callback(ctx: typer.Context):
    if ctx.invoked_subcommand is None:
        typer.echo(ctx.get_help())
        raise typer.Exit()


@app.command("sync")
def sync_core(
    targets: Annotated[
        list[Path] | None,
        typer.Argument(
            help="Caminhos dos projetos de destino. Se omitido, sincroniza gestao-torres, sccintranetfasthtmx e uploadscomercial."
        ),
    ] = None,
    dry_run: Annotated[
        bool,
        typer.Option("--dry-run", "-n", help="Apenas exibe as diferenças sem alterar arquivos."),
    ] = False,
    include_cli: Annotated[
        bool,
        typer.Option("--include-cli/--no-include-cli", help="Sincronizar também o diretório cli/."),
    ] = True,
):
    """Sincroniza `src/core/` (e opcionalmente `cli/`) deste repositório para os projetos alvo."""
    src_core = ROOT_DIR / "src" / "core"
    src_cli = ROOT_DIR / "cli"

    if not src_core.is_dir():
        typer.secho(f"Erro: diretório fonte não encontrado: {src_core}", fg=typer.colors.RED)
        raise typer.Exit(code=1)

    resolved_targets = [t.resolve() for t in targets] if targets else DEFAULT_TARGETS

    for target in resolved_targets:
        if not target.exists():
            typer.secho(f"⚠ Ignorando destino inexistente: {target}", fg=typer.colors.YELLOW)
            continue
        if target.resolve() == ROOT_DIR:
            typer.secho(f"⚠ Ignorando o próprio repositório fonte: {target}", fg=typer.colors.YELLOW)
            continue

        prefix = "[DRY-RUN] " if dry_run else ""
        typer.secho(f"\n{prefix}==> Sincronizando {target.name} ({target})", fg=typer.colors.CYAN, bold=True)

        added, updated, removed = _sync_tree(src_core, target / "src" / "core", dry_run=dry_run)
        typer.echo(
            f"  src/core : +{len(added)} adicionados, ~{len(updated)} atualizados, -{len(removed)} removidos"
        )

        if include_cli and src_cli.is_dir():
            c_add, c_upd, c_rem = _sync_tree(src_cli, target / "cli", dry_run=dry_run)
            typer.echo(
                f"  cli      : +{len(c_add)} adicionados, ~{len(c_upd)} atualizados, -{len(c_rem)} removidos"
            )

    typer.secho("\n✔ Sincronização concluída!", fg=typer.colors.GREEN, bold=True)
