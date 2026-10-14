import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error-handler.ts";
import authRouter from "./routes/auth.routes.ts";
import cookieParser from "cookie-parser";
import csrfRouter from "./routes/csrf.routes.js";
import taskRouter from "./routes/task.routes.ts";

const app = express();

app.use(helmet());
app.use(
  cors({
    // cors() allows your frontend's configured origin to access the API.
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // allows the browser to send cookies with cross-origin requests.
  }),
);
app.use(express.json()); // continues to parse JSON request bodies.
app.use(cookieParser()); // parses incoming cookies into req.cookies.

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

app.use("/api/v1/csrf", csrfRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(errorHandler);

export default app;
