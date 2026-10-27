from __future__ import annotations

import re
from decimal import Decimal, InvalidOperation
from typing import Annotated, Any

from pydantic import BaseModel, BeforeValidator, ConfigDict


def _empty_to_none(v: Any) -> Any:
    if isinstance(v, str):
        stripped = v.strip()
        return None if stripped == "" else stripped
    return v


def _strip_non_digits(v: Any) -> Any:
    if v is None:
        return ""
    if isinstance(v, str):
        return re.sub(r"\D+", "", v)
    return str(v)


def _strip_optional_non_digits(v: Any) -> Any:
    if v is None:
        return None
    if isinstance(v, str):
        digits = re.sub(r"\D+", "", v)
        return digits if digits else None
    return str(v)


def _parse_brl_decimal(v: Any) -> Decimal:
    if isinstance(v, Decimal):
        return v
    if isinstance(v, (int, float)):
        return Decimal(str(v))
    if isinstance(v, str):
        cleaned = re.sub(r"[R$\s]", "", v.strip())
        if not cleaned:
            raise ValueError("Informe um valor numérico")
        if "," in cleaned and "." in cleaned:
            cleaned = cleaned.replace(".", "").replace(",", ".")
        elif "," in cleaned:
            cleaned = cleaned.replace(",", ".")
        try:
            return Decimal(cleaned)
        except InvalidOperation as e:
            raise ValueError("Valor monetário inválido") from e
    raise ValueError("Valor monetário inválido")


def _parse_optional_brl_decimal(v: Any) -> Decimal | None:
    if v is None:
        return None
    if isinstance(v, str) and not v.strip():
        return None
    return _parse_brl_decimal(v)


def _parse_html_checkbox(v: Any) -> bool:
    if isinstance(v, bool):
        return v
    if v is None:
        return False
    if isinstance(v, (int, float)):
        return bool(v)
    if isinstance(v, str):
        return v.strip().lower() in ("1", "true", "on", "yes", "sim")
    return False


# Tipos anotados explícitos para formulários HTML / pt-BR
OptionalStr = Annotated[str | None, BeforeValidator(_empty_to_none)]
BRLDecimal = Annotated[Decimal, BeforeValidator(_parse_brl_decimal)]
OptionalBRLDecimal = Annotated[Decimal | None, BeforeValidator(_parse_optional_brl_decimal)]
CleanDigits = Annotated[str, BeforeValidator(_strip_non_digits)]
OptionalCleanDigits = Annotated[str | None, BeforeValidator(_strip_optional_non_digits)]
HtmlCheckbox = Annotated[bool, BeforeValidator(_parse_html_checkbox)]


class BaseSchema(BaseModel):
    pass


class FormSchema(BaseSchema):
    """Schema base para formulários HTML recebidos via `parse_form(request, Schema)`."""

    model_config = ConfigDict(str_strip_whitespace=True)


class ModelSchema(BaseSchema):
    model_config = ConfigDict(from_attributes=True)
