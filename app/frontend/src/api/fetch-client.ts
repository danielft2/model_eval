import { HttpClient, RequestConfig } from "@/infra/http/http-client";
import { ResponseHttp } from "@/infra/http/response";
import { AppError } from "./app-error";

export class AppFetch implements HttpClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  public async request<T>(config: RequestConfig): Promise<ResponseHttp<T>> {
    const { endpoint, method } = config;

    const url = `${this.baseUrl}${endpoint}`;
    const options_req = this.buildRequestConfig(method, config);

    try {
      const response = await fetch(url, options_req);
      const data: ResponseHttp<T> = await response.json();
    
      this.verifyResponse(response, data);

      return data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private verifyResponse<T>(response: Response, data: ResponseHttp<T>) {
    if (!response.ok) {
      throw new AppError(
        response.status,
        data?.error?.message || "Ocorreu um erro inesperado, tente novamente!",
        data?.error?.type,
        data?.error?.validations || {}
      );
    }
  }

  private handleError<T = unknown>(error: unknown): ResponseHttp<T> {
    if (error instanceof AppError) {
      return error.toResponseHttp<T>();
    }

    return {
      error: {
        type: "error",
        message: "Ocorreu um erro inesperado, tente novamente!",
      },
      status_code: 500,
    };
  }

  private buildRequestConfig(
    method: string,
    config: RequestConfig
  ): RequestInit {
    const { headers, ...rest } = config?.options || {};
    const body = config?.body;

    if (config.isMultipart && body instanceof FormData) {
      return {
        method,
        headers: {
          ...headers,
        },
        body: body,
        ...rest,
      };
    }

    return {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    };
  }
}

export const fetchClient = new AppFetch();
