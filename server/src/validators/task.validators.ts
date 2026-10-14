import { z } from "zod";

const taskFields = {
  title: z
    .string()
    .trim()
    .min(1, "Task title cannot be empty")
    .max(100, "Title cannot exceed 100 characters"),

  note: z.string().trim().max(1000, "Note cannot exceed 1000 characters"),

  isCompleted: z.boolean(),

  priority: z.enum(["no-priority", "low", "medium", "high"]),

  dueDate: z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Please provide a valid due date",
    )
    .transform((value) => new Date(value))
    .nullable(),
};

export const createTaskSchema = z
  .object({
    title: taskFields.title,
    note: taskFields.note.optional(),
    isCompleted: taskFields.isCompleted.optional(),
    priority: taskFields.priority.optional(),
    dueDate: taskFields.dueDate.optional(),
  })
  .strict();

export const updateTaskSchema = z
  .object({
    title: taskFields.title.optional(),
    note: taskFields.note.optional(),
    isCompleted: taskFields.isCompleted.optional(),
    priority: taskFields.priority.optional(),
    dueDate: taskFields.dueDate.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
