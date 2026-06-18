from pathlib import Path
import uvicorn
import sys

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))
from core.settings import APP_LISTEN_ADDR, APP_LISTEN_PORT
from core.log import LOG_CONFIG

if __name__ == "__main__":
    uvicorn.run(
        app="app:app",
        host=APP_LISTEN_ADDR,
        port=APP_LISTEN_PORT,
        log_config=LOG_CONFIG,
        reload=True,
        loop="uvloop",
        # reload_delay=0.5,
    )
