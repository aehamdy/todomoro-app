import z from "zod";

const projectColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Project color must be a valid hex color");

export const createProjectSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Project title is required")
      .max(100, "Project title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .max(500, "Project description cannot exceed 500 characters")
      .optional(),

    color: projectColorSchema.optional(),
  })
  .strict();

export const updateProjectSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Project title is required")
      .max(100, "Project title cannot exceed 100 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .max(500, "Project description cannot exceed 500 characters")
      .optional(),

    color: projectColorSchema.optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least on field must be provided",
  );

export type createProjectInput = z.infer<typeof createProjectSchema>;
export type updateProjectInput = z.infer<typeof updateProjectSchema>;
