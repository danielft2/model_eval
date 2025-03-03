"""add cascade on table question result

Revision ID: 6e4d6586b761
Revises: feaa8d4589dd
Create Date: 2025-01-16 08:58:20.979918

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6e4d6586b761'
down_revision: Union[str, None] = 'feaa8d4589dd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('human_evaluation_questions_results_question_id_fkey', 'human_evaluation_questions_results', type_='foreignkey')
    op.create_foreign_key(None, 'human_evaluation_questions_results', 'human_evaluation_questions', ['question_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'human_evaluation_questions_results', type_='foreignkey')
    op.create_foreign_key('human_evaluation_questions_results_question_id_fkey', 'human_evaluation_questions_results', 'human_evaluation_questions', ['question_id'], ['id'])
    # ### end Alembic commands ###
