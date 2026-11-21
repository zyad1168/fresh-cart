"use server";

import { getMyToken } from "@/utilities/getMyToken";

export async function removeFromWishlist(productId: string) {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: String(token),
      },
    }
  );

  return await res.json();
}