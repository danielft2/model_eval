"""add relationship bidectional in evaluation and question

Revision ID: 373103cdf9b9
Revises: b90568574224
Create Date: 2025-01-14 16:33:27.605938

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '373103cdf9b9'
down_revision: Union[str, None] = 'b90568574224'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
