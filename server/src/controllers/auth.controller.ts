import { RequestHandler } from "express";
import User from "../models/user.model.ts";
import {
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
  UpdateAccountInput,
} from "../validators/auth.validators.ts";
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

    res.cookie("accessToken", token, {
      httpOnly: true, // Prevents frontend JavaScript from reading the authentication cookie.
      secure: process.env.NODE_ENV === "production", // Sends the cookie only over HTTPS in production.
      sameSite: "lax", // Helps protect against cross-site request forgery (CSRF). It is not our only CSRF defense.
      maxAge: 7 * 24 * 60 * 60 * 1000, // Keeps the cookie for seven days, matching your JWT lifetime.
      path: "/", // Makes the cookie available across your API routes.
    });

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

export const logout: RequestHandler = (_req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.clearCookie("csrfToken", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const updateAccount: RequestHandler = async (req, res, next) => {
  try {
    // Get the ID of the currently authenticated user.
    // The `protect` middleware should set req.userId.
    const userId = req.userId;

    // Extract the name and email sent by the client.
    // Either property might be undefined because both are optional.
    const { name, email } = req.body as UpdateAccountInput;

    // Search MongoDB for the user whose ID matches userId.
    const user = await User.findById(userId);

    // If no user exists with this ID, stop the function.
    if (!user) {
      // Send an error response because the account no longer exists.
      res.status(401).json({
        status: "fail",
        message: "User no longer exists",
      });

      // Stop execution so the remaining code doesn't run.
      return;
    }

    // Only check the email if the client provided one
    // and it differs from the user's current email.
    if (email !== undefined && email !== user.email) {
      // Look for another user with this email.
      // $ne means "not equal to", so exclude the current user.
      const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
      });

      // If another account already uses this email, reject the update.
      if (existingUser) {
        // HTTP 409 means the request conflicts with existing data.
        res.status(409).json({
          status: "fail",
          message: "Email is already in use",
        });

        // Stop execution to avoid updating the account.
        return;
      }

      // No other account uses this email, so update the user's email.
      user.email = email;
    }

    // Update the name only if the client provided one.
    if (name !== undefined) {
      user.name = name;
    }

    // Save the changes to MongoDB.
    // Mongoose runs its configured validation during this save.
    await user.save();

    // Send HTTP 200 to indicate that the update succeeded.
    res.status(200).json({
      // Indicate that the operation was successful.
      status: "success",

      // Put the updated account information inside data.
      data: {
        // Return the user object to the client.
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (err) {
    // Pass unexpected errors to Express's error-handling middleware.
    next(err);
  }
};

export const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body as ChangePasswordInput;

    const user = await User.findById(userId).select("+password");

    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "User no longer exists",
      });
      return;
    }

    const isPasswordCorrect = await comparePassword(
      currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      res.status(400).json({
        status: "fail",
        message: "Current password is incorrect",
      });
      return;
    }

    user.password = await hashPassword(newPassword);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};
