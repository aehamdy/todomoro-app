export const pomodoroStatsPeriods = ["today", "week", "month"] as const;

export type PomodoroStatsPeriod = (typeof pomodoroStatsPeriods)[number];

export interface GetPomodoroStatsQuery {
  period: PomodoroStatsPeriod;
  timezone: string;
}

export interface PomodoroTaskStat {
  taskId: string | null;
  taskTitle: string;
  focusTimeSeconds: number;
  completedSessions: number;
}

export interface PomodoroProjectStat {
  projectId: string | null;
  projectTitle: string;
  focusTimeSeconds: number;
  completedSessions: number;
}
