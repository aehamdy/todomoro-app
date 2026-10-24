import { z } from "zod";

const taskFields = {
  title: z
    .string()
    .trim()
    .min(1, "Task title cannot be empty")
    .max(100, "Title cannot exceed 100 characters"),

  note: z.string().trim().max(1000, "Note cannot exceed 1000 characters"),

  isCompleted: z.boolean(),

  priority: z.enum(["low", "medium", "high", "urgent"]),

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
    project: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .nullable(),
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

export const createSubtaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Subtask title is required")
    .max(100, "Subtask title cannot exceed 100 characters"),
});

export const updateSubtaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Subtask title is required")
      .max(100, "Subtask title cannot exceed 100 characters")
      .optional(),

    isCompleted: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateSubtaskInput = z.infer<typeof createSubtaskSchema>;
export type UpdateSubtaskInput = z.infer<typeof updateSubtaskSchema>;
