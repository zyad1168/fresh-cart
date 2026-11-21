"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const decodeToken = (await cookies()).get("next-auth.session-token")?.value
  || (await cookies()).get("__Secure-next-auth.session-token")?.value

  const token = await decode({
    token: decodeToken,
    secret: process.env.AUTH_SECRET!,
  });

  return token?.token;
}

// js => nodejs (environment) => server
