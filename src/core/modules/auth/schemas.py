from typing import Any
from uuid import UUID

from pydantic import Field, field_validator, model_validator

from core.schema import BaseSchema, FormSchema, ModelSchema


class UserAuthForm(FormSchema):
    email: str | None = Field(default=None)
    username: str | None = Field(default=None)
    password: str = Field(..., min_length=1)

    @model_validator(mode="after")
    def _ensure_identifier(self) -> "UserAuthForm":
        ident = (self.email or self.username or "").strip()
        if not ident:
            raise ValueError("Informe o usuário ou e-mail")
        return self

    @property
    def identifier(self) -> str:
        return (self.email or self.username or "").strip()


class TokenBase(BaseSchema):
    sub: str
    exp: int  # timestamp UNIX
    jti: str  # id da sessão (chave em auth_sessions)

    @field_validator("sub", mode="before")
    @classmethod
    def validate_sub_from_uuid(cls, v: Any) -> str:
        if isinstance(v, UUID):
            return v.hex
        return v

    @field_validator("jti", mode="before")
    @classmethod
    def validate_jti_from_uuid(cls, v: Any) -> str:
        if isinstance(v, UUID):
            return v.hex
        return v


class AccessTokenPayload(TokenBase):
    type: str = "access"


class RefreshTokenPayload(TokenBase):
    type: str = "refresh"


class EncodedTokenPair(BaseSchema):
    access_token: str
    refresh_token: str


class UserSession(ModelSchema):
    id: UUID
    username: str = ""
    email: str
    first_name: str
    last_name: str
    name: str
    groups: list[str]
    is_admin: bool
