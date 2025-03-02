/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@/types/user";
import { jwtVerify } from "jose";

export async function verifyToken(token: string): Promise<User | null> {
  if (!token) return null;
  
  try {
    const secret_key = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
    const data = await jwtVerify(token,secret_key, {
      algorithms: ["HS256"]
    })
    return { id: data.payload.id as number, name: data.payload.sub as string };  
  } catch (error) {
    return null;
  }
}