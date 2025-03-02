import { ResponseHttp, ValidationErrors } from "@/infra/http/response";

export class AppError extends Error {
  constructor(
    public statusCode: number = 500, 
    public message: string,
    public type: string = "error",
    public validations: ValidationErrors = {}
  ) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  public toResponseHttp<T>(): ResponseHttp<T> {
    return {
      error: {
        type: "error",
        message: this.message,
        validations: this.validations,
      },
      status_code: this.statusCode,
    };
  }
}
