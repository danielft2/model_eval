from http import HTTPStatus

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.requests import Request
from starlette.responses import JSONResponse

from app.api.routers import (
    auth,
    automatic_evaluation,
    evaluate_model,
    evaluations,
    human_evaluation,
    human_evaluation_resume,
)
from app.utils import (
    format_validation_errors,
)

app = FastAPI()
app.include_router(auth.router)
app.include_router(evaluations.router)
app.include_router(automatic_evaluation.router)
app.include_router(evaluate_model.router)
app.include_router(human_evaluation.router)
app.include_router(human_evaluation_resume.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
):
    return JSONResponse(
        content={
            "error": {
                "type": "validation_error",
                "message": "Validation error",
                "validations": format_validation_errors(exc.errors()),
            },
            "status_code": HTTPStatus.UNPROCESSABLE_ENTITY,
        },
        status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
    )


@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(
    request: Request, exc: StarletteHTTPException
):
    return JSONResponse(
        content={
            "error": {
                "type": "",
                "message": exc.detail,
            },
            "status_code": exc.status_code,
        },
        status_code=exc.status_code,
    )
