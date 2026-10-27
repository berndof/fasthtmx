from decimal import Decimal

from jinja2 import nodes
from jinja2.ext import Extension


class CommentExtension(Extension):
    tags = {"comment"}

    def parse(self, parser):
        lineno = next(parser.stream).lineno

        parser.parse_statements(["name:endcomment"], drop_needle=True)  # pyright: ignore[reportArgumentType]

        return nodes.Const("").set_lineno(lineno)


def brl(value) -> str:
    if value is None:
        return "R$ 0,00"
    if isinstance(value, Decimal):
        value = float(value)
    if isinstance(value, (int, float)):
        return f"R$ {value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return str(value)
