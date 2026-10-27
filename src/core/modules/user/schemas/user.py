from datetime import datetime
from uuid import UUID

from pydantic import ConfigDict, EmailStr, Field, field_validator

from core.schema import BaseSchema, ModelSchema

from .group import GroupOut


class UserIn(BaseSchema):
    model_config = ConfigDict(extra="ignore")

    username: str = Field(..., min_length=8, max_length=100)
    email: EmailStr = Field(...)

    first_name: str = Field(..., min_length=2, max_length=50)

    last_name: str = Field(..., min_length=3, max_length=50)

    password: str = Field(..., min_length=8, max_length=128)

    groups: list[str] = Field(default_factory=lambda: ["users"])

    @field_validator("groups", mode="before")
    @classmethod
    def parse_groups(cls, v):
        if isinstance(v, str):
            return [v]
        return v

    @field_validator("groups", mode="after")
    @classmethod
    def ensure_default_group(cls, v: list[str]) -> list[str]:
        if "users" not in v:
            v.append("users")
        return v


class UserUpdate(BaseSchema):
    model_config = ConfigDict(extra="ignore")

    username: str = Field(..., min_length=8, max_length=100)
    email: EmailStr = Field(...)

    first_name: str = Field(..., min_length=2, max_length=50)

    last_name: str = Field(..., min_length=3, max_length=50)

    is_enabled: bool = True

    groups: list[str] = Field(default_factory=lambda: ["users"])

    @field_validator("groups", mode="before")
    @classmethod
    def parse_groups(cls, v):
        if isinstance(v, str):
            return [v]
        return v

    @field_validator("groups", mode="after")
    @classmethod
    def ensure_default_group(cls, v: list[str]) -> list[str]:
        if "users" not in v:
            v.append("users")
        return v


class UserOut(ModelSchema):
    id: UUID
    email: str
    name: str
    first_name: str
    last_name: str


class UserView(ModelSchema):
    id: UUID
    username: str
    email: str
    first_name: str
    last_name: str
    name: str
    is_admin: bool
    is_enabled: bool
    created_at: datetime | None
    updated_at: datetime | None
    groups: list[GroupOut]


class UserSession(UserOut):
    permissions: list[str]
