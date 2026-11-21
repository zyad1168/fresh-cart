"use server"

import { getMyToken } from "@/utilities/getMyToken";
import { FieldValues } from "react-hook-form";

export async function checkoutPayment(
  cartId: string,
  formValues: FieldValues,
) {
  const url = process.env.NEXT_URL
  const token = await getMyToken();
  if (!token) {
    throw new Error("you should logged in first ");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: formValues,
      }),
    },
  );

  const payload = await res.json();
  return payload;
}
