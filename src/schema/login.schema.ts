import * as z from "zod";

export const logInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address (e.g., name@example.com)"),
    
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export type LogInFormData = z.infer<typeof logInSchema>;
// import * as zod from "zod";

// export const logInSchema = zod
//   .object({
    
//     email: zod.email("invalid email format"),
//     password: zod
//       .string()
//       .regex(
//         /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
//         "should start with...",
//       ),
//   })
 
// BETTER_AUTH_SECRET=570541d4b84c75dc9e8a164eb8f25b48a0e17dc6d9b1ebc336b62e67af764102