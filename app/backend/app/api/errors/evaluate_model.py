from http import HTTPStatus

from fastapi import HTTPException


class FileTestNotFoundError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.NOT_FOUND,
        detail="A avaliação ainda não possui um arquivo de teste importado.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class DonwloadModelHugginfaceError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
        detail="Ocorreu um erro inesperado ao carregar o modelo. Verifique se o ID do modelo no hugginface está correto e se ele está configurado como público.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class ModelNotFoundError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.NOT_FOUND,
        detail="O modelo informado não foi encontrado em nossos registros.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)


class ModelEvaluationError(HTTPException):
    def __init__(
        self,
        status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
        detail="Ocorreu um erro inesperado ao avaliar o modelo. Tente novamente em breve.",
        headers=None,
    ):
        self.detail = detail
        super().__init__(status_code, detail, headers)
