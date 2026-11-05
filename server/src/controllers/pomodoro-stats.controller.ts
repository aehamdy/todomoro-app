import { RequestHandler } from "express";
import PomodoroSession from "../models/pomodoro-session.model.js";
import {
  getPomodoroStatsDateKeys,
  getPomodoroStatsDateRange,
} from "../utils/pomodoro-stats.utils.js";
import type {
  GetPomodoroStatsQuery,
  PomodoroProjectStat,
  PomodoroTaskStat,
} from "../types/pomodoro-stats.types.js";
import { Types } from "mongoose";

interface DailyPomodoroStat {
  date: string;
  focusTimeSeconds: number;
  completedSessions: number;
}

interface PomodoroStatsAggregationResult {
  summary: {
    totalFocusTimeSeconds: number;
    completedFocusSessions: number;
    completedShortBreakSessions: number;
    completedLongBreakSessions: number;
  }[];
  dailyStats: DailyPomodoroStat[];
  taskStats: PomodoroTaskStat[];
  projectStats: PomodoroProjectStat[];
}

export const getPomodoroStats: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "You are not logged in.",
      });
      return;
    }

    const { period, timezone } = res.locals
      .validatedQuery as GetPomodoroStatsQuery;

    const { startDate, endDate } = getPomodoroStatsDateRange(period, timezone);

    const [result] =
      await PomodoroSession.aggregate<PomodoroStatsAggregationResult>([
        {
          $match: {
            user: new Types.ObjectId(userId),
            completedAt: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $facet: {
            summary: [
              {
                $group: {
                  _id: null,
                  totalFocusTimeSeconds: {
                    $sum: {
                      $cond: [
                        { $eq: ["$sessionType", "focus"] },
                        "$actualDurationSeconds",
                        0,
                      ],
                    },
                  },
                  completedFocusSessions: {
                    $sum: {
                      $cond: [{ $eq: ["$sessionType", "focus"] }, 1, 0],
                    },
                  },
                  completedShortBreakSessions: {
                    $sum: {
                      $cond: [{ $eq: ["$sessionType", "shortBreak"] }, 1, 0],
                    },
                  },
                  completedLongBreakSessions: {
                    $sum: {
                      $cond: [{ $eq: ["$sessionType", "longBreak"] }, 1, 0],
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  totalFocusTimeSeconds: 1,
                  completedFocusSessions: 1,
                  completedShortBreakSessions: 1,
                  completedLongBreakSessions: 1,
                },
              },
            ],
            dailyStats: [
              {
                $match: {
                  sessionType: "focus",
                },
              },
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$completedAt",
                      timezone,
                    },
                  },
                  focusTimeSeconds: {
                    $sum: "$actualDurationSeconds",
                  },
                  completedSessions: {
                    $sum: 1,
                  },
                },
              },
              {
                $sort: {
                  _id: 1,
                },
              },
              {
                $project: {
                  _id: 0,
                  date: "$_id",
                  focusTimeSeconds: 1,
                  completedSessions: 1,
                },
              },
            ],
            taskStats: [
              {
                $match: {
                  sessionType: "focus",
                },
              },
              {
                $group: {
                  _id: "$task",
                  focusTimeSeconds: {
                    $sum: "$actualDurationSeconds",
                  },
                  completedSessions: {
                    $sum: 1,
                  },
                },
              },
              {
                $lookup: {
                  from: "tasks",
                  localField: "_id",
                  foreignField: "_id",
                  as: "task",
                },
              },
              {
                $unwind: {
                  path: "$task",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  _id: 0,
                  taskId: "$_id",
                  taskTitle: {
                    $ifNull: ["$task.title", "Unassigned"],
                  },
                  focusTimeSeconds: 1,
                  completedSessions: 1,
                },
              },
              {
                $sort: {
                  focusTimeSeconds: -1,
                },
              },
            ],
            projectStats: [
              {
                $match: {
                  sessionType: "focus",
                },
              },
              {
                $group: {
                  _id: "$project",
                  focusTimeSeconds: {
                    $sum: "$actualDurationSeconds",
                  },
                  completedSessions: {
                    $sum: 1,
                  },
                },
              },
              {
                $lookup: {
                  from: "projects",
                  localField: "_id",
                  foreignField: "_id",
                  as: "project",
                },
              },
              {
                $unwind: {
                  path: "$project",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  _id: 0,
                  projectId: "$_id",
                  projectTitle: {
                    $ifNull: ["$project.title", "Unassigned"],
                  },
                  focusTimeSeconds: 1,
                  completedSessions: 1,
                },
              },
              {
                $sort: {
                  focusTimeSeconds: -1,
                },
              },
            ],
          },
        },
      ]);

    const dailyStatsMap = new Map(
      (result?.dailyStats ?? []).map((item) => [item.date, item]),
    );

    const dailyStats = getPomodoroStatsDateKeys(
      startDate,
      endDate,
      timezone,
    ).map(
      (date) =>
        dailyStatsMap.get(date) ?? {
          date,
          focusTimeSeconds: 0,
          completedSessions: 0,
        },
    );

    res.status(200).json({
      status: "success",
      data: {
        stats: result?.summary[0] ?? {
          totalFocusTimeSeconds: 0,
          completedFocusSessions: 0,
          completedShortBreakSessions: 0,
          completedLongBreakSessions: 0,
        },
        dailyStats,
        taskStats: result?.taskStats ?? [],
        projectStats: result?.projectStats ?? [],
      },
    });
  } catch (error) {
    next(error);
  }
};
