# two base models to split metadata for alembic migrations


from sqlalchemy.orm import DeclarativeBase


class BaseModel(DeclarativeBase):
    __abstract__ = True
    __mapper_args__ = {"eager_defaults": True}

    def __repr__(self) -> str:
        attrs = ", ".join(
            f"{key}={value!r}"
            for key, value in self.__dict__.items()
            if not key.startswith("_")
        )
        return f"<{self.__class__.__name__}({attrs})>"


class BaseSqliteModel(DeclarativeBase):
    __abstract__ = True
    __mapper_args__ = {"eager_defaults": True}

    def __repr__(self) -> str:
        attrs = ", ".join(
            f"{key}={value!r}"
            for key, value in self.__dict__.items()
            if not key.startswith("_")
        )
        return f"<{self.__class__.__name__}({attrs})>"
