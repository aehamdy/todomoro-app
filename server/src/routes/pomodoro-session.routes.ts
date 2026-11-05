import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.ts";
import { requireCsrfToken } from "../middlewares/csrf.middleware.ts";
import { validateBody } from "../middlewares/validate.ts";
import { createPomodoroSession } from "../controllers/pomodoro-session.controller.ts";
import { createPomodoroSessionSchema } from "../validators/pomodoro-session.validators.ts";

const pomodoroSessionRouter = Router();

pomodoroSessionRouter.post(
  "/",
  protect,
  requireCsrfToken,
  validateBody(createPomodoroSessionSchema),
  createPomodoroSession,
);

export default pomodoroSessionRouter;
