from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_session
from app.api.models.requests import SignInRequest
from app.api.response import Response
from app.core.config import Settings
from app.core.security import create_access_token
from app.models_db import User
from app.services.smtplib import send_email

router = APIRouter(prefix="/auth", tags=["auth"])

settings = Settings()
T_Session = Annotated[Session, Depends(get_session)]


@router.post("/signin", response_model=Response[str])
async def signin(email: SignInRequest, session: T_Session):
    email_str = email.email
    user_already_exist = session.scalar(
        select(User).where(User.email == email_str)
    )

    if user_already_exist is None:
        new_user = User(email=email_str)

        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        access_token = create_access_token({"sub": "", "id": new_user.id})

        await send_email_for_user(access_token=access_token, email=email_str)
    else:
        access_token = create_access_token(
            {
                "sub": user_already_exist.name
                if user_already_exist.name
                else "",
                "id": user_already_exist.id,
            }
        )
        await send_email_for_user(
            access_token=access_token, email=user_already_exist.email
        )

    return Response(
        message="Link de acesso enviado com sucesso.", data=access_token
    )


async def send_email_for_user(access_token: str, email: str):
    magic_link = f"{settings.MAGIC_LINK_URL}{access_token}"
    message = f"Clique aqui para acessar o sistema: {magic_link}"

    try:
        await send_email(
            to_email=email, subject="Model.eval - Link de acesso", body=message
        )
    except Exception as e:
        raise HTTPException(
            status_code=HTTPStatus.SERVICE_UNAVAILABLE,
            detail=e,
        )
