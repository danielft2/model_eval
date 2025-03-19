export type RequestOptions = RequestInit & {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export type RequestConfig = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  options?: RequestOptions;
  body?: BodyInit | undefined | null | unknown;
  isMultipart?: boolean;
}

export type ValidationErrors = Record<string, { message: string }>;

export type HttpResponse<T = unknown> = {
  message?: string;
  data?: T; 
  error?: {
    type?: string;
    message: string;
    validations?: ValidationErrors
  };
  status_code: number;
};

export interface HttpClient {
  request<T = unknown>(config: RequestConfig): Promise<HttpResponse<T>> 
}
