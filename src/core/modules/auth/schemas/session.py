from core.schemas.base import BaseSchema
from uuid import UUID


class Session(BaseSchema):
    session_id: UUID


class GuestSession(Session):
    # dados de guest
    ...


class UserSession(Session):
    user_id: UUID
