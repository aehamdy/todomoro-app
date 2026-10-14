import type { RequestHandler } from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { verifyAccessToken } from "../services/jwt.service.js";

export const protect: RequestHandler = async (req, res, next) => {
  // the commented code below is for adding the token to the response
  // const authorization = req.headers.authorization;

  // // Check the Authorization header. It expects Bearer followed by a token
  // if (!authorization?.startsWith("Bearer ")) {
  //   res.status(401).json({
  //     status: "fail",
  //     message: "You are not logged in. Please log in to get access.",
  //   });
  //   return;
  // }

  // // Verify the JWT. Invalid signatures and expired tokens are rejected
  // const token = authorization.slice("Bearer ".length).trim();

  // if (!token) {
  //   res.status(401).json({
  //     status: "fail",
  //     message: "Invalid authentication token",
  //   });
  //   return;
  // }

  // the approach below is to set the JWT in an httpOnly-cookie
  const token = req.cookies?.accessToken;

  if (typeof token !== "string" || !token.trim()) {
    res.status(401).json({
      status: "fail",
      message: "You are not logged in. Please log in to get access.",
    });
    return;
  }

  let userId: string;
  try {
    // Validate the user ID. The token's sub must be a valid MongoDB ObjectId.
    const decoded = verifyAccessToken(token);

    if (!mongoose.isValidObjectId(decoded.sub)) {
      res.status(401).json({
        status: "fail",
        message: "Invalid authentication token",
      });
      return;
    }

    userId = decoded.sub;
  } catch {
    res.status(401).json({
      status: "fail",
      message: "Invalid or expired authentication token",
    });
    return;
  }

  try {
    // Check that the user still exists. A token belonging to a deleted account won't grant access.
    const user = await User.findById(userId).select("_id");

    if (!user) {
      res.status(401).json({
        status: "fail",
        message: "The user associated with this token no longer exists",
      });
      return;
    }

    // Attach the authenticated user ID. Downstream controllers can read req.userId.
    req.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
};
