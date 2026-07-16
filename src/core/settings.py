from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).parent.parent


APP_LISTEN_ADDR = "0.0.0.0"
APP_LISTEN_PORT = 8090

SQLITE_PATH = BASE_DIR / "data/sqlite.db"
SQLITE_DB_URL = "sqlite+aiosqlite:///%s" % SQLITE_PATH

GUEST_SESSIONS_ENABLED = (
    os.environ.get("GUEST_SESSIONS_ENABLED", "true").lower() == "true"
)

POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
POSTGRES_DATABASE = os.environ.get("POSTGRES_DB")
POSTGRES_PORT = int(os.environ.get("POSTGRES_PORT", "5432"))
POSTGRES_HOST = os.environ.get("POSTGRES_HOST", "localhost")
POSTGRES_DB_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DATABASE}"

DATABASE_URL = os.environ.get("DATABASE_URL") or POSTGRES_DB_URL

LDAP_SERVER = os.environ.get("LDAP_SERVER")
LDAP_BASE_DN = os.environ.get("LDAP_BASE_DN")
LDAP_UPN_SUFFIX = os.environ.get("LDAP_UPN_SUFFIX")
LDAP_USE_SSL = os.environ.get("LDAP_USE_SSL", "true").lower() == "true"
LDAP_BIND_USER = os.environ.get("LDAP_BIND_USER")
LDAP_BIND_PASSWORD = os.environ.get("LDAP_BIND_PASSWORD")
LDAP_USER_SEARCH_BASE = os.environ.get("LDAP_USER_SEARCH_BASE")
LDAP_ENABLED = bool(LDAP_SERVER) and bool(LDAP_BIND_USER)
LDAP_LOCAL_ROOT_USERS = [
    u.strip()
    for u in os.environ.get("LDAP_LOCAL_ROOT_USERS", "root,admin").split(",")
    if u.strip()
]
