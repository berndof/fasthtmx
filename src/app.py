from contextlib import asynccontextmanager
from logging import getLogger

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from core.database import ensure_default_seed, ensure_schema, sessionmanager
from core.loader import loaderRegistry
from core.log import setup_logging
from core.settings import BASE_DIR, DB_ENGINE, DEBUG

setup_logging()

LOGGER = getLogger("app")


@asynccontextmanager
async def lifespan(app: FastAPI):
    sessionmanager.init_db()
    loaderRegistry.load_modules(app)

    if DB_ENGINE == "sqlite":
        await ensure_schema()
        await ensure_default_seed()

    yield


def app_factory() -> FastAPI:
    app = FastAPI(lifespan=lifespan, docs_url="/docs" if DEBUG else None, redoc_url=None)
    loaderRegistry.add_global_middlewares(app)
    return app


app = app_factory()

for static_dir in (BASE_DIR / "static/img", BASE_DIR / "static/vendor", BASE_DIR / "dist"):
    static_dir.mkdir(parents=True, exist_ok=True)

app.mount(
    "/static/img",
    StaticFiles(directory=str(BASE_DIR / "static/img")),
    name="static_images",
)
app.mount(
    "/vendor",
    StaticFiles(directory=str(BASE_DIR / "static/vendor")),
    name="vendor",
)
app.mount(
    "/static",
    StaticFiles(directory=str(BASE_DIR / "dist")),
    name="static",
)


def _is_page_route(url_path: str) -> bool:
    return not (url_path.startswith("/api") or url_path.startswith("/static"))


def _hx_redirect(request: Request, path: str):
    if request.headers.get("hx-request") == "true":
        response = JSONResponse(None, status_code=200)
        response.headers["HX-Redirect"] = path
        return response
    return RedirectResponse(path, status_code=302)


@app.exception_handler(401)
async def unauthorized_handler(request: Request, exc: HTTPException):
    if _is_page_route(request.url.path):
        return _hx_redirect(request, "/login")
    return JSONResponse(
        {"detail": "Não autenticado ou sessão expirada"}, status_code=401
    )


@app.exception_handler(403)
async def no_permission_handler(request: Request, exc: HTTPException):
    if _is_page_route(request.url.path):
        return _hx_redirect(request, "/home")
    return JSONResponse({"detail": str(exc.detail or "Sem permissão")}, status_code=403)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    LOGGER.exception(
        "Exceção não tratada ao processar %s %s: %s",
        request.method,
        request.url.path,
        exc,
    )
    if request.headers.get("hx-request") == "true":
        return HTMLResponse(
            '<div class="p-4 m-2 rounded-radius bg-error/10 border border-error/30 text-error text-sm">'
            "<strong>Erro interno no servidor (500):</strong> Ocorreu uma falha ao processar a requisição.</div>",
            status_code=500,
        )
    payload: dict[str, str] = {"detail": "Erro interno do servidor"}
    if DEBUG:
        payload["error"] = str(exc)
    return JSONResponse(payload, status_code=500)


@app.get("/")
async def root_redirect(_: Request):
    return RedirectResponse(url="/home", status_code=302)
