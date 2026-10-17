import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(100, "Title cannot exceed 100 characters"),

  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),

  dueDate: z.string().nullable().default(null),
});

export type createTaskFormValues = z.input<typeof createTaskSchema>;
export type createTaskOutput = z.output<typeof createTaskSchema>;
