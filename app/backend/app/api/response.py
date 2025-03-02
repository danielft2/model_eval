from typing import Generic, Optional, TypeVar

from pydantic import ConfigDict
from pydantic.generics import GenericModel

T = TypeVar("T")


class Response(GenericModel, Generic[T]):
    message: Optional[str] = None
    data: Optional[T] = None

    model_config = ConfigDict(arbitrary_types_allowed=True)
