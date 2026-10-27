import logging
from logging.handlers import RotatingFileHandler
from os import environ
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

PROJECT_ROOT = Path(__file__).parent.parent.parent
LOG_DIR = Path(environ.get("LOG_DIR", str(PROJECT_ROOT / "logs")))
LOG_DIR.mkdir(parents=True, exist_ok=True)

LOG_LEVEL = environ.get("LOG_LEVEL", "INFO").upper()
LOG_MAX_BYTES = int(environ.get("LOG_MAX_BYTES", 10 * 1024 * 1024))  # 10 MB padrão
LOG_BACKUP_COUNT = int(environ.get("LOG_BACKUP_COUNT", 5))
LOG_STATIC = environ.get("LOG_STATIC", "false").lower() in ("true", "1", "yes")
LOG_SQL = environ.get("LOG_SQL", "false").lower() in ("true", "1", "yes")

DEFAULT_FORMAT = "%(asctime)s [%(levelname)s] [%(name)s] %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

class FlushRotatingFileHandler(RotatingFileHandler):
    """Handler de arquivo que força o flush no sistema operacional a cada log emitido.
    Isso evita problemas de buffer ao rodar 'tail -f' em ambiente de desenvolvimento."""
    def emit(self, record):
        super().emit(record)
        self.flush()

class OptionalContextFormatter(logging.Formatter):
    """Formatter que injeta request_id, user_id e outros atributos se existirem no record."""
    def format(self, record):
        if not hasattr(record, "request_id"):
            record.request_id = "-"
        if not hasattr(record, "user_id"):
            record.user_id = "-"
        return super().format(record)


FORMATTERS = {
    "default": {
        "()": "uvicorn.logging.DefaultFormatter",
        "fmt": "%(levelprefix)s %(message)s",
        "use_colors": None,
    },
    "access_console": {
        "()": "uvicorn.logging.DefaultFormatter",
        "fmt": "%(levelprefix)s %(message)s",
        "use_colors": True,
    },
    "file": {
        "()": "core.log.OptionalContextFormatter",
        "format": "%(asctime)s [%(levelname)s] [%(name)s] [req_id=%(request_id)s] %(message)s",
        "datefmt": DATE_FORMAT,
    },
    "access_file": {
        "format": "%(message)s",
    },
    "rich": {
        "format": "\\[%(name)s] %(message)s",
        "datefmt": "[%X]",
    },
    "json": {
        "()": "pythonjsonlogger.jsonlogger.JsonFormatter",
        "format": DEFAULT_FORMAT,
        "datefmt": DATE_FORMAT,
    },
}

HANDLERS = {
    "rich": {
        "level": "DEBUG",
        "class": "rich.logging.RichHandler",
        "show_time": True,
        "show_level": True,
        "show_path": False,
        "formatter": "rich",
        "rich_tracebacks": True,
        "markup": True,
    },
    "access_console": {
        "level": "INFO",
        "class": "logging.StreamHandler",
        "formatter": "access_console",
        "stream": "ext://sys.stdout",
    },
    "file": {
        "level": "DEBUG",
        "class": "core.log.FlushRotatingFileHandler",
        "formatter": "file",
        "filename": str(LOG_DIR / "app.log"),
        "maxBytes": LOG_MAX_BYTES,
        "backupCount": LOG_BACKUP_COUNT,
        "encoding": "utf-8",
    },
    "accessfile": {
        "level": "INFO",
        "class": "core.log.FlushRotatingFileHandler",
        "formatter": "access_file",
        "filename": str(LOG_DIR / "access.log"),
        "maxBytes": LOG_MAX_BYTES,
        "backupCount": LOG_BACKUP_COUNT,
        "encoding": "utf-8",
    },
    "errorfile": {
        "level": "ERROR",
        "class": "core.log.FlushRotatingFileHandler",
        "formatter": "file",
        "filename": str(LOG_DIR / "error.log"),
        "maxBytes": LOG_MAX_BYTES,
        "backupCount": LOG_BACKUP_COUNT,
        "encoding": "utf-8",
    },
    "sqlfile": {
        "level": "INFO",
        "class": "core.log.FlushRotatingFileHandler",
        "formatter": "file",
        "filename": str(LOG_DIR / "sql.log"),
        "maxBytes": LOG_MAX_BYTES,
        "backupCount": LOG_BACKUP_COUNT,
        "encoding": "utf-8",
    },
    "json": {"level": LOG_LEVEL, "class": "logging.StreamHandler", "formatter": "json"},
}

SYSTEM_LOGGERS = {
    "sqlalchemy.engine": {
        "level": "INFO" if LOG_SQL else "WARNING",
        "propagate": False,
        "handlers": ["rich", "sqlfile"] if LOG_SQL else ["rich", "file"],
    },
    "uvicorn.access": {
        "level": "WARNING",  # Silenciamos o nativo para o nosso middleware agir sozinho
        "propagate": False,
        "handlers": ["rich"],
    },
    "uvicorn.error": {
        "level": "INFO",
        "propagate": False,
        "handlers": ["rich", "file", "errorfile"],
    },
    "watchfiles": {
        "level": "WARNING",
        "propagate": False,
        "handlers": ["rich", "file"],
    },
    "httpcore": {"level": "WARNING", "propagate": False, "handlers": ["rich", "file"]},
    "httpx": {"level": "WARNING", "propagate": False, "handlers": ["rich", "file"]},
    "aiosqlite": {"level": "WARNING", "propagate": False, "handlers": ["rich", "file"]},
}

LOG_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": FORMATTERS,
    "handlers": HANDLERS,
    "root": {"handlers": ["rich", "file", "errorfile"], "level": "INFO"},
    "loggers": {
        "app": {"handlers": ["rich", "file", "errorfile"], "propagate": False, "level": LOG_LEVEL},
        "app.access": {"handlers": ["access_console", "accessfile"], "propagate": False, "level": "INFO"},
        "app.error": {"handlers": ["rich", "file", "errorfile"], "propagate": False, "level": "ERROR"},
        "loader": {"handlers": ["rich", "file"], "propagate": False, "level": "INFO"},
        "DBSessionManager": {"handlers": ["rich", "file", "errorfile"], "propagate": False, "level": "INFO"},
        **SYSTEM_LOGGERS,
    },
}

def setup_logging():
    from logging.config import dictConfig
    dictConfig(LOG_CONFIG)

