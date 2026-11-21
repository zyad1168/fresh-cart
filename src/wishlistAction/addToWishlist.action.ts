"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function addToWishlist(productId: string) {
  const token = await getMyToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: String(token),
    },
    body: JSON.stringify({ productId }),
  });

  return await res.json();
}