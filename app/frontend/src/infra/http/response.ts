export type ValidationErrors = Record<string, { message: string }>;

export type ResponseHttp<T = unknown> = {
  message?: string;
  data?: T; 
  error?: {
    type?: string;
    message: string;
    validations?: ValidationErrors
  };
  status_code: number;
};