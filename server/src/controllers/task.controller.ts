import { RequestHandler } from "express";
import {
  CreateSubtaskInput,
  CreateTaskInput,
  UpdateSubtaskInput,
  UpdateTaskInput,
} from "../validators/task.validators.ts";
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

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to update a task",
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

    const input = req.body as UpdateTaskInput;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        user: userId,
      },
      { $set: input },
      {
        new: true,
        runValidators: true,
      },
    );

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

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to delete a task",
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

    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!task) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const createSubtask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to add subtasks",
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

    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
      return;
    }

    const input = req.body as CreateSubtaskInput;

    task.subtasks.push({
      title: input.title,
    });

    await task.save();

    res.status(201).json({
      status: "fail",
      data: {
        task,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateSubtask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to update a subtask",
      });
      return;
    }

    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    if (!mongoose.isValidObjectId(taskId)) {
      res.status(400).json({
        status: "fail",
        message: "Invalid task ID",
      });
      return;
    }

    if (!mongoose.isValidObjectId(subtaskId)) {
      res.status(400).json({
        status: "fail",
        messge: "Invalid subtask ID",
      });
      return;
    }

    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
      return;
    }

    const subtask = task.subtasks.find(
      (item) => item._id.toString() === subtaskId,
    );

    if (!subtask) {
      res.status(404).json({
        status: "fail",
        message: "Subtask not found",
      });
      return;
    }

    const input = req.body as UpdateSubtaskInput;

    if (input.title !== undefined) {
      subtask.title = input.title;
    }

    if (input.isCompleted !== undefined) {
      subtask.isCompleted = input.isCompleted;
    }

    await task.save();

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

export const deleteSubtask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to delete a subtask",
      });
      return;
    }

    const taskId = req.params.id;
    const subtaskId = req.params.subtaskId;

    if (!mongoose.isValidObjectId(taskId)) {
      res.status(400).json({
        status: "fail",
        message: "Invalid task ID",
      });
      return;
    }

    if (!mongoose.isValidObjectId(subtaskId)) {
      res.status(400).json({
        status: "fail",
        message: "Invalid subtask ID",
      });
      return;
    }

    const task = await Task.findOne({ _id: taskId, user: userId });

    if (!task) {
      res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
      return;
    }

    const subtaskExists = task.subtasks.some(
      (item) => item._id.toString() === subtaskId,
    );

    if (!subtaskExists) {
      res.status(404).json({
        status: "fail",
        message: "Subtask not found",
      });
      return;
    }

    task.subtasks.pull({ _id: subtaskId });

    await task.save();

    res.status(200).json({
      status: "success",
      message: "Subtask deleted successfully",
      data: {
        task,
      },
    });
  } catch (err) {
    next(err);
  }
};
