import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";
import { requireCsrfToken } from "../middlewares/csrf.middleware.ts";
import { validateBody } from "../middlewares/validate.ts";
import { createTaskSchema } from "../validators/task.validators.ts";

const taskRouter = Router();

taskRouter.get("/", protect, getTasks);
taskRouter.post(
  "/",
  protect, // verifies the login cookie and identifies the user.
  requireCsrfToken, // checks the CSRF cookie against the request header.
  validateBody(createTaskSchema), // checks the submitted task data using Zod.
  createTask,
);

export default taskRouter;
