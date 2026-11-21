import * as z from "zod";

const baseShippingSchema = {
  details: z
    .string()
    .min(1, "Address details are required")
    .min(5, "Please enter a more detailed address (at least 5 characters)"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^01[0125][0-9]{8}$/,
      "Please enter a valid Egyptian phone number (e.g., 01020134454)",
    ),

  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City name must be at least 2 characters"),
};

export const checkoutSchema = z.discriminatedUnion("paymentMethod", [
  z.object({
    paymentMethod: z.literal("cash"),
    ...baseShippingSchema,
    postalCode: z
      .string()
      .min(1, "Postal code is required for cash orders")
      .min(4, "Please enter a valid postal code"),
  }),
  z.object({
    paymentMethod: z.literal("visa"),
    ...baseShippingSchema,
  }),
]);

export type CheckoutFormData = z.infer<typeof checkoutSchema>;