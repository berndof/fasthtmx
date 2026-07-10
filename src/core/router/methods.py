def get(path: str):
    def decorator(func):
        # func.__route__ = {"method": "GET", "path": path}
        func.__route__ = ("GET", path)
        return func

    return decorator


def post(path: str):
    def decorator(func):
        # func.__route__ = {"method": "GET", "path": path}
        func.__route__ = ("POST", path)
        return func

    return decorator
