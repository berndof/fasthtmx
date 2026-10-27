from typing import Any
from fastapi.datastructures import FormData

GENERIC_TYPE_TRANSLATIONS: dict[str, str] = {
    "missing": "Campo obrigatório",
    "string_too_short": "Deve ter no mínimo {min_length} caracteres",
    "string_too_long": "Deve ter no máximo {max_length} caracteres",
    "string_pattern_mismatch": "Formato inválido",
    "int_parsing": "Deve ser um número inteiro válido",
    "float_parsing": "Deve ser um número válido",
    "decimal_parsing": "Valor numérico ou monetário inválido",
    "greater_than": "Deve ser maior que {gt}",
    "greater_than_equal": "Deve ser maior ou igual a {ge}",
    "less_than": "Deve ser menor que {lt}",
    "less_than_equal": "Deve ser menor ou igual a {le}",
    "bool_parsing": "Valor booleano inválido",
    "date_parsing": "Data inválida",
    "date_from_datetime_parsing": "Data inválida",
    "datetime_parsing": "Data/hora inválida",
    "uuid_parsing": "Identificador inválido",
    "uuid_type": "Identificador inválido",
    "enum": "Opção inválida",
}

ERROR_TRANSLATIONS: dict[str, dict[str, str]] = {
    "email": {
        "value_error": "Formato de e-mail inválido",
        "missing": "E-mail é obrigatório",
    },
    "username": {
        "string_too_short": "Deve ter no mínimo {min_length} caracteres",
        "string_too_long": "Deve ter no máximo {max_length} caracteres",
        "string_pattern_mismatch": "Use apenas letras, números e underlines",
        "missing": "Usuário é obrigatório",
    },
    "first_name": {
        "string_too_short": "Deve ter no mínimo {min_length} caracteres",
        "missing": "Nome é obrigatório",
    },
    "last_name": {
        "string_too_short": "Deve ter no mínimo {min_length} caracteres",
        "missing": "Sobrenome é obrigatório",
    },
    "name": {
        "string_too_long": "Deve ter no máximo {max_length} caracteres",
        "missing": "Nome é obrigatório",
    },
    "cpf": {
        "string_too_short": "CPF deve ter 11 dígitos",
        "string_pattern_mismatch": "Formato de CPF inválido",
        "missing": "CPF é obrigatório",
    },
    "cnpj": {
        "string_too_short": "CNPJ deve ter 14 dígitos",
        "string_pattern_mismatch": "Formato de CNPJ inválido",
        "missing": "CNPJ é obrigatório",
    },
}


def build_form_context(data: FormData, fields: list[str]) -> dict:
    return {"form": {f: {"value": data.get(f, "")} for f in fields}}


def translate_pydantic_error(error: dict[str, Any]) -> str:
    loc = error.get("loc") or ("",)
    field = str(loc[0])
    error_type = error.get("type", "")
    ctx = error.get("ctx", {}) or {}
    raw_msg = str(error.get("msg", "Valor inválido"))

    # 1. Mensagem específica para o campo
    field_msgs = ERROR_TRANSLATIONS.get(field, {})
    if error_type in field_msgs:
        template = field_msgs[error_type]
        try:
            return template.format(**ctx)
        except Exception:
            return template

    # 2. Se for ValueError customizado do schema, limpa o prefixo "Value error, " do Pydantic v2
    if error_type == "value_error" and raw_msg.startswith("Value error, "):
        return raw_msg.removeprefix("Value error, ")

    # 3. Tradução genérica por tipo de erro do Pydantic
    if error_type in GENERIC_TYPE_TRANSLATIONS:
        template = GENERIC_TYPE_TRANSLATIONS[error_type]
        try:
            return template.format(**ctx)
        except Exception:
            return template

    return raw_msg.removeprefix("Value error, ")
