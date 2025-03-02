import smtplib
from email.message import EmailMessage

from app.core.config import Settings

settings = Settings()


async def send_email(to_email: str, subject: str, body: str):
    message = EmailMessage()
    message["From"] = settings.SMTP_USER
    message["To"] = to_email
    message["Subject"] = subject
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(message)
    except Exception:
        return (
            "Ocorreu um erro inesperado ao enviarmos o email, tente novamente!"
        )
