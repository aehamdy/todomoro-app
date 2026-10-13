import { Router } from "express";
import { validateBody } from "../middlewares/validate.ts";
import { loginSchema, registerSchema } from "../validators/auth.validators.ts";
import { login, register } from "../controllers/auth.controller.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);

export default authRouter;
