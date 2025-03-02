from http import HTTPStatus

from fastapi import HTTPException


class ImportQuestionError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.BAD_REQUEST,
        detail="Não é possivel importar questões com a avaliação em andamento.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class ImportQuestionCountError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.BAD_REQUEST,
        detail="Não é possível importar um número de questões inferior ao total que cada avaliador deve avaliar.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)
