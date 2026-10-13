import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
) => {
  if (error instanceof mongoose.Error && error.name === "ValidationError") {
    res.status(400).json({
      status: "fail",
      message: "Invalid user data",
    });
    return;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    res.status(409).json({
      status: "fail",
      message: "An account with this email already exists",
    });
    return;
  }

  console.log("Unhandled error💥 : ", error);

  res.status(500).json({
    status: "fail",
    message: "Something went wrong",
  });
};
