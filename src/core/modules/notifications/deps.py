from __future__ import annotations

import uuid

from fastapi import Cookie, Request, Response

from .notifier import notifier, Notifier


def get_notifier() -> Notifier:
    return notifier


GUEST_COOKIE_NAME = "guest_id"
GUEST_MAX_AGE = 60 * 60 * 24 * 365  # 1 ano


def get_guest_id(
    request: Request,
    response: Response,
    guest_id: str | None = Cookie(default=None, alias=GUEST_COOKIE_NAME),
) -> str:
    if guest_id:
        return guest_id
    new_id = uuid.uuid4().hex
    response.set_cookie(
        key=GUEST_COOKIE_NAME,
        value=new_id,
        max_age=GUEST_MAX_AGE,
        path="/",
        httponly=True,
    )
    return new_id
