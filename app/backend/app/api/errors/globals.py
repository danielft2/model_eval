from http import HTTPStatus

from fastapi import HTTPException


class EvaluationNotFoundError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.NOT_FOUND,
        detail="A avaliação informada não foi encontrada em nossos registros.",
        headers=None,
    ):
        self.detail = detail
        self.type = "REGISTER_NOT_FOUND"
        super().__init__(status_code, detail, headers)


class FileImportFormatInvalidError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.BAD_REQUEST,
        detail="O arquivo selecionado não está no formato esperado.",
        headers=None,
        missing_columns="",
    ):
        self.detail = (
            f"{detail} As seguintes colunas estão faltando: {missing_columns}"
        )
        super().__init__(status_code, self.detail, headers)


class FileImportProcessedError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
        detail="Ocorreu um erro inesperado ao processar o arquivo. Tente novamente em breve.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class FileImportTypeInvalidError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.BAD_REQUEST,
        detail="O arquivo precisa ser do tipo CSV.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class SomethingWrongError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
        detail="Aconteceu um erro por aqui. Já estamos trabalhando nisso. Tente novamente em breve.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class EvaluationTitleConflictError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.CONFLICT,
        detail="O titulo informado já está sendo usado em outra avaliação.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)
