"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function addToCart(productId: string) {
  const token = await getMyToken(); //token

  if (!token) {
    throw new Error("you should logged in first");
  }
  const res = await fetch(`${process.env.APIV2}/cart`, {
    method: "post",

    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
  const payload = await res.json();
  return payload;
}
