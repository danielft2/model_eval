import { HttpClient } from "./http-client";

export type tUseCase = {
  token?: string;
  httpClient: HttpClient;
} 