from fastapi import Request, HTTPException, Depends
from core.context import request_context


def require_group(*group_names: str):
    async def dependency(request: Request):
        ctx = request_context.get({})
        user = ctx.get("user")
        if not user:
            raise HTTPException(status_code=303, headers={"Location": "/login"})

        user_groups = ctx.get("groups", [])

        if "root" in user_groups:
            return user

        for g in group_names:
            if g in user_groups:
                return user

        raise HTTPException(status_code=403, detail="Acesso negado")

    return Depends(dependency)
