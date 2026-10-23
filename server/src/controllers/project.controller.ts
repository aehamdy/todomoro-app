import { RequestHandler } from "express";
import Project from "../models/project.model.ts";
import {
  createProjectInput,
  updateProjectInput,
} from "../validators/project.validators.ts";
import mongoose from "mongoose";
import Task from "../models/task.model.ts";

export const getProjects: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to view projects",
      });
      return;
    }

    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "success",
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const createProject: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to create a project",
      });
      return;
    }

    const input = req.body as createProjectInput;

    const project = await Project.create({
      ...input,
      user: userId,
    });

    res.status(201).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProject: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to update a project",
      });
      return;
    }

    const projectId = req.params.id;

    if (!mongoose.isValidObjectId(projectId)) {
      res.status(400).json({
        status: "fail",
        message: "Invalid project ID",
      });
      return;
    }

    const input = req.body as updateProjectInput;

    const project = await Project.findOneAndUpdate(
      { _id: projectId, user: userId },
      { $set: input },
      { new: true, runValidators: true },
    );

    if (!project) {
      res.status(404).json({
        status: "fail",
        message: "Project not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProject: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to delete a task",
      });
      return;
    }

    const projectId = req.params.id;

    if (!mongoose.isValidObjectId(projectId)) {
      res.status(400).json({
        status: "fail",
        message: "Invalid project ID",
      });
      return;
    }

    const project = await Project.findOne({
      _id: projectId,
      user: userId,
    });

    if (!project) {
      res.status(404).json({
        status: "fail",
        message: "Project not found",
      });
      return;
    }

    const taskExists = await Task.exists({ project: projectId, user: userId });

    if (taskExists) {
      res.status(409).json({
        status: "fail",
        message:
          "This project still contains tasks. Move or delete its tasks before deleting the project.",
      });
      return;
    }

    await project.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
