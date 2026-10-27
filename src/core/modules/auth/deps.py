import logging
from uuid import UUID

from fastapi import Depends, HTTPException, Request, Security

from core.database import ObjectNotFound
from core.deps.db import get_db
from core.modules.user.services import UserService
from core.user_context import set_current_user_id

from .schemas import AccessTokenPayload, UserSession
from .security import access_cookie, decode_token
from .services import AuthService

logger = logging.getLogger("app.dep.auth")


async def get_current_user(
    request: Request,
    cookie_token=Security(access_cookie),
    dbSession=Depends(get_db),
) -> UserSession:
    """Resolve `UserSession`, popula `request.state.current_user` para os templates,
    ou levanta `HTTPException(401)`.
    """
    cached_user = getattr(request.state, "current_user", None)
    if cached_user is not None:
        return cached_user

    payload = getattr(request.state, "user_payload", None)

    if payload is None:
        if not cookie_token:
            raise HTTPException(401, "Não autenticado")
        try:
            payload = decode_token(cookie_token)
        except Exception:
            raise HTTPException(401, "Token inválido")
        if not isinstance(payload, AccessTokenPayload):
            raise HTTPException(401, "Token inválido")

    auth_service = AuthService(dbSession)
    session = await auth_service.get_active_session(payload.jti)
    if session is None:
        raise HTTPException(401, "Sessão expirada ou revogada")
    await auth_service.touch_last_seen(payload.jti, session=session)

    user_service = UserService(dbSession)
    try:
        user = await user_service.get_one_by(id=UUID(payload.sub))
    except ObjectNotFound:
        raise HTTPException(401, "Usuário não encontrado")

    if not user:
        raise HTTPException(401, "Usuário não existe")

    user_data = UserSession(
        id=user.id,
        username=user.username,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        name=user.name,
        groups=[g.name for g in user.groups],
        is_admin=user.is_admin,
    )

    set_current_user_id(user_data.id)
    request.state.current_user = user_data
    return user_data


async def get_optional_user(
    request: Request,
    cookie_token=Security(access_cookie),
    dbSession=Depends(get_db),
) -> UserSession | None:
    """Resolve `UserSession` silenciosamente se houver cookie/token válido, sem levantar 401."""
    cached_user = getattr(request.state, "current_user", None)
    if cached_user is not None:
        return cached_user

    payload = getattr(request.state, "user_payload", None)
    if payload is None and not cookie_token:
        return None

    try:
        return await get_current_user(request, cookie_token=cookie_token, dbSession=dbSession)
    except HTTPException:
        return None


class PermissionVerify:
    def __init__(self, required_groups: list[str]):
        self.required_groups = required_groups

    def __call__(self, user: UserSession = Depends(get_current_user)):
        user_groups = set[str](user.groups)
        if "root" in user_groups or "admin" in user_groups:
            return user

        required_set = set[str](self.required_groups)
        if not required_set.intersection(user_groups):
            raise HTTPException(403, "Sem permissão")

        return user
