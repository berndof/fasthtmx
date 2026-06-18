from fastapi import FastAPI, APIRouter
from logging import getLogger
from core.settings import BASE_DIR
import importlib
from core.meta import Singleton
from core.models import BasePGModel, BaseSqliteModel
from sqlalchemy.orm import DeclarativeBase
from typing import TypeVar, Any
from core.router.base import CustomRouter
from core.modules.home.routes.home import HomeRouter


# from fastapi.middleware.trustedhost import TrustedHostMiddleware
# from fastapi.middleware.gzip import GZipMiddleware
# from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.middleware.cors import CORSMiddleware

from core.middlewares import ProcessResponseTimeMiddleware
from core.middlewares import UowMiddleware

T = TypeVar("T", bound="DeclarativeBase")

CORE_MODULES_PATH = BASE_DIR / "core/modules"

logger = getLogger(f"loader")
logger.setLevel("DEBUG")


class Registry(metaclass=Singleton):
    def __init__(self):
        self.routers: list[Any] = []
        self.pg_models: list[type[BasePGModel]] = []
        self.sqlite_models: list[type[BaseSqliteModel]] = []
        self.middlewares: list = []

    def register_router(self, router: APIRouter):
        # self.routers.append(router)
        # logger.debug(f"Router {router.prefix} registered successfully.")
        return router

    def register_model(self, model_cls: type[T]) -> type[T]:
        # ver o subtipo do modelo, sqlite ou pg, e baseado nisso adicionar na lista correta
        if issubclass(model_cls, BasePGModel):
            self.pg_models.append(model_cls)
            logger.debug(f"Model {model_cls.__name__} registrado em PostgreSQL.")

        elif issubclass(model_cls, BaseSqliteModel):
            self.sqlite_models.append(model_cls)
            logger.debug(f"Model {model_cls.__name__} registrado em SQLite.")

        else:
            logger.warning(
                f"Model {model_cls.__name__} não herda de nenhuma base conhecida."
            )

        return model_cls

    def _discover_routers(self):
        search_pattern = "*/routes/*.py"
        # logger.debug("searching routers")

        # discovered_routers = []

        for file_path in CORE_MODULES_PATH.glob(search_pattern):
            # ignore __init__.py
            if file_path.name == "__init__.py":
                continue

            # logger.debug(file_path)
            relative_path = file_path.relative_to(BASE_DIR).with_suffix("")
            # logger.debug(relative_path)
            import_path = ".".join(relative_path.parts)
            # logger.debug(import_path)

            try:
                # dynamic import
                importlib.import_module(import_path)

                # verifiy if it has "router" object

                # if hasattr(module, "router"):
                #    router_obj = getattr(module, "router")
                logger.debug(f"find router {import_path}")
                # discovered_routers.append(router_obj)
                # else:
                #    pass
            except:
                logger.error(f"Error importing module {import_path}")
                raise

        return

    def _discover_models(self):
        search_pattern = "*/models/*.py"
        logger.debug("searching models")

        for file_path in CORE_MODULES_PATH.glob(search_pattern):
            # ignore __init__.py
            if file_path.name == "__init__.py":
                continue

            # logger.debug(file_path)
            relative_path = file_path.relative_to(BASE_DIR).with_suffix("")
            # logger.debug(relative_path)
            import_path = ".".join(relative_path.parts)
            # logger.debug(import_path)
            try:
                importlib.import_module(import_path)

            except:
                logger.error(f"Error importing module {import_path}")
                raise

        return

    def _load_routers(self, app: FastAPI):
        for router in registry.routers:
            # routers ja foram importados

            app.include_router(router)
            logger.debug(f"adicionando router {router.prefix}")

    def discover_routers(self):
        # importa as subclasses de custom routers
        # self.routers.append(HomeRouter)
        # logger.debug("adicionado class Router")
        routers = CustomRouter.__subclasses__()
        logger.debug(f"routers {routers}")
        return routers

    def load_routers(self, app: FastAPI):
        for router_class in self.discover_routers():
            i_router = router_class()  # inicializa o router

            app.include_router(i_router.router)  # adiciona o router no app
            logger.debug(f"adicionando router {i_router.prefix}")

    def load_models(self):
        self._discover_models()

    def load_modules(self, app: FastAPI):
        # self._discover_routers()
        # self.discover_routers()
        # self._load_routers(app)
        self.load_routers(app)

    def load_global_middlewares(self, app: FastAPI):
        # TODO add scan modules

        # app.add_middleware(
        #    TrustedHostMiddleware, allowed_hosts=["example.com", "*.example.com"]
        # )

        # app.add_middleware(GZipMiddleware, minimum_size=1000, compresslevel=5)

        # app.add_middleware(HTTPSRedirectMiddleware)

        # origins = [
        #    "http://localhost.tiangolo.com",
        #    "https://localhost.tiangolo.com",
        #    "http://localhost",
        #    "http://localhost:8080",
        # ]

        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        app.add_middleware(ProcessResponseTimeMiddleware)
        app.add_middleware(UowMiddleware)

        return


registry = Registry()  # noqa: F811
