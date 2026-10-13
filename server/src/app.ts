import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error-handler.ts";
import authRouter from "./routes/auth.routes.ts";

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Todomoro API is running.",
  });
});

app.get("/api/v1/ready", (_req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  if (!databaseConnected) {
    res.status(503).json({
      status: "error",
      message: "Service is not ready",
    });
    return;
  }

  res.status(200).json({
    status: "success",
    message: "Service is ready",
  });
});

app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

export default app;
