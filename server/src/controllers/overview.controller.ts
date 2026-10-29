import { RequestHandler } from "express";
import Task from "../models/task.model.ts";
import Project from "../models/project.model.ts";
import mongoose from "mongoose";

export const getOverviewSummary: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You must be logged in to view your dashboard",
      });
      return;
    }

    const now = new Date();
    const startOfToday = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    const startOfTomorrow = new Date(startOfToday);
    startOfTomorrow.setUTCDate(startOfTomorrow.getUTCDate() + 1);

    const startOfNextWeek = new Date(startOfToday);
    startOfNextWeek.setUTCDate(startOfNextWeek.getUTCDate() + 8);

    const [
      activeTasks,
      completedToday,
      dueToday,
      overdue,
      todayTasks,
      upcomingTasks,
      recentProjects,
    ] = await Promise.all([
      // Active tasks
      Task.countDocuments({ user: userId, isCompleted: false }),

      // Tasks completed today
      Task.countDocuments({
        user: userId,
        isCompleted: true,
        completedAt: { $gte: startOfToday, $lt: startOfTomorrow },
      }),

      // Due today tasks
      Task.countDocuments({
        user: userId,
        dueDate: { $gte: startOfToday, $lt: startOfTomorrow },
      }),

      // Overdue tasks
      Task.countDocuments({
        user: userId,
        isCompleted: false,
        dueDate: { $lt: startOfToday, $ne: null },
      }),

      // Today's tasks
      Task.find({
        user: userId,
        dueDate: { $gte: startOfToday, $lt: startOfTomorrow },
      }),

      // Upcoming tasks
      Task.find({
        user: userId,
        isCompleted: false,
        dueDate: { $gte: startOfTomorrow, $lt: startOfNextWeek },
      })
        .populate("project", "title color")
        .sort({ dueDate: 1 }),

      // Recent projects with completed and incomplete task counts
      Project.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 3 },
        {
          $lookup: {
            from: Task.collection.name,
            let: { projectId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$project", "$$projectId"] },
                },
              },
              {
                $group: {
                  _id: null,
                  completedTasks: {
                    $sum: { $cond: ["$isCompleted", 1, 0] },
                  },
                  incompleteTasks: {
                    $sum: { $cond: ["$isCompleted", 0, 1] },
                  },
                },
              },
            ],
            as: "taskCounts",
          },
        },
        {
          $addFields: {
            completedTasks: {
              $ifNull: [{ $arrayElemAt: ["$taskCounts.completedTasks", 0] }, 0],
            },
            incompleteTasks: {
              $ifNull: [
                { $arrayElemAt: ["$taskCounts.incompleteTasks", 0] },
                0,
              ],
            },
          },
        },
        { $project: { taskCounts: 0 } },
      ]),
    ]);

    res.status(200).json({
      status: "success",
      data: {
        summary: {
          activeTasks,
          dueToday,
          completedToday,
          overdue,
        },
        todayTasks,
        upcomingTasks,
        recentProjects,
      },
    });
  } catch (err) {
    next(err);
  }
};
