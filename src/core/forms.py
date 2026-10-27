from __future__ import annotations

import enum
import types
from dataclasses import dataclass
from logging import getLogger
from typing import Any, Callable, Generic, TypeVar, Union, get_args, get_origin

from fastapi import Request
from pydantic import BaseModel, ValidationError

from core.utils.validation import translate_pydantic_error

T = TypeVar("T", bound=BaseModel)
logger = getLogger("app.FORM")


class FormError(Exception):
    """Erro de negócio de um formulário lançado pelo service ou rota.

    - `errors`: mapeamento campo -> mensagem (aparece no input correspondente).
    - `message`: erro global do form (renderizado como alerta no topo).
    """

    def __init__(
        self, errors: dict[str, str] | None = None, message: str | None = None
    ):
        self.errors = errors or {}
        self.message = message
        super().__init__(message or str(errors))


@dataclass
class FormResult(Generic[T]):
    ok: bool
    validated: T | None
    values: dict[str, Any]
    errors: dict[str, str]
    hidden: frozenset[str] = frozenset()
    global_error: str | None = None

    @property
    def data(self) -> T | None:
        return self.validated

    @property
    def failed(self) -> bool:
        return not self.ok

    def add_errors(self, errors: dict[str, str], message: str | None = None) -> "FormResult[T]":
        """Injeta erros de negócio (ex: UniqueViolation) mantendo os valores digitados."""
        self.ok = False
        self.errors.update(errors)
        if message:
            self.global_error = message
        return self

    def fail(self, message: str | None = None, **field_errors: str) -> "FormResult[T]":
        """Atalho fluente para marcar falha de negócio: `form.fail(name='Já existe')`."""
        return self.add_errors(field_errors, message=message)

    @property
    def state(self) -> dict[str, dict[str, dict[str, Any]]]:
        """Contexto pronto para o template: `{"form": {campo: {"value": ..., "error": ...}}}`."""
        fields: dict[str, dict[str, Any]] = {}
        for name in self.values:
            fields[name] = {
                "value": self.values[name],
                "error": self.errors.get(name, ""),
            }
        for name, error in self.errors.items():
            if name not in fields:
                fields[name] = {"value": "", "error": error}
        return {"form": fields}


def _unwrap_annotation(annotation: Any) -> tuple[Any, bool]:
    """Desempacota `Annotated` e `Optional`/`Union[T, None]`.
    Retorna `(base_type, allows_none)`.
    """
    allows_none = False
    origin = get_origin(annotation)

    # Desempacota Annotated[T, ...]
    if origin is not None and getattr(origin, "__name__", "") == "Annotated":
        args = get_args(annotation)
        if args:
            return _unwrap_annotation(args[0])

    if origin in (Union, types.UnionType):
        args = get_args(annotation)
        non_none = [a for a in args if a is not type(None)]
        if len(non_none) < len(args):
            allows_none = True
        if len(non_none) == 1:
            inner_type, _ = _unwrap_annotation(non_none[0])
            return inner_type, allows_none

    return annotation, allows_none


def _is_multi_value_field(annotation: Any) -> bool:
    base_type, _ = _unwrap_annotation(annotation)
    origin = get_origin(base_type) or base_type
    return origin in (list, set, tuple)


def _is_bool_field(annotation: Any) -> bool:
    base_type, _ = _unwrap_annotation(annotation)
    return base_type is bool


def _allows_none_field(field_info: Any) -> bool:
    _, allows_none = _unwrap_annotation(field_info.annotation)
    return allows_none or (not field_info.is_required() and field_info.default is None)


async def parse_form(
    request: Request,
    schema: type[T],
    *,
    hidden: set[str] | list[str] | tuple[str, ...] | None = None,
    decoders: dict[str, Callable[[Any], Any]] | None = None,
) -> FormResult[T]:
    """Resolve `await request.form()` contra um schema Pydantic e devolve `FormResult[T]`.

    Suporta automaticamente:
    - Campos `list[...]` / `set[...]` / `tuple[...]` via `FormData.getlist(key)` ou `getlist(key + "[]")`.
    - Checkboxes booleanos (`False` quando desmarcados/ausentes no FormData).
    - Coerção de strings vazias `"" -> None` para campos opcionais (`T | None`).
    - `hidden`: campos que nunca devem ser repopulados no HTML em caso de erro (ex: `password`).
    - `decoders`: conversores customizados por campo (ex: `{"polygon": json.loads}`).
    """
    data = await request.form()
    payload: dict[str, Any] = {}

    # 1. Coleta todos os pares chave/valor enviados no form
    for key, value in data.multi_items():
        clean_key = key[:-2] if key.endswith("[]") else key
        if clean_key not in payload:
            payload[clean_key] = value

    # 2. Normaliza de acordo com os fields declarados no Schema
    for field_name, field_info in schema.model_fields.items():
        if _is_multi_value_field(field_info.annotation):
            raw_list = data.getlist(field_name) or data.getlist(f"{field_name}[]")
            payload[field_name] = [
                item.strip() if isinstance(item, str) else item
                for item in raw_list
                if item != ""
            ]
        elif _is_bool_field(field_info.annotation):
            if field_name not in payload:
                payload[field_name] = False
            else:
                val = payload[field_name]
                if isinstance(val, str):
                    payload[field_name] = val.strip().lower() in (
                        "1",
                        "true",
                        "on",
                        "yes",
                        "sim",
                    )
        else:
            if field_name in payload:
                val = payload[field_name]
                if isinstance(val, str):
                    val = val.strip()
                    if val == "" and _allows_none_field(field_info):
                        payload[field_name] = None
                    else:
                        payload[field_name] = val

    # 3. Decoders explícitos por campo (quando fornecidos na rota)
    if decoders:
        for name, decode in decoders.items():
            if name in payload and payload[name] is not None:
                payload[name] = decode(payload[name])

    hidden_set = frozenset[str](hidden or ())

    try:
        validated = schema.model_validate(payload)
    except ValidationError as ve:
        logger.debug(ve)
        errors = {
            str(error["loc"][0]): translate_pydantic_error(error)  # pyright: ignore[reportArgumentType]
            for error in ve.errors()
        }
        return FormResult[T](
            ok=False,
            validated=None,
            values=_raw_values(payload, schema, hidden_set),
            errors=errors,
            hidden=hidden_set,
        )

    values = {}
    for name in schema.model_fields:
        if name in hidden_set:
            continue
        values[name] = _serialize(getattr(validated, name, None))

    return FormResult[T](
        ok=True, validated=validated, values=values, errors={}, hidden=hidden_set
    )


def _raw_values(
    payload: dict[str, Any], schema: type[T], hidden_set: frozenset[str]
) -> dict[str, Any]:
    return {
        name: _serialize(payload.get(name, ""))
        for name in schema.model_fields
        if name not in hidden_set
    }


def _serialize(value: Any) -> Any:
    if value is None:
        return ""
    if isinstance(value, bool):
        return value
    if isinstance(value, enum.Enum):
        return value.value
    if isinstance(value, (list, tuple, set)):
        return [
            item.value if isinstance(item, enum.Enum) else str(item)
            for item in value
        ]
    return str(value)
