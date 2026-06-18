DEFAULT_FORMAT = "%(asctime)s %(levelname)s %(name)s %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"
FORMATTERS = {
    "str": {"format": DEFAULT_FORMAT, "datefmt": DATE_FORMAT},
    "rich": {
        "format": "\\[%(name)s] -  %(message)s",
        "datefmt": "[%X]",
    },
}
HANDLERS = {
    "rich": {
        "level": "DEBUG",
        "class": "rich.logging.RichHandler",
        "show_time": True,
        "show_level": True,
        "show_path": False,  # não mostra o caminho do arquivo
        "formatter": "rich",
        "rich_tracebacks": True,
        "markup": True,
    },
}

LOGGERS = {
    "app": {"handlers": ["rich"], "propagate": False, "level": "DEBUG"},
    "loader": {"handlers": ["rich"], "propagate": False, "level": "INFO"},
    "script": {"handlers": ["rich"], "propagate": False, "level": "DEBUG"},
    "uvicorn": {"handlers": ["rich"], "propagate": False, "level": "INFO"},
}


LOG_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": FORMATTERS,
    "handlers": HANDLERS,
    "root": {"handlers": ["rich"], "level": "DEBUG"},
    "loggers": LOGGERS,
}
