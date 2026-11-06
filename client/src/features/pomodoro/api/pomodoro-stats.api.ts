import api from "../../../lib/api";
import { POMODORO_ROUTES } from "../pomodoro.routes";
import type {
  GetPomodoroStatsParams,
  GetPomodoroStatsResponse,
} from "../types/pomodoro-stats.types";

export async function getPomodoroStats(
  params: GetPomodoroStatsParams,
): Promise<GetPomodoroStatsResponse> {
  const response = await api.get<GetPomodoroStatsResponse>(
    POMODORO_ROUTES.stats,
    { params },
  );

  return response.data;
}
