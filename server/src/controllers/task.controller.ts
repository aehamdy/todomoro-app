import { RequestHandler } from "express";
import { CreateTaskInput } from "../validators/task.validators.ts";
import Task from "../models/task.model.ts";

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to create a task",
      });
      return;
    }

    const input = req.body as CreateTaskInput;

    const task = await Task.create({
      ...input,
      user: userId,
    });

    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    next(err);
  }
};
