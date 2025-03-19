import { HttpClient, HttpResponse, RequestConfig } from "@/core/http/contracts/http-client";
import { AppError } from "@/core/http/errors/app-error";

export class FetchHttpClientAdapter implements HttpClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  constructor(private token: string = "") {}

  public async request<T>(config: RequestConfig): Promise<HttpResponse<T>> {
    const { endpoint, method } = config;

    const url = `${this.baseUrl}${endpoint}`;
    const options_req = this.buildRequestConfig(method, config);

    try {
      const response = await fetch(url, options_req);
      const data: HttpResponse<T> = await response.json();
    
      this.verifyResponse(response, data);

      return data;
    } catch (error) {
      throw error;
    }
  }

  private verifyResponse<T>(response: Response, data: HttpResponse<T>) {
    if (!response.ok) {
      throw new AppError(
        response.status,
        data?.error?.message || "Ocorreu um erro inesperado, tente novamente!",
        data?.error?.type,
        data?.error?.validations || {}
      );
    }
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
          Authorization: `Bearer ${this.token}`,
          ...headers,
        },
        body: body,
        ...rest,
      };
    }

    return {
      method,
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    };
  }
}

