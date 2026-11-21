"use server";

import { getMyToken } from "@/utilities/getMyToken"; // عدّل المسار لو مكانه مختلف

export async function getUserWishlist() {
  const token = await getMyToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "GET",
    headers: {
      token: String(token),
    },
    cache: "no-store",
  });

  return await res.json();
}