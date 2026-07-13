from contextlib import contextmanager
from logging import getLogger

from ldap3 import ALL, Connection, Server, core

from core.settings import (
    LDAP_BASE_DN,
    LDAP_SERVER,
    LDAP_UPN_SUFFIX,
    LDAP_USE_SSL,
    LDAP_BIND_USER,
    LDAP_BIND_PASSWORD,
    LDAP_USER_SEARCH_BASE,
)

logger = getLogger("app.ldap")
logger.setLevel("DEBUG")

def _get_server():
    if not LDAP_SERVER:
        raise RuntimeError("LDAP_SERVER not configured")
    return Server(
        LDAP_SERVER,
        get_info=ALL,
        use_ssl=LDAP_USE_SSL,
        connect_timeout=5,
    )


def _make_upn(username: str) -> str:
    if "@" in username:
        return username
    return f"{username}@{LDAP_UPN_SUFFIX}"


@contextmanager
def _bind(username: str, password: str):
    conn = Connection(
        _get_server(),
        user=_make_upn(username),
        password=password,
        authentication="SIMPLE",
        auto_bind=True,
    )
    try:
        yield conn
    finally:
        conn.unbind()


@contextmanager
def _bind_service():
    with _bind(LDAP_BIND_USER, LDAP_BIND_PASSWORD) as conn:
        yield conn


def authenticate(username: str, password: str) -> bool:
    if not LDAP_SERVER or not username or not password:
        logger.error("LDAP not configured or missing credentials")
        return False
    try:
        with _bind(username, password):
            return True
    except core.exceptions.LDAPBindError:
        return False
    except Exception as e:
        logger.error(f"LDAP auth error for {username}: {e}")
        return False


def get_user_info(username: str) -> dict | None:
    if not LDAP_SERVER or not username:
        logger.error("LDAP not configured or no username provided")
        return None

    search_filter = (
        f"(|(sAMAccountName={username})(userPrincipalName={username}))"
    )
    attributes = [
        "distinguishedName",
        "displayName",
        "mail",
        "memberOf",
        "sAMAccountName",
    ]

    try:
        with _bind_service() as conn:
            search_base = LDAP_USER_SEARCH_BASE or LDAP_BASE_DN
            conn.search(
                search_base=search_base,
                search_filter=search_filter,
                attributes=attributes,
            )

            if not conn.entries:
                logger.warning(f"User {username} not found in AD")
                return None

            entry = conn.entries[0]

            result = {
                "dn": entry.distinguishedName.value,
                "displayName": entry.displayName.value
                if "displayName" in entry
                else None,
                "mail": entry.mail.value if "mail" in entry else None,
                "sAMAccountName": entry.sAMAccountName.value
                if "sAMAccountName" in entry
                else None,
                "memberOf": entry.memberOf.values if "memberOf" in entry else [],
            }

            return result
    except Exception as e:
        logger.error(f"Error fetching LDAP info for {username}: {e}")
        return None


def search_ldap(
    search_base: str | None = None,
    search_filter: str = "(objectClass=*)",
    attributes: list[str] | None = None,
    size_limit: int = 0,
) -> list[dict]:
    if not LDAP_SERVER:
        logger.error("LDAP not configured")
        return []

    _attributes = attributes or [
        "distinguishedName",
        "name",
        "objectClass",
        "ou",
        "cn",
        "sAMAccountName",
        "displayName",
        "mail",
        "description",
    ]

    _search_base = search_base or LDAP_BASE_DN
    if not _search_base:
        logger.error("No search base configured")
        return []

    try:
        with _bind_service() as conn:
            conn.search(
                search_base=_search_base,
                search_filter=search_filter,
                attributes=_attributes,
                size_limit=size_limit,
            )

            results = []
            for entry in conn.entries:
                item = {"dn": str(entry.distinguishedName)}
                for attr in _attributes:
                    if attr == "distinguishedName":
                        continue
                    try:
                        if attr in entry:
                            vals = entry[attr].values
                            item[attr] = list(vals) if len(vals) > 1 else vals[0]
                        else:
                            item[attr] = None
                    except Exception:
                        item[attr] = None
                results.append(item)

            return results
    except Exception as e:
        logger.error(f"Error searching LDAP at {_search_base}: {e}")
        return []
