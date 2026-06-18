from pydantic import BaseModel
from core.modules.auth.schemas.session import Session


class BaseContext(BaseModel):
    session: Session  # UserSession ou GuestSession
