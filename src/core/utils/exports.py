import importlib
import inspect
import pkgutil
import sys
from logging import getLogger

logger = getLogger("core.exports")

DEFAULT_PARTS = ("models", "schemas", "services", "deps", "middlewares", "routes")


def _defined_members(module) -> dict[str, object]:
    """Nomes públicos definidos no próprio arquivo (classes/funções; enums entram como classes)."""
    return {
        name: obj
        for name, obj in vars(module).items()
        if not name.startswith("_")
        and getattr(obj, "__module__", None) == module.__name__
        and (inspect.isclass(obj) or inspect.isfunction(obj))
    }


def publish(package_name: str) -> list[str]:
    """Funnel: expõe no __init__ os membros públicos dos arquivos irmãos.

    Regra por arquivo:
      - se declara ``__all__``, só esses nomes são expostos;
      - senão, tudo definido nele (classes/funções públicas, sem ``_``).

    Uso::

        from core.utils.exports import publish
        __all__ = publish(__name__)
    """
    package = sys.modules[package_name]
    exports: dict[str, object] = {}

    for info in pkgutil.iter_modules(package.__path__):
        if info.name.startswith("_"):
            continue

        submodule = importlib.import_module(f"{package_name}.{info.name}")

        explicit = getattr(submodule, "__all__", None)
        members = (
            {name: getattr(submodule, name) for name in explicit}
            if explicit is not None
            else _defined_members(submodule)
        )

        for name, obj in members.items():
            if name in exports:
                logger.warning("export duplicado %r em %s", name, package_name)
            exports[name] = obj

    package.__dict__.update(exports)
    return list(exports)


def publish_and_collect(package_name: str) -> dict[str, object]:
    """Igual a :func:`publish`, mas retorna o dicionário de exports (sem mexer em ``__all__``)."""
    package = sys.modules[package_name]
    exports: dict[str, object] = {}

    for info in pkgutil.iter_modules(package.__path__):
        if info.name.startswith("_"):
            continue

        submodule = importlib.import_module(f"{package_name}.{info.name}")

        explicit = getattr(submodule, "__all__", None)
        members = (
            {name: getattr(submodule, name) for name in explicit}
            if explicit is not None
            else _defined_members(submodule)
        )

        for name, obj in members.items():
            if name in exports:
                logger.warning("export duplicado %r em %s", name, package_name)
            exports[name] = obj

    return exports


def publish_parts(package_name: str, parts: tuple[str, ...] = DEFAULT_PARTS) -> list[str]:
    """Expõe no __init__ do módulo os subpacotes existentes como atributos.

    Apenas os subpacotes presentes são anexados (``ModuleNotFoundError`` é ignorado).

    Uso::

        from core.utils.exports import publish_parts
        __all__ = publish_parts(__name__)
    """
    package = sys.modules[package_name]
    attached: list[str] = []

    for part in parts:
        try:
            sub = importlib.import_module(f"{package_name}.{part}")
        except ModuleNotFoundError:
            continue

        setattr(package, part, sub)
        attached.append(part)

    return attached
