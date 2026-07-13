from fastapi import Request, HTTPException
from starlette.responses import RedirectResponse
from core.context import request_context
from core.modules.auth.models.user import User


async def require_auth(request: Request) -> User:
    ctx = request_context.get({})
    user = ctx.get("user")
    if not user:
        raise HTTPException(status_code=303, headers={"Location": "/login"})
    return user
