from functools import wraps
from fastapi import HTTPException


def require_permission(level: str):
    def decorator(handler):
        @wraps(handler)
        async def wrapper(request, *args, **kwargs):
            ctx = request.state.ctx

            # valida permissao

            if not user:
                raise HTTPException(status_code=401)
            if user.get("role") != level:
                raise HTTPException(status_code=403)

            return await handler(request, *args, **kwargs)

        return wrapper

    return decorator
