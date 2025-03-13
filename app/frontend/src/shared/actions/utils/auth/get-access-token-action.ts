"use server";

import { cookies } from "next/headers";

export async function getAccessToken(): Promise<string> {
  const token = (await cookies()).get("token")?.value ?? "";
  return token;
}
