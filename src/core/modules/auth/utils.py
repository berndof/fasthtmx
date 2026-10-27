from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

from core.settings import JWT_EXPIRE_MINUTES, JWT_EXPIRE_MINUTES_REFRESH

from .schemas import (
    AccessTokenPayload,
    EncodedTokenPair,
    RefreshTokenPayload,
)
from .security import decode_token, encode_token

ACCESS_COOKIE = "access-token"
REFRESH_COOKIE = "refresh-token"
COOKIE_PATH = "/"


@dataclass
class TokenPairResult:
    pair: EncodedTokenPair
    jti: str
    refresh_exp_ts: int


def issue_token_pair(user_id: UUID, *, jti: str | None = None) -> TokenPairResult:
    """Emite o par access (15min) + refresh (7d) com mesma `jti` (id da sessão)."""
    user_id = UUID(str(user_id))
    jti = jti or uuid4().hex
    now = datetime.now(timezone.utc)
    exp_access = int((now + timedelta(minutes=JWT_EXPIRE_MINUTES)).timestamp())
    exp_refresh = int((now + timedelta(minutes=JWT_EXPIRE_MINUTES_REFRESH)).timestamp())

    access_token = encode_token(
        AccessTokenPayload.model_validate(
            {"sub": user_id, "exp": exp_access, "jti": jti}
        )
    )
    refresh_token = encode_token(
        RefreshTokenPayload.model_validate(
            {"sub": user_id, "exp": exp_refresh, "jti": jti}
        )
    )

    return TokenPairResult(
        pair=EncodedTokenPair.model_validate(
            {"access_token": access_token, "refresh_token": refresh_token}
        ),
        jti=jti,
        refresh_exp_ts=exp_refresh,
    )


def issue_access_token(user_id: UUID, jti: str) -> str:
    """Emite um access novo reutilizando a sessão (sem rotação do refresh)."""
    user_id = UUID(str(user_id))
    now = datetime.now(timezone.utc)
    exp_access = int((now + timedelta(minutes=JWT_EXPIRE_MINUTES)).timestamp())
    return encode_token(
        AccessTokenPayload.model_validate(
            {"sub": user_id, "exp": exp_access, "jti": jti}
        )
    )


def resolve_access_token(token: str | None) -> AccessTokenPayload | None:
    """Decodifica o access token, retornando o payload apenas se for access e válido."""
    if not token:
        return None
    try:
        payload = decode_token(token)
    except Exception:
        return None
    if isinstance(payload, AccessTokenPayload):
        return payload
    return None


def decode_refresh_token(token: str | None) -> RefreshTokenPayload | None:
    """Decodifica o refresh token, retornando o payload apenas se for refresh e válido."""
    if not token:
        return None
    try:
        payload = decode_token(token)
    except Exception:
        return None
    if isinstance(payload, RefreshTokenPayload):
        return payload
    return None


def is_refresh_expired(payload: RefreshTokenPayload) -> bool:
    now_ts = int(datetime.now(timezone.utc).timestamp())
    return payload.exp < now_ts


def set_auth_cookies(response, pair: EncodedTokenPair) -> None:
    response.set_cookie(
        key=ACCESS_COOKIE,
        value=pair.access_token,
        path=COOKIE_PATH,
        httponly=True,
        samesite="lax",
    )
    response.set_cookie(
        key=REFRESH_COOKIE,
        value=pair.refresh_token,
        path=COOKIE_PATH,
        httponly=True,
        samesite="lax",
    )


def delete_auth_cookies(response) -> None:
    response.delete_cookie(ACCESS_COOKIE, path=COOKIE_PATH)
    response.delete_cookie(REFRESH_COOKIE, path=COOKIE_PATH)
