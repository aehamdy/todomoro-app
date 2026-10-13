import { RequestHandler } from "express";
import User from "../models/user.model.ts";
import { LoginInput, RegisterInput } from "../validators/auth.validators.ts";
import { comparePassword, hashPassword } from "../services/password.service.ts";
import { signAccessToken } from "../services/jwt.service.ts";

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

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as LoginInput;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
      return;
    }

    const token = signAccessToken(user.id);

    res.status(200).json({
      status: "success",
      token,
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

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("_id name email createdAt");

    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "User is no longer exists",
      });
      return;
    }

    res.status(200).json({
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
