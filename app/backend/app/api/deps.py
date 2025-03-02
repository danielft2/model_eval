from http import HTTPStatus
from typing import Annotated, Any, Generator

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jwt import DecodeError, ExpiredSignatureError, decode
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import Settings
from app.core.db import engine
from app.core.enums import HumanEvaluationStatus
from app.models.token_data import TokenData
from app.models_db import HumanEvaluation, User


def get_session() -> Generator[Session, Any, None]:
    with Session(engine) as session:
        yield session


settings = Settings()
ouauth_scheme = OAuth2PasswordBearer(tokenUrl="token")

SessionDep = Annotated[Session, Depends(get_session)]
TokenDep = Annotated[str, Depends(ouauth_scheme)]


def get_current_user(session: SessionDep, token: TokenDep):
    credentials_exception = HTTPException(
        status_code=HTTPStatus.UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        id: str = payload.get("id")

        if not id:
            raise credentials_exception
        token_data = TokenData(name=username, id=id)
    except DecodeError:
        raise credentials_exception
    except ExpiredSignatureError:
        credentials_exception.detail = "O token expirou!"
        raise credentials_exception

    user = session.scalar(select(User).where(User.id == token_data.id))

    if not user:
        raise credentials_exception

    return user


def get_current_human_evaluation(session: SessionDep, token: TokenDep):
    credentials_exception = HTTPException(
        status_code=HTTPStatus.NOT_FOUND,
        detail="O link não pertence a uma avaliação válida.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )

        id: str = payload.get("id")

        if not id:
            raise credentials_exception
    except DecodeError:
        raise credentials_exception
    except ExpiredSignatureError:
        credentials_exception.detail = "O link da avaliação expirou!"
        raise credentials_exception

    evaluation = session.scalar(
        select(HumanEvaluation).where(HumanEvaluation.id == id)
    )

    if not evaluation:
        raise credentials_exception

    if evaluation.status_id == HumanEvaluationStatus.UNAVALIABLE.value:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail="A avaliação não está mais disponível para respostas.",
        )

    return evaluation


CurrentUserDep = Annotated[User, Depends(get_current_user)]
CurrentHumanEvaluationDep = Annotated[
    HumanEvaluation, Depends(get_current_human_evaluation)
]
