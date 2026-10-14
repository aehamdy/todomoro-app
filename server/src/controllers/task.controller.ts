import { RequestHandler } from "express";
import { CreateTaskInput } from "../validators/task.validators.ts";
import Task from "../models/task.model.ts";
import mongoose from "mongoose";

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

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to view tasks",
      });
      return;
    }

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getTaskById: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to view this task",
      });
      return;
    }

    const taskId = req.params.id;

    if (!mongoose.isValidObjectId(taskId)) {
      res.status(400).json({
        status: "fail",
        message: "Invalid task ID",
      });
      return;
    }

    const task = await Task.findOne({
      _id: taskId,
      user: userId,
    });

    if (!task) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    next(err);
  }
};
