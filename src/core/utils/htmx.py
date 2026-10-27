import json
from typing import Any
from fastapi import Request, Response


def is_htmx_request(request: Request) -> bool:
    return request.headers.get("hx-request") == "true"


def update_htmx_title(response: Response, title: str) -> Response:
    response.headers["HX-Trigger-After-Swap"] = json.dumps({"updateTitle": title})
    return response


def redirect_htmx_header(
    path: str,
    target: str = "#content",
    swap: str = "innerHTML",
    extra_headers: dict[str, Any] | None = None,
) -> Response:
    """Retorna Response 200 com `HX-Location` para navegação softnav HTMX."""
    response = Response(status_code=200)
    hx_location_header: dict[str, Any] = {"path": path, "target": target, "swap": swap}
    if extra_headers:
        hx_location_header["headers"] = extra_headers
    response.headers["HX-Location"] = json.dumps(hx_location_header)
    return response
