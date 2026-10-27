"""Constantes do módulo de tema — cookie como fonte da verdade SSR."""

COOKIE_NAME = "theme"
DEFAULT_THEME = "arctic-light"
DEFAULT_DARK_THEME = "arctic-dark"
COOKIE_MAX_AGE = 60 * 60 * 24 * 365  # 1 ano

ALLOWED_THEMES: tuple[str, ...] = (
    "arctic-light",
    "arctic-dark",
    "emerald-light",
    "emerald-dark",
    "sunset-light",
    "sunset-dark",
    "midnight-light",
    "midnight-dark",
)

# para validação rápida
ALLOWED_SET = set(ALLOWED_THEMES)


def is_valid_theme(value: str | None) -> bool:
    return value in ALLOWED_SET


def is_dark_theme(theme: str) -> bool:
    return theme.endswith("-dark")
