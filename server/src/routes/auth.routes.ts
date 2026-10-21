import { Router } from "express";
import { validateBody } from "../middlewares/validate.ts";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  updateAccountSchema,
  updatePreferencesSchema,
} from "../validators/auth.validators.ts";
import {
  changePassword,
  getMe,
  login,
  logout,
  register,
  updateAccount,
  updatePreferences,
} from "../controllers/auth.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";
import { requireCsrfToken } from "../middlewares/csrf.middleware.ts";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", protect, requireCsrfToken, logout);

authRouter.get("/me", protect, getMe);

authRouter.patch(
  "/me",
  protect,
  requireCsrfToken,
  validateBody(updateAccountSchema),
  updateAccount,
);
authRouter.patch(
  "/me/password",
  protect,
  requireCsrfToken,
  validateBody(changePasswordSchema),
  changePassword,
);
export default authRouter;

authRouter.patch(
  "/me/preferences",
  protect,
  requireCsrfToken,
  validateBody(updatePreferencesSchema),
  updatePreferences,
);
