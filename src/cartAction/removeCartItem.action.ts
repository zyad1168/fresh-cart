"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function removeCartItem(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("you should logged in first");
  }
  const res = await fetch(`${process.env.APIV2}/cart/${id}`, {
    method: "delete",

    headers: {
      token,
    },
  });
  const payload = await res.json();
  return payload;
}
// https://ecommerce.routemisr.com/api/v2/cart/{{productId}}
