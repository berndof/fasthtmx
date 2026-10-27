import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

from .log import LOG_CONFIG  # noqa: F401

BASE_DIR = Path(__file__).parent.parent

APP_NAME: str = os.environ.get("APP_NAME", "FastHTMX")
APP_ENV: str = os.environ.get("APP_ENV", "dev").lower()
DEBUG: bool = os.environ.get("DEBUG", "true" if APP_ENV == "dev" else "false").lower() in (
    "true",
    "1",
    "yes",
)

APP_LISTEN_ADDR: str = os.environ.get("APP_LISTEN_ADDR", "0.0.0.0")
APP_LISTEN_PORT: str = os.environ.get("APP_LISTEN_PORT", "8000")
APP_BASE_URL: str = os.environ.get("APP_BASE_URL", f"http://localhost:{APP_LISTEN_PORT}")

GUEST_SESSIONS_ENABLED: bool = os.environ.get("GUEST_SESSIONS_ENABLED", "false").lower() in (
    "true",
    "1",
    "yes",
)

LDAP_AUTH: bool = os.environ.get("LDAP_AUTH", "false").lower() in ("true", "1", "yes")
LDAP_BASE_DN: str = os.environ.get("LDAP_BASE_DN", "")
LDAP_BIND_PASSWORD: str = os.environ.get("LDAP_BIND_PASSWORD", "")
LDAP_BIND_USER: str = os.environ.get("LDAP_BIND_USER", "")
LDAP_SERVER: str = os.environ.get("LDAP_SERVER", "")
LDAP_USE_SSL: bool = os.environ.get("LDAP_USE_SSL", "true").lower() in ("true", "1", "yes")
LDAP_UPN_SUFFIX: str = os.environ.get("LDAP_UPN_SUFFIX", "")
LDAP_USER_SEARCH_BASE: str = os.environ.get("LDAP_USER_SEARCH_BASE", LDAP_BASE_DN)
LDAP_ENABLED: bool = LDAP_AUTH or (bool(LDAP_SERVER) and bool(LDAP_BIND_USER))
LDAP_LOCAL_ROOT_USERS: list[str] = [
    u.strip()
    for u in os.environ.get("LDAP_LOCAL_ROOT_USERS", "root,admin").split(",")
    if u.strip()
]

DB_ENGINE = os.environ.get("DB_ENGINE", "sqlite").lower()

POSTGRES_USER = os.environ.get("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD", "postgres")
POSTGRES_DATABASE = os.environ.get("POSTGRES_DB", "fasthtmx")
POSTGRES_PORT = int(os.environ.get("POSTGRES_PORT", "5432"))
POSTGRES_HOST = os.environ.get("POSTGRES_HOST", "localhost")

POSTGRES_DB_URL = (
    f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}"
    f"@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"
)

SQLITE_DB_DIR = BASE_DIR.parent / "data"
SQLITE_DB_PATH = SQLITE_DB_DIR / "db.sqlite"
SQLITE_DB_URL = f"sqlite+aiosqlite:///{SQLITE_DB_PATH}"

SQLITE_DB_DIR.mkdir(parents=True, exist_ok=True)

_CUSTOM_DB_URL = os.environ.get("DATABASE_URL")
if _CUSTOM_DB_URL:
    DB_URL = _CUSTOM_DB_URL
elif DB_ENGINE == "sqlite":
    DB_URL = SQLITE_DB_URL
else:
    DB_URL = POSTGRES_DB_URL

REDIS_ENABLED = os.environ.get(
    "REDIS_ENABLED",
    "false" if DB_ENGINE == "sqlite" else "true",
).lower() in ("true", "1", "yes")

REDIS_HOST = os.environ.get("REDIS_HOST", "127.0.0.1")
REDIS_PORT = int(os.environ.get("REDIS_PORT", "6379"))
REDIS_DB = int(os.environ.get("REDIS_DB", "0"))
REDIS_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}"

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-in-production-32b")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "15"))
JWT_EXPIRE_MINUTES_REFRESH = int(os.getenv("JWT_EXPIRE_MINUTES_REFRESH", str(60 * 24 * 7)))

UPLOADS_DIR = Path(os.environ.get("UPLOADS_DIR", str(BASE_DIR / "uploads")))
ALLOWED_EXTENSIONS = {".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg", ".webp"}
MAX_SIZE_MB = int(os.environ.get("MAX_SIZE_MB", str(20 * 1024 * 1024)))  # 20MB
MAX_MATERIAL_SIZE_MB = int(os.environ.get("MAX_MATERIAL_SIZE_MB", str(500 * 1024 * 1024)))  # 500MB

SMTP_HOST: str = os.environ.get("SMTP_HOST", "localhost")
SMTP_PORT: int = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER: str = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD: str = os.environ.get("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL: str = os.environ.get("SMTP_FROM_EMAIL", "noreply@scc.com.br")
SMTP_FROM_NAME: str = os.environ.get("SMTP_FROM_NAME", APP_NAME)
SMTP_USE_TLS: bool = os.environ.get("SMTP_USE_TLS", "true").lower() in ("true", "1", "yes")

PIN_TTL_MINUTES = int(os.getenv("PIN_TTL_MINUTES", "5"))

SKIP_CREATION_VERIFY = True
SKIP_REGISTRATION_VERIFY = False

UPLOADS_DIR.mkdir(parents=True, mode=0o755, exist_ok=True)
