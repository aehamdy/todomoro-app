import { RequestHandler } from "express";
import User from "../models/user.model.ts";
import { RegisterInput } from "../validators/auth.validators.ts";
import { hashPassword } from "../services/password.service.ts";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body as RegisterInput;
    const passwordHash = await hashPassword(password);

    const user = await User.create({ name, email, password: passwordHash });

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
