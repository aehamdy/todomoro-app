import { z } from "zod";

const themeOptions = [
  "light",
  "dark",
  "system",
  "ocean",
  "midnight",
  "ivory",
  "lavender",
  "sunset",
  "emerald-dark",
  "carbon",
  "olive-amber",
  "citrus-grove",
  "desert-oasis",
];

const pomodoroAlarmSoundOptions = [
  "none",
  "default",
  "bell",
  "digital",
  "gentle",
] as const;

const pomodoroBackgroundSoundOptions = [
  "none",
  "white-noise",
  "pink-noise",
  "brown-noise",
  "rain",
  "fireplace",
  "cafe",
  "library",
  "classroom",
  "ocean-shore",
  "bonfire",
  "forest",
  "wind",
] as const;

const pomodoroWidgetThemeOptions = [
  "midnight",
  "warm-sand",
  "forest",
  "lavender",
  "rose",
] as const;

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

export const updateAccountSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    email: z.email().trim().optional(),
    currentPassword: z.string().min(1).optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "Provide a name or email to update",
  })
  .refine(
    (data) => data.email === undefined || data.currentPassword !== undefined,
    {
      message: "Current password is required to change email",
      path: ["currentPassword"],
    },
  );

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(20),
});

export const pomodoroPreferencesSchema = z
  .object({
    focusDuration: z.number().int().min(1).max(480).optional(),

    shortBreakDuration: z.number().int().min(1).max(480).optional(),

    longBreakDuration: z.number().int().min(1).max(480).optional(),

    longBreakInterval: z.number().int().min(2).max(90).optional(),

    autoStartNextPomodoro: z.boolean().optional(),

    autoStartBreak: z.boolean().optional(),

    disableBreaks: z.boolean().optional(),

    alarmVolume: z.number().int().min(0).max(100).optional(),

    focusAlarmSound: z.enum(pomodoroAlarmSoundOptions).optional(),

    breakAlarmSound: z.enum(pomodoroAlarmSoundOptions).optional(),

    backgroundSoundVolume: z.number().int().min(0).max(100).optional(),

    selectedBackgroundSound: z.enum(pomodoroBackgroundSoundOptions).optional(),

    autoPlayBackgroundSound: z.boolean().optional(),

    widgetTheme: z.enum(pomodoroWidgetThemeOptions).optional(),
  })
  .strict()
  .refine((preferences) => Object.keys(preferences).length > 0, {
    message: "At least one Pomodoro preference must be provided",
  });

export const updatePreferencesSchema = z
  .object({
    theme: z.enum(themeOptions).optional(),

    taskCompletionSoundEnabled: z.boolean().optional(),

    addNewTasksToTop: z.boolean().optional(),

    pomodoro: pomodoroPreferencesSchema.optional(),
  })
  .strict()
  .refine((preferences) => Object.keys(preferences).length > 0, {
    message: "At least one preference must be provided",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateAccountInput = z.infer<typeof updateAccountSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
