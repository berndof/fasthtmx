from core.schemas import ModelSchema
from core.modules.auth.models.user import User
from uuid import UUID
from pydantic import Field


class UserIn(ModelSchema):
    id: UUID
    username: str = Field(..., min_length=4, max_length=16)
