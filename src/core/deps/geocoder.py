from typing import Any

from fastapi import Request


async def get_geocoder(request: Request) -> Any:
    return getattr(request.app.state, "geocoder", None)
