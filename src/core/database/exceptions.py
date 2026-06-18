class UniqueViolation(Exception):
    def __init__(self, model: BaseSQLModel, key: str, value: Any):
        self.model: BaseSQLModel = model
        self.key: str = key
        self.value: Any = value

    @property
    def message(self):
        return f"O campo '{self.key}' com valor '{self.value}' já existe."

    @property
    def display(self):
        return f"{self.value} já existe."


class ObjectNotFound(Exception):
    def __init__(self, model: BaseSQLModel):
        self.model: BaseSQLModel = model
