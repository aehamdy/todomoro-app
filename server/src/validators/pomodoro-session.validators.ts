import { z } from "zod";

export const createPomodoroSessionSchema = z
  .object({
    sessionId: z.string().trim().min(1, "Session ID is required"),

    sessionType: z.enum(["focus", "shortBreak", "longBreak"]),

    plannedDurationSeconds: z
      .number()
      .int()
      .min(1, "Planned duration must be at least 1 second"),

    actualDurationSeconds: z
      .number()
      .int()
      .min(1, "Actual duration must be at least 1 second"),

    startedAt: z
      .string()
      .refine(
        (value) => !Number.isNaN(Date.parse(value)),
        "Please provide a valid session start time",
      )
      .transform((value) => new Date(value)),

    completedAt: z
      .string()
      .refine(
        (value) => !Number.isNaN(Date.parse(value)),
        "Please provide a valid session completion time",
      )
      .transform((value) => new Date(value)),

    task: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Please provide a valid task ID")
      .nullable()
      .optional(),

    project: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Please provide a valid project ID")
      .nullable()
      .optional(),

    timezone: z.string().trim().min(1, "Timezone is required"),
  })
  .strict()
  .refine((data) => new Date(data.completedAt) > new Date(data.startedAt), {
    message: "Completion time must be after session start time",
    path: ["completedAt"],
  });
