import { useQuery } from "@tanstack/react-query";
import { getPomodoroStats } from "../api/pomodoro-stats.api";
import { POMODORO_STATS_QUERY_KEY } from "../pomodoro.constants";
import type { PomodoroStatsPeriod } from "../types/pomodoro-stats.types";

export function useFetchPomodoroStats(period: PomodoroStatsPeriod = "today") {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return useQuery({
    queryKey: [...POMODORO_STATS_QUERY_KEY, period, timezone],
    queryFn: () => getPomodoroStats({ period, timezone }),
  });
}
