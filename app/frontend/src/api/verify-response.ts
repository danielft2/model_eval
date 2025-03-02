import { ResponseHttp } from "@/infra/http/response";
import { redirect } from "next/navigation";

export async function verifyResponse<T>(response: ResponseHttp<T>) {
  if (response.status_code === 401) {
    redirect('/?token=expired');
  }

  return response;
}