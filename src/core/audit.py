import enum
from datetime import date, datetime
from decimal import Decimal
from uuid import UUID

from core.modules.user.models.audit_log import AuditLog


def serialize_value(value):
    """Serializes any model attribute into a JSON-safe value."""
    if value is None:
        return None
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    if isinstance(value, UUID):
        return str(value)
    if isinstance(value, Decimal):
        return float(value)
    if isinstance(value, enum.Enum):
        return value.value
    if isinstance(value, dict):
        return {k: serialize_value(v) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [serialize_value(v) for v in value]
    return value


SENSITIVE_FIELDS = {"password"}


def build_create_changes(payload: dict) -> dict:
    """Builds the changes dict for a CREATE action (old=null, new=value)."""
    return {
        key: {"old": None, "new": serialize_value(value)}
        for key, value in payload.items()
        if key not in {"id", "created_at", "updated_at"}
        and key not in SENSITIVE_FIELDS
        and value is not None
    }


def build_update_changes(obj, data: dict) -> dict:
    """Builds the changes dict for an UPDATE action (diff per field)."""
    changes = {}
    for key, new_value in data.items():
        if not hasattr(obj, key) or key in SENSITIVE_FIELDS:
            continue
        old_value = getattr(obj, key)
        old_s = serialize_value(old_value)
        new_s = serialize_value(new_value)
        if old_s != new_s:
            changes[key] = {"old": old_s, "new": new_s}
    return changes


def create_audit_entry(
    entity_type: str,
    entity_id,
    action: str,
    changes: dict | None = None,
    user_id: UUID | None = None,
) -> AuditLog:
    return AuditLog(
        user_id=user_id,
        entity_type=entity_type,
        entity_id=str(entity_id),
        action=action,
        changes=changes,
    )
