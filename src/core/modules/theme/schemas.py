from typing import Literal

from pydantic import BaseModel

from .constants import ALLOWED_THEMES

ThemeLiteral = Literal[
    "arctic-light",
    "arctic-dark",
    "emerald-light",
    "emerald-dark",
    "sunset-light",
    "sunset-dark",
    "midnight-light",
    "midnight-dark",
]


class ThemeIn(BaseModel):
    theme: ThemeLiteral
