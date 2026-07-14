"""add icon_url and is_external

Revision ID: ca16e5a3cc90
Revises: 7f42b0a82d42
Create Date: 2026-07-14 11:13:01.707992

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ca16e5a3cc90'
down_revision: Union[str, Sequence[str], None] = '7f42b0a82d42'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('quick_access_item', sa.Column('icon_url', sa.String(length=500), nullable=True))
    op.add_column(
        'quick_access_item',
        sa.Column('is_external', sa.Boolean(), nullable=True, server_default=sa.text('false')),
    )
    op.execute('UPDATE quick_access_item SET is_external = false WHERE is_external IS NULL')
    op.alter_column('quick_access_item', 'is_external', nullable=False, server_default=None)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('quick_access_item', 'is_external')
    op.drop_column('quick_access_item', 'icon_url')
