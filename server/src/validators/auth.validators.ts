import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters"),

    email: z
      .email("Please provide a valid email address")
      .trim()
      .max(254, "Email cannot exceed 254 characters")
      .transform((email) => email.toLowerCase()),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password cannot exceed 20 characters"),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z
      .email("Please provide a valid email address")
      .trim()
      .max(254, "Email cannot exceed 254 characters")
      .transform((email) => email.toLowerCase()),

    password: z
      .string()
      .min(1, "Password is required")
      .refine(
        (password) => Buffer.byteLength(password, "utf-8") <= 72,
        "Password must not exceed 72 UTF-8 bytes",
      ),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
