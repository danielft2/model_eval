"""remove unique constraint of table human question

Revision ID: a03e4afd3088
Revises: 103d70dbc051
Create Date: 2025-02-04 16:03:22.264775

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a03e4afd3088'
down_revision: Union[str, None] = '103d70dbc051'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('uq_evaluation_id_command', 'human_evaluation_questions', type_='unique')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('uq_evaluation_id_command', 'human_evaluation_questions', ['evaluation_id', 'command'])
    # ### end Alembic commands ###
