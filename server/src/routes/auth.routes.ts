import { Router } from "express";
import { validateBody } from "../middlewares/validate.ts";
import { loginSchema, registerSchema } from "../validators/auth.validators.ts";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/auth.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";
import { requireCsrfToken } from "../middlewares/csrf.middleware.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", protect, requireCsrfToken, logout);

authRouter.get("/me", protect, getMe);
export default authRouter;
