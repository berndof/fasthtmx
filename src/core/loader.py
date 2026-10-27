import importlib
from logging import getLogger

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.meta.singleton import Singleton
from core.middleware import SessionMiddleware
from core.middleware.access_log import AccessLogMiddleware
from core.models import BaseSQLModel
from core.modules.theme.middlewares.theme import ThemeMiddleware
from core.router import ContextRouter
from core.settings import BASE_DIR

logger = getLogger("loader")

CORE_MODULES_DIR = BASE_DIR / "core/modules"
APP_MODULES_DIR = BASE_DIR / "modules"


class LoaderRegistry(metaclass=Singleton):
    def __init__(self):
        self.models: list[type[BaseSQLModel]] = []
        self.discover_paths = [CORE_MODULES_DIR, APP_MODULES_DIR]

    def discover_routers(self):
        search_patterns = ["*/routes.py", "*/routes/*.py"]
        logger.info("Descobrindo rotas...")

        discovered_files = set()
        for path in self.discover_paths:
            if not path.exists():
                continue
            for pattern in search_patterns:
                discovered_files.update(path.glob(pattern))

        legacy_routers: list[APIRouter] = []
        for file_path in sorted(discovered_files):
            if file_path.name.startswith("__"):
                continue

            relative_path = file_path.relative_to(BASE_DIR).with_suffix("")
            import_path = ".".join(relative_path.parts)

            try:
                module = importlib.import_module(import_path)
                logger.debug(f"Importing router {import_path}")
            except Exception:
                logger.error(f"Error importing router {import_path}", exc_info=True)
                raise

            router = getattr(module, "router", None)
            if isinstance(router, APIRouter):
                legacy_routers.append(router)

        self._legacy_routers = legacy_routers
        return legacy_routers

    def load_routers(self, app: FastAPI):
        self.discover_routers()
        routers = ContextRouter.__subclasses__()
        for router_class in routers:
            i_router = router_class()
            app.include_router(i_router.api_router)
            logger.debug(f"Adicionando router {router_class.__name__} ({i_router.prefix})")

        legacy_routers = getattr(self, "_legacy_routers", [])
        for legacy in legacy_routers:
            app.include_router(legacy)

        logger.info(
            "Routers carregados: %d ContextRouter(s), %d APIRouter(s)",
            len(routers),
            len(legacy_routers),
        )

    def discover_sqlmodels(self):
        search_patterns = ["*/models.py", "*/models/*.py"]
        logger.info("Descobrindo modelos...")

        discovered_files = set()
        for path in self.discover_paths:
            if not path.exists():
                continue
            for pattern in search_patterns:
                discovered_files.update(path.glob(pattern))

        for file_path in sorted(discovered_files):
            if file_path.name.startswith("__"):
                continue

            relative_path = file_path.relative_to(BASE_DIR).with_suffix("")
            import_path = ".".join(relative_path.parts)

            try:
                _ = importlib.import_module(import_path)
                logger.debug(f"Importing model {import_path}")
            except Exception:
                logger.error(f"Error importing model {import_path}", exc_info=True)
                raise

        logger.info("Modelos carregados: %d arquivos de modelo", len(discovered_files))

    def load_modules(self, app: FastAPI):
        logger.info("Iniciando descoberta e carregamento de módulos...")
        self.discover_sqlmodels()
        self.load_routers(app)
        logger.info("Carregamento de módulos concluído com sucesso.")

    def add_global_middlewares(self, app: FastAPI):
        origins = ["http://localhost:8000", "http://127.0.0.1:8000"]

        # Ordem de registro: o último adicionado é o mais externo
        app.add_middleware(SessionMiddleware)
        app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        app.add_middleware(ThemeMiddleware)
        app.add_middleware(AccessLogMiddleware)


loaderRegistry = LoaderRegistry()
