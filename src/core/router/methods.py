def get(path: str):
    def decorator(func):
        # func.__route__ = {"method": "GET", "path": path}
        func.__route__ = ("GET", path)
        return func

    return decorator
