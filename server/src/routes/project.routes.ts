import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.ts";
import { requireCsrfToken } from "../middlewares/csrf.middleware.ts";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.validators.ts";
import { validateBody } from "../middlewares/validate.ts";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller.ts";

const projectRouter = Router();

projectRouter.use(protect);

projectRouter.get("/", getProjects);

projectRouter.use(requireCsrfToken);

projectRouter.post("/", validateBody(createProjectSchema), createProject);

projectRouter.patch("/:id", validateBody(updateProjectSchema), updateProject);

projectRouter.delete("/:id", deleteProject);

export default projectRouter;
