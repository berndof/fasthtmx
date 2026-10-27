from typing import Any, Callable
from .schemas import HttpMethod, RouteMetadata


class RouteRegister:
    """Decorador explícito para métodos de um `ContextRouter`:
    `@route.get('/path')`, `@route.post('/path')`, `@route.put('/path')`, `@route.delete('/path')`, `@route.patch('/path')`.
    Aceita `public=True` para rotas abertas e `dependencies=[...]` por rota.
    """

    def __call__(
        self,
        methods: list[HttpMethod],
        path: str,
        *,
        public: bool | None = None,
        dependencies: list[Any] | None = None,
    ) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
            setattr(
                func,
                "__route__",
                RouteMetadata(
                    methods=methods,
                    path=path,
                    public=public,
                    dependencies=dependencies,
                ),
            )
            return func

        return decorator

    def get(
        self,
        path: str,
        *,
        public: bool | None = None,
        dependencies: list[Any] | None = None,
    ) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return self(["GET"], path, public=public, dependencies=dependencies)

    def post(
        self,
        path: str,
        *,
        public: bool | None = None,
        dependencies: list[Any] | None = None,
    ) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return self(["POST"], path, public=public, dependencies=dependencies)

    def put(
        self,
        path: str,
        *,
        public: bool | None = None,
        dependencies: list[Any] | None = None,
    ) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return self(["PUT"], path, public=public, dependencies=dependencies)

    def delete(
        self,
        path: str,
        *,
        public: bool | None = None,
        dependencies: list[Any] | None = None,
    ) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return self(["DELETE"], path, public=public, dependencies=dependencies)

    def patch(
        self,
        path: str,
        *,
        public: bool | None = None,
        dependencies: list[Any] | None = None,
    ) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return self(["PATCH"], path, public=public, dependencies=dependencies)


route = RouteRegister()
