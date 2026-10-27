from uuid import UUID

from pydantic import Field

from core.schema import BaseSchema, ModelSchema


class GroupIn(BaseSchema):
    name: str = Field(..., min_length=3)


class GroupOut(ModelSchema):
    id: UUID
    name: str


class GroupAddMember(BaseSchema):
    group: UUID | str  # uuid or group.name
    user: UUID  #  | struuid or user.username

    # members: [list[UserOut]]
