from fastapi import FastAPI
from core.lifespan import lifespan
from core.loader import registry
from fastapi.staticfiles import StaticFiles
from core.settings import BASE_DIR


def app_factory():
    app = FastAPI(lifespan=lifespan)

    registry.load_global_middlewares(app)
    return app


app = app_factory()

app.mount(
    "/static", StaticFiles(directory=str(BASE_DIR / "static/dist")), name="static"
)

# load_middlewares
# handlers de excessao global
# registry.load_global_middlewares
