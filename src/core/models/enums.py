import enum


class Recorrencia(str, enum.Enum):
    UNICA = "Única"
    DIARIA = "Diaria"
    MENSAL = "Mensal"
    ANUAL = "Anual"


class EntidadeTipo(str, enum.Enum):
    CONTRATO = "contrato"
    TORRE = "torre"
    TERRENO = "terreno"
    CLIENTE = "cliente"
