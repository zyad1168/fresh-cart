"use server";

import { getMyToken } from "@/utilities/getMyToken";
import { CheckoutFormData } from "@/schema/Checkout.schema";

export async function createCashOrder(
  cartId: string,
  formValues: Extract<CheckoutFormData, { paymentMethod: "cash" }>,
) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("You should be logged in first");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: {
          details: formValues.details,
          phone: formValues.phone,
          city: formValues.city,
          postalCode: formValues.postalCode,
        },
      }),
    },
  );

  const payload = await res.json();
  return payload;
}