import { RequestHandler } from "express";
import PomodoroSession from "../models/pomodoro-session.model.js";
import { getPomodoroStatsDateRange } from "../utils/pomodoro-stats.utils.js";
import type { GetPomodoroStatsQuery } from "../types/pomodoro-stats.types.js";
import { Types } from "mongoose";

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

    const matchingSessions = await PomodoroSession.countDocuments({
      user: new Types.ObjectId(userId),
      completedAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const [result] = await PomodoroSession.aggregate([
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
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats: result?.summary[0] ?? {
          totalFocusTimeSeconds: 0,
          completedFocusSessions: 0,
          completedShortBreakSessions: 0,
          completedLongBreakSessions: 0,
        },
        dailyStats: result?.dailyStats ?? [],
      },
    });
  } catch (error) {
    next(error);
  }
};
