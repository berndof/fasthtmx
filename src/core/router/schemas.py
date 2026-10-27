from contextvars import ContextVar
from dataclasses import dataclass
from typing import Any, Literal

HttpMethod = Literal["GET", "POST", "PUT", "DELETE", "PATCH"]


@dataclass
class RequestContextSchema:
    sub_id: str | None
    request_id: str


RequestContext = ContextVar[RequestContextSchema]("request_context")


@dataclass
class RouteSchema:
    path: str
    func_name: str
    methods: list[HttpMethod]
    public: bool | None = None
    dependencies: list[Any] | None = None


@dataclass
class RouteMetadata:
    methods: list[HttpMethod]
    path: str
    public: bool | None = None
    dependencies: list[Any] | None = None
