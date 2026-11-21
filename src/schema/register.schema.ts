import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(15, "Name must be at most 15 characters"),
      
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
      
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
      
    rePassword: z
      .string()
      .min(1, "Please confirm your password"),
      
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number (e.g., 010xxxxxxxx)"),
  })
  .refine(
    (data) => data.password === data.rePassword,
    {
      message: "Passwords do not match",
      path: ["rePassword"],
    }
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
// import * as zod from "zod";

// export const registerSchema = zod
//   .object({
//     name: zod
//       .string()
//       .nonempty("Name is required")
//       .min(2, "at min 2 characters...")
//       .max(15, "at most 15 characters"),
//     email: zod.email("invalid email format"),
//     password: zod
//       .string()
//       .regex(
//         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
//         "should start with...",
//       ),
//     rePassword: zod
//       .string()
//       .regex(
//         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
//         "should start with......",
//       ),
//     phone: zod.string().regex(/^01[0125][0-9]{8}$/, "must be egyptian number"),
//   })
//   .refine(
//     (obj) => {
//       return obj.password === obj.rePassword;
//     },
//     {
//       error: "password and rePassword must be matched",
//       path: ["rePassword"],
//     },
//   );
