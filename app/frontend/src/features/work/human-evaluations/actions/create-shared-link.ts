'use server'

import { SignJWT } from "jose";

export async function createSharedLink(evaluationId: string): Promise<string> {
  const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);

  const token = await new SignJWT({ id: evaluationId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(secret);

  return token;
}