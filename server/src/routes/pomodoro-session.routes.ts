import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.ts";
import { requireCsrfToken } from "../middlewares/csrf.middleware.ts";
import { validateBody, validateQuery } from "../middlewares/validate.ts";
import { createPomodoroSession } from "../controllers/pomodoro-session.controller.ts";
import { createPomodoroSessionSchema } from "../validators/pomodoro-session.validators.ts";
import { getPomodoroStatsSchema } from "../validators/pomodoro-stats.validator.ts";
import { getPomodoroStats } from "../controllers/pomodoro-stats.controller.ts";

const pomodoroSessionRouter = Router();

pomodoroSessionRouter.get(
  "/stats",
  protect,
  validateQuery(getPomodoroStatsSchema),
  getPomodoroStats,
);

pomodoroSessionRouter.post(
  "/",
  protect,
  requireCsrfToken,
  validateBody(createPomodoroSessionSchema),
  createPomodoroSession,
);

export default pomodoroSessionRouter;
