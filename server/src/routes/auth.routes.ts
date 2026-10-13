import { Router } from "express";
import { validateBody } from "../middlewares/validate.ts";
import { registerSchema } from "../validators/auth.validators.ts";
import { register } from "../controllers/auth.controller.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);

export default authRouter;
