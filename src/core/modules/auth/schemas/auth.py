from core.schemas import BaseSchema
from pydantic import EmailStr, Field


class UserAuthForm(BaseSchema):
    email: EmailStr = Field(...)
    password: str = Field(..., max_length=20)
