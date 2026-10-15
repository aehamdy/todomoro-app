import { z } from "zod";

export const registerSchema = z
  .object({
    // name, email, password
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters.")
      .max(50, "Name cannot exceed 50 characters"),

    email: z
      .email("Please provide a valid email address")
      .trim()
      .max(254, "Email cannot exceed 254 characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (password) => new TextEncoder().encode(password).length <= 72,
        "Password must not exceed 72 UTF-8 bytes",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
