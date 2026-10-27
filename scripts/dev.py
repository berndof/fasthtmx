import argparse
import os
import signal
import subprocess
import sys
from pathlib import Path

import uvicorn

PROJECT_ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(PROJECT_ROOT / "src"))
from core.settings import APP_LISTEN_ADDR, APP_LISTEN_PORT  # noqa: E402
from core.log import setup_logging  # noqa: E402

def main():
    setup_logging()
    parser = argparse.ArgumentParser(description="Inicia o servidor de desenvolvimento.")
    parser.add_argument(
        "--with-assets",
        "--full",
        action="store_true",
        help="Inicia também os watchers de assets de frontend (Tailwind CSS + esbuild) em paralelo.",
    )
    args = parser.parse_args()

    asset_proc = None
    if args.with_assets:
        print("⚡ [dev] Iniciando watchers de frontend (pnpm run watch)...")
        asset_proc = subprocess.Popen(
            ["pnpm", "run", "watch"],
            cwd=str(PROJECT_ROOT),
        )

    def cleanup(signum=None, frame=None):
        if asset_proc and asset_proc.poll() is None:
            print("\n🛑 [dev] Encerrando watchers de frontend...")
            try:
                asset_proc.terminate()
                asset_proc.wait(timeout=3)
            except Exception:
                asset_proc.kill()
        if signum is not None:
            sys.exit(0)

    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)

    try:
        uvicorn.run(
            app="app:app",
            host=APP_LISTEN_ADDR,
            port=int(APP_LISTEN_PORT),
            access_log=False,
            reload=True,
            loop="uvloop",
            reload_dirs=[str(PROJECT_ROOT / "src")],
            reload_excludes=[
                str(PROJECT_ROOT / "src" / "dist"),
                str(PROJECT_ROOT / "src" / "static"),
                str(PROJECT_ROOT / "src" / "uploads"),
                "*/__pycache__/*",
                "*.pyc",
                "*.pyo",
            ],
            reload_delay=0.8,
        )
    finally:
        cleanup()


if __name__ == "__main__":
    main()
