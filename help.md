#Help

#Alembic
https://alembic.sqlalchemy.org/en/latest/cookbook.html

# SQLite
uv run alembic -x "db=sqlite" revision --autogenerate -m "msg"
uv run alembic -x "db=sqlite" upgrade head

# PostgreSQL (quando estiver rodando)
uv run alembic -x "db=pg" revision --autogenerate -m "msg"
uv run alembic -x "db=pg" upgrade head



## deep

https://deepwiki.com/fastapi/fastapi/2.1-application-and-routing-system

## General

### App factory
https://github.com/fastapi/fastapi/discussions/6302

### Patterns
https://fastapi-patterns.com/core-architecture-routing-patterns/application-factory-patterns/

### Auth and permissions
https://app-generator.dev/docs/technologies/fastapi/rbac.html

https://www.permit.io/blog/fastapi-rbac-full-implementation-tutorial

### more patterns
https://orchestrator.dev/blog/2025-1-30-fastapi-production-patterns/
https://medium.com/@srimukhsai24/5-fastapi-architecture-patterns-every-production-developer-should-know-b5342acbc6a6

### Middlewares
https://fastapi.tiangolo.com/tutorial/middleware/
https://fastapi.tiangolo.com/advanced/middleware/
### Classes
https://plainenglish.io/python/better-python-singleton-with-a-metaclass
https://www.geeksforgeeks.org/python/python-metaclasses/

### classrouter
https://github.com/Sokirlov/FastApi_Class_Router/blob/main/src/fastapi_class_router/core.py
https://fastapi.tiangolo.com/reference/apirouter/?h=router#fastapi.APIRouter.include_router--example

### Decorators
https://www.geeksforgeeks.org/python/decorators-in-python/


### Custom Routers
https://fastapi.tiangolo.com/how-to/custom-request-and-route/?h=route_handler#custom-apiroute-class-in-a-router

### auth
https://oneuptime.com/blog/post/2026-01-25-fastapi-authentication-middleware/view



### Frontned

preload
https://htmx.org/extensions/preload/

response-targets
https://htmx.org/extensions/response-targets/

sse
https://htmx.org/extensions/sse/

morph
https://alpinejs.dev/plugins/morph





class RequireRole:
    def __init__(self, level: str):
        self.level = level

    async def __call__(self, request: Request) -> User:
        ctx = request.state.ctx
        user = ctx.get("user")
        if not user:
            raise HTTPException(401)
        if user.role != self.level:
            raise HTTPException(403)
        return user

@router.get("/admin")
async def admin_view(
    request: Request,
    user: User = Depends(RequireRole("admin")),
):
    ...



    Pontos de Atenção (não críticos, apenas para ter no radar)
1. Reset do ContextVar: Hoje o ContextRoute seta o contexto mas nunca reseta. Em condições normais não vaza (cada request é uma Task nova), mas o padrão seguro é:
token = request_context.set(context)
try:
    response = await original_route_handler(request)
finally:
    request_context.reset(token)



    reset no middleware ?