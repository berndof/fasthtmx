from fastapi import FastAPI
from core.lifespan import lifespan
from core.loader import registry


def app_factory():
    app = FastAPI(lifespan=lifespan)

    registry.load_global_middlewares(app)
    return app


app = app_factory()
# load_middlewares
# handlers de excessao global
# registry.load_global_middlewares
