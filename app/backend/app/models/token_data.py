from pydantic import BaseModel


class TokenData(BaseModel):
    id: int | None = None
    name: str | None = None
