from uuid import UUID
from sqlalchemy import select
from core.modules.auth.models.user import User
from core.modules.auth.models.session import UserSession
from core.modules.auth.utils import verify_password
from core.unit_of_work import UnitOfWork


class IdentityService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    async def authenticate(self, email: str, password: str) -> User | None:
        db = await self.uow.get_db_session()
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if not user or not verify_password(password, user.password_hash):
            return None
        return user

    async def create_session(self, user: User) -> UserSession:
        db = await self.uow.get_db_session()
        session = UserSession(user_id=user.id)
        db.add(session)
        await self.uow.commit()
        await db.refresh(session)
        return session

    async def get_session(self, session_id: UUID) -> UserSession | None:
        db = await self.uow.get_db_session()
        return await db.get(UserSession, session_id)

    async def delete_session(self, session_id: UUID) -> None:
        db = await self.uow.get_db_session()
        session = await db.get(UserSession, session_id)
        if session:
            await db.delete(session)
            await self.uow.commit()
