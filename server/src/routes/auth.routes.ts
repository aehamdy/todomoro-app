import { Router } from "express";
import { validateBody } from "../middlewares/validate.ts";
import { loginSchema, registerSchema } from "../validators/auth.validators.ts";
import { getMe, login, register } from "../controllers/auth.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);

authRouter.get("/me", protect, getMe);
export default authRouter;
