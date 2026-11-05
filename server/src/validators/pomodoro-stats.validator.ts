import { z } from "zod";
import { pomodoroStatsPeriods } from "../types/pomodoro-stats.types.js";

export const getPomodoroStatsSchema = z.object({
  period: z.enum(pomodoroStatsPeriods).default("today"),

  timezone: z
    .string()
    .trim()
    .min(1, "Timezone is required")
    .refine((timezone) => {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return true;
      } catch {
        return false;
      }
    }, "Invalid timezone"),
});
