from core.services import AbstractModelService

from ..models import Aviso


class AvisoService(AbstractModelService[Aviso]):
    model = Aviso
