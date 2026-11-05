export const pomodoroStatsPeriods = ["today", "week", "month"] as const;

export type PomodoroStatsPeriod = (typeof pomodoroStatsPeriods)[number];

export interface GetPomodoroStatsQuery {
  period: PomodoroStatsPeriod;
  timezone: string;
}
