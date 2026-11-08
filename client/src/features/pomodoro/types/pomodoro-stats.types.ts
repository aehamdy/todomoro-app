export type PomodoroStatsPeriod = "today" | "week" | "month";

export interface GetPomodoroStatsParams {
  period: PomodoroStatsPeriod;
  timezone: string;
}

export interface PomodoroStatsSummary {
  totalFocusTimeSeconds: number;
  completedFocusSessions: number;
  completedShortBreakSessions: number;
  completedLongBreakSessions: number;
}

export interface PomodoroDailyStat {
  date: string;
  focusTimeSeconds: number;
  shortBreakTimeSeconds: number;
  longBreakTimeSeconds: number;
  completedSessions: number;
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

export interface GetPomodoroStatsResponse {
  status: "success";
  data: {
    stats: PomodoroStatsSummary;
    dailyStats: PomodoroDailyStat[];
    taskStats: PomodoroTaskStat[];
    projectStats: PomodoroProjectStat[];
  };
}
