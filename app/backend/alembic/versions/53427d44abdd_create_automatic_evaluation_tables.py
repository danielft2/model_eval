"""create automatic evaluation tables

Revision ID: 53427d44abdd
Revises: 4ca903ca5a50
Create Date: 2024-12-25 15:51:25.348942

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '53427d44abdd'
down_revision: Union[str, None] = '4ca903ca5a50'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('evaluation_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tasks_types',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('metrics',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('evaluation_type_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['evaluation_type_id'], ['evaluation_types.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('evaluations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('filename_test', sa.String(), nullable=False),
    sa.Column('filename_test_count', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('evaluation_type_id', sa.Integer(), nullable=False),
    sa.Column('metric_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['evaluation_type_id'], ['evaluation_types.id'], ),
    sa.ForeignKeyConstraint(['metric_id'], ['metrics.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('title')
    )
    op.create_table('evaluation_models',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('model_title_id', sa.String(), nullable=False),
    sa.Column('input_text', sa.String(), nullable=False),
    sa.Column('is_evaluated', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('evaluation_id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['evaluation_id'], ['evaluations.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['tasks_types.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('models_automatic_metric_results',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('model_id', sa.Integer(), nullable=False),
    sa.Column('metric_id', sa.Integer(), nullable=False),
    sa.Column('value', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['metric_id'], ['metrics.id'], ),
    sa.ForeignKeyConstraint(['model_id'], ['evaluation_models.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.alter_column('users', 'name',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'name',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_table('models_automatic_metric_results')
    op.drop_table('evaluation_models')
    op.drop_table('evaluations')
    op.drop_table('metrics')
    op.drop_table('tasks_types')
    op.drop_table('evaluation_types')
    # ### end Alembic commands ###
