from datetime import datetime, timedelta, timezone
from uuid import UUID

from sqlalchemy import or_, select, update

from core.forms import FormError
from core.services import AbstractBaseService

from ..user.models.user import User
from .models.auth_session import AuthSession
from .schemas import UserAuthForm
from .security import verify_password_async
from .utils import TokenPairResult, issue_token_pair

TOUCH_THROTTLE_SECONDS = 300  # Atualiza last_seen_at no máximo a cada 5 minutos


class AuthService(AbstractBaseService):
    model = AuthSession

    async def login(
        self,
        data: UserAuthForm,
        user_agent: str | None = None,
        ip: str | None = None,
    ) -> TokenPairResult:
        ident = data.identifier
        stmt = select(User).where(or_(User.email == ident, User.username == ident))
        user = (await self.dbSession.execute(stmt)).scalar_one_or_none()

        if user is None or not await verify_password_async(data.password, user.password):
            raise FormError(message="Credenciais inválidas")

        return await self.create_session_for_user(
            user.id, user_agent=user_agent, ip=ip
        )

    async def create_session_for_user(
        self,
        user_id: UUID,
        user_agent: str | None = None,
        ip: str | None = None,
    ) -> TokenPairResult:
        result = issue_token_pair(user_id)

        session = AuthSession(
            id=UUID(result.jti),
            user_id=user_id,
            user_agent=(user_agent or "")[:255] or None,
            ip=ip,
            expires_at=datetime.fromtimestamp(result.refresh_exp_ts, tz=timezone.utc),
        )
        self.dbSession.add(session)
        await self.dbSession.commit()

        return result

    async def get_active_session(self, jti: str) -> AuthSession | None:
        """Retorna a sessão se não revogada e não expirada."""
        stmt = select(AuthSession).where(AuthSession.id == UUID(jti))
        session = (await self.dbSession.execute(stmt)).scalar_one_or_none()
        if session is None:
            return None
        if session.revoked_at is not None:
            return None
        if session.expires_at.tzinfo is None:
            session.expires_at = session.expires_at.replace(tzinfo=timezone.utc)
        if session.expires_at.replace(tzinfo=timezone.utc) <= datetime.now(
            timezone.utc
        ):
            return None

        return session

    async def touch_last_seen(
        self, jti: str, session: AuthSession | None = None
    ) -> None:
        now = datetime.now(timezone.utc)
        if session is not None and session.last_seen_at is not None:
            last_seen = session.last_seen_at
            if last_seen.tzinfo is None:
                last_seen = last_seen.replace(tzinfo=timezone.utc)
            if (now - last_seen) < timedelta(seconds=TOUCH_THROTTLE_SECONDS):
                return

        await self.dbSession.execute(
            update(AuthSession)
            .where(AuthSession.id == UUID(jti))
            .values(last_seen_at=now)
        )
        await self.dbSession.commit()

    async def revoke_session(self, jti: str, user_id: UUID | None = None) -> None:
        stmt = update(AuthSession).where(AuthSession.id == UUID(jti))
        if user_id is not None:
            stmt = stmt.where(AuthSession.user_id == user_id)
        await self.dbSession.execute(stmt.values(revoked_at=datetime.now(timezone.utc)))
        await self.dbSession.commit()

    async def revoke_user_sessions(self, user_id: UUID) -> int:
        res = await self.dbSession.execute(
            update(AuthSession)
            .where(
                AuthSession.user_id == user_id,
                AuthSession.revoked_at.is_(None),
            )
            .values(revoked_at=datetime.now(timezone.utc))
        )
        await self.dbSession.commit()
        return getattr(res, "rowcount", 0)

    async def list_user_sessions(self, user_id: UUID) -> list[AuthSession]:
        stmt = (
            select(AuthSession)
            .where(AuthSession.user_id == user_id)
            .order_by(
                AuthSession.revoked_at.asc().nulls_last(), AuthSession.created_at.desc()
            )
        )
        return list((await self.dbSession.execute(stmt)).scalars().all())
