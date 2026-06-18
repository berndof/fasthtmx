# https://plainenglish.io/python/better-python-singleton-with-a-metaclass


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            # instance does not exists, so we create one
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        else:
            instance = cls._instances[cls]

            #
            if hasattr(cls, "__allow_reinit") and cls.__allow_reinit:  # pyright: ignore[reportAttributeAccessIssue]
                # if the class allows reinitializition do it
                instance.__init__(*args, **kwargs)
        return instance
