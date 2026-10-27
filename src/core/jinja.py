from __future__ import annotations

from typing import Any


def field_value(form: Any, name: str, default: Any = "") -> Any:
    """Valor para repopular o campo `name` do form (`default` quando ausente)."""
    field = _field(form, name)
    if not field:
        return default if default is not None else ""
    value = field.get("value")
    if value is None or value == "":
        return default if default is not None else ""
    return value


def field_error(form: Any, name: str, default: str = "") -> str:
    """Mensagem de erro do campo `name` (`""` quando não há erro)."""
    field = _field(form, name)
    if not field:
        return default
    error = field.get("error")
    return default if not error else str(error)


def field_has_error(form: Any, name: str) -> bool:
    """True se o campo `name` possui erro de validação."""
    field = _field(form, name)
    if not field:
        return False
    return bool(field.get("error"))


def field_checked(form: Any, name: str, default: bool = False) -> bool:
    """True se um checkbox booleano está marcado no `form` ou no `default`."""
    field = _field(form, name)
    if not field:
        return bool(default)
    val = field.get("value")
    if isinstance(val, bool):
        return val
    if isinstance(val, str):
        return val.strip().lower() in ("1", "true", "on", "yes", "sim")
    return bool(val)


def field_in_list(form: Any, name: str, item: Any, default_list: list[Any] | None = None) -> bool:
    """True se `item` está selecionado em um campo multi-valor (`list`) do form."""
    target = str(item)
    field = _field(form, name)
    if field and field.get("value") is not None and field.get("value") != "":
        val = field.get("value")
        if isinstance(val, (list, tuple, set)):
            return target in {str(x) for x in val}
        if isinstance(val, str):
            return target in {x.strip() for x in val.split(",") if x.strip()}
    if default_list:
        return target in {str(x) for x in default_list}
    return False


def _field(form: Any, name: str) -> dict[str, Any] | None:
    if not form:
        return None
    if isinstance(form, dict):
        # Suporta tanto `form = {"campo": ...}` quanto `form = {"form": {"campo": ...}}`
        if "form" in form and isinstance(form["form"], dict) and name not in form:
            field = form["form"].get(name)
        else:
            field = form.get(name)
    else:
        field = getattr(form, name, None)
    return field if isinstance(field, dict) else None


def register_form_globals(env) -> None:
    """Registra os helpers de formulário e macros de form no ambiente Jinja2."""
    env.globals["field_value"] = field_value
    env.globals["field_error"] = field_error
    env.globals["field_has_error"] = field_has_error
    env.globals["field_checked"] = field_checked
    env.globals["field_in_list"] = field_in_list

    _export_template_macros(
        env,
        "macros/forms.html",
        [
            "form_alert",
            "form_field",
            "form_textarea",
            "form_select",
            "form_checkbox",
            "submit_btn",
        ],
    )


def register_list_globals(env) -> None:
    """Registra macros de listagem, softnav e subpages no ambiente Jinja2
    para que funcionem dentro de qualquer bloco ou fragmento HTMX sem precisar reimportar.
    """
    _export_template_macros(
        env,
        "macros/list.html",
        [
            "search_bar",
            "sortable_th",
            "plain_th",
            "empty_state",
            "pagination",
            "footer_info",
            "action_buttons",
        ],
    )
    _export_template_macros(
        env,
        "macros/softnav.html",
        [
            "soft_link",
            "soft_btn",
            "page_header",
        ],
    )
    _export_template_macros(
        env,
        "macros/subpage.html",
        [
            "subpage_nav",
            "subpage_container",
        ],
    )


def _export_template_macros(env, template_name: str, macro_names: list[str]) -> None:
    try:
        tmpl = env.get_template(template_name)
        for name in macro_names:
            if hasattr(tmpl.module, name):
                env.globals[name] = getattr(tmpl.module, name)
    except Exception:
        pass
