from pydantic import BaseModel, ConfigDict


class BaseSchema(BaseModel): ...


class ModelSchema(BaseSchema):
    # tipagem de modelo com generico ?
    model_config = ConfigDict(from_attributes=True)
