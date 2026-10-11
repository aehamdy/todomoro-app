import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";

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

export default app;
