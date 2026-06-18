from typing import Any


from contextvars import ContextVar

request_context = ContextVar[Any]("request_context")

# Methods for building the context
