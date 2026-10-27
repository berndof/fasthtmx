from decimal import Decimal

from pydantic import Field

from core.schema import BRLDecimal, FormSchema, HtmlCheckbox, OptionalStr


class ProjetoForm(FormSchema):
    codigo: str = Field(..., min_length=2, max_length=30)
    nome: str = Field(..., min_length=3, max_length=140)
    categoria: str = Field(default="Infraestrutura", min_length=2, max_length=60)
    orcamento: BRLDecimal = Field(default=Decimal("0.00"), ge=Decimal("0.00"))
    prioritario: HtmlCheckbox = False
    tags: list[str] = Field(default_factory=list)
    descricao: OptionalStr = None


class TarefaForm(FormSchema):
    titulo: str = Field(..., min_length=2, max_length=160)
    responsavel: str = Field(default="Equipe Core", min_length=2, max_length=80)
