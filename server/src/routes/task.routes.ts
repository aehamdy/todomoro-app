import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/task.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";
import { requireCsrfToken } from "../middlewares/csrf.middleware.ts";
import { validateBody } from "../middlewares/validate.ts";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validators.ts";

const taskRouter = Router();

taskRouter.get("/", protect, getTasks);
taskRouter.get("/:id", protect, getTaskById);

taskRouter.post(
  "/",
  protect, // verifies the login cookie and identifies the user.
  requireCsrfToken, // checks the CSRF cookie against the request header.
  validateBody(createTaskSchema), // checks the submitted task data using Zod.
  createTask,
);

taskRouter.patch(
  "/:id",
  protect,
  requireCsrfToken,
  validateBody(updateTaskSchema),
  updateTask,
);

taskRouter.delete("/:id", protect, requireCsrfToken, deleteTask);

export default taskRouter;
