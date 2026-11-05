import { RequestHandler } from "express";
import mongoose from "mongoose";
import PomodoroSession from "../models/pomodoro-session.model.ts";
import Task from "../models/task.model.ts";
import Project from "../models/project.model.ts";
import type { CreatePomodoroSessionInput } from "../types/pomodoro-session.types.ts";

export const createPomodoroSession: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to record a Pomodoro session",
      });
      return;
    }

    const input = req.body as CreatePomodoroSessionInput;

    const {
      sessionId,
      task: taskId,
      project: requestedProjectId,
      ...sessionData
    } = input;

    // Check whether this session has already been recorded.
    const existingSession = await PomodoroSession.findOne({
      user: userId,
      sessionId,
    });

    if (existingSession) {
      res.status(200).json({
        status: "success",
        message: "Session has already been recorded",
        data: {
          session: existingSession,
          alreadyRecorded: true,
        },
      });
      return;
    }

    // Validate and retrieve the associated task.
    let task = null;

    if (taskId) {
      if (!mongoose.isValidObjectId(taskId)) {
        res.status(400).json({
          status: "fail",
          message: "Invalid task ID",
        });
        return;
      }

      task = await Task.findOne({
        _id: taskId,
        user: userId,
      }).select("_id project");

      if (!task) {
        res.status(404).json({
          status: "fail",
          message: "Task not found",
        });
        return;
      }
    }

    // Determine the project associated with this session.
    const taskProjectId = task?.project?.toString() ?? null;

    const projectId =
      requestedProjectId !== undefined ? requestedProjectId : taskProjectId;

    // Ensure the supplied project matches the task's project.
    if (task && projectId !== taskProjectId) {
      res.status(400).json({
        status: "fail",
        message: "The selected project does not belong to the selected task",
      });
      return;
    }

    // Validate and retrieve the associated project.
    if (projectId) {
      if (!mongoose.isValidObjectId(projectId)) {
        res.status(400).json({
          status: "fail",
          message: "Invalid project ID",
        });
        return;
      }

      const projectExists = await Project.exists({
        _id: projectId,
        user: userId,
      });

      if (!projectExists) {
        res.status(404).json({
          status: "fail",
          message: "Project not found",
        });
        return;
      }
    }

    // Create the completed session.
    const session = await PomodoroSession.create({
      ...sessionData,
      sessionId,
      user: userId,
      task: task?._id ?? null,
      project: projectId ?? null,
    });

    res.status(201).json({
      status: "success",
      data: {
        session,
        alreadyRecorded: false,
      },
    });
  } catch (err) {
    // Handle concurrent duplicate requests.
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === 11000
    ) {
      try {
        const input = req.body as CreatePomodoroSessionInput;

        const existingSession = await PomodoroSession.findOne({
          user: req.userId,
          sessionId: input.sessionId,
        });

        if (existingSession) {
          res.status(200).json({
            status: "success",
            message: "Session has already been recorded",
            data: {
              session: existingSession,
              alreadyRecorded: true,
            },
          });
          return;
        }
      } catch (duplicateError) {
        next(duplicateError);
        return;
      }
    }

    next(err);
  }
};
