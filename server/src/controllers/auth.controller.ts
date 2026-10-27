import { RequestHandler } from "express";
import User from "../models/user.model.ts";
import {
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
  UpdateAccountInput,
  UpdatePreferencesInput,
} from "../validators/auth.validators.ts";
import { comparePassword, hashPassword } from "../services/password.service.ts";
import { signAccessToken } from "../services/jwt.service.ts";
import { formatName } from "../utils/formatName.ts";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body as RegisterInput;
    const passwordHash = await hashPassword(password);
    const formattedName = formatName(name);

    const user = await User.create({
      name: formattedName,
      email,
      password: passwordHash,
    });

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

    const user = await User.findById(userId).select(
      "_id name email preferences createdAt",
    );

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
          preferences: {
            theme: user.preferences?.theme ?? "system",
            taskCompletionSoundEnabled:
              user.preferences?.taskCompletionSoundEnabled ?? true,
          },
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
    const userId = req.userId;

    const { name, email, currentPassword } = req.body as UpdateAccountInput;

    // Load the user and explicitly include the hidden password hash.
    const user = await User.findById(userId).select("+password");

    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "User no longer exists",
      });
      return;
    }

    // Verify the current password before changing the email.
    if (email !== undefined && email !== user.email) {
      if (!currentPassword) {
        res.status(400).json({
          status: "fail",
          message: "Current password is required to change email",
        });
        return;
      }

      const isPasswordCorrect = await comparePassword(
        currentPassword,
        user.password,
      );

      if (!isPasswordCorrect) {
        res.status(401).json({
          status: "fail",
          message: "Incorrect current password",
        });
        return;
      }

      // Check whether another account already uses this email.
      const existingUser = await User.findOne({
        email,
        _id: { $ne: userId },
      });

      if (existingUser) {
        res.status(409).json({
          status: "fail",
          message: "Email is already in use",
        });
        return;
      }

      user.email = email;
    }

    // Update the name independently of the email.
    if (name !== undefined) {
      user.name = formatName(name);
    }

    await user.save();

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

export const updatePreferences: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { theme, taskCompletionSoundEnabled } =
      req.body as UpdatePreferencesInput;

    const user = await User.findById(userId);

    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "User no longer exists",
      });
      return;
    }

    if (theme !== undefined) {
      user.set("preferences.theme", theme);
    }

    if (taskCompletionSoundEnabled !== undefined) {
      user.set(
        "preferences.taskCompletionSoundEnabled",
        taskCompletionSoundEnabled,
      );
    }

    await user.save();

    res.status(200).json({
      status: "success",
      data: {
        preferences: {
          theme: user.get("preferences.theme") ?? "system",
          taskCompletionSoundEnabled:
            user.get("preferences.taskCompletionSoundEnabled") ?? true,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
