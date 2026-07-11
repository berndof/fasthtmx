from core.schemas import BaseSchema
from pydantic import Field


class UserAuthForm(BaseSchema):
    email: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=1, max_length=20)
