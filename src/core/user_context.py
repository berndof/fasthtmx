from contextvars import ContextVar
from uuid import UUID

current_user_id: ContextVar[UUID | None] = ContextVar(
    "current_user_id", default=None
)


def set_current_user_id(user_id: UUID | None) -> None:
    current_user_id.set(user_id)


def get_current_user_id() -> UUID | None:
    return current_user_id.get()
