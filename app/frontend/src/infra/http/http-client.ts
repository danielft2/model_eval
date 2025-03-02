import { ResponseHttp } from "./response"

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

export interface HttpClient {
  request<T = unknown>(config: RequestConfig): Promise<ResponseHttp<T>> 
}