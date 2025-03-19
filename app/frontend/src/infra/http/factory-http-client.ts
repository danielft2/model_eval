import { FetchHttpClientAdapter } from "./adapters/fetch-http-client";

export const factoryHttpClient = (token?: string) => new FetchHttpClientAdapter(token);