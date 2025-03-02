import { ValidationErrors } from "@/infra/http/response";

export interface SigninData {
  message: string;
}

export interface SigninError {
  message?: string | null;
  validations?: ValidationErrors;
}