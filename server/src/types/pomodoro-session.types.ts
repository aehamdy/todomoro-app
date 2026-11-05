import type { z } from "zod";
import { createPomodoroSessionSchema } from "../validators/pomodoro-session.validators.ts";

export type PomodoroSessionType = "focus" | "shortBreak" | "longBreak";

export type PomodoroStatsCategory = "focus" | "break";

export type CreatePomodoroSessionInput = z.infer<
  typeof createPomodoroSessionSchema
>;
