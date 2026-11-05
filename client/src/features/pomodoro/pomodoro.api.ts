import api from "../../lib/api";
import { POMODORO_ROUTES } from "./pomodoro.routes";
import type {
  CreatePomodoroSessionRequest,
  CreatePomodoroSessionResponse,
} from "./pomodoro.types";

export async function createPomodoroSession(
  sessionData: CreatePomodoroSessionRequest,
): Promise<CreatePomodoroSessionResponse> {
  const response = await api.post<CreatePomodoroSessionResponse>(
    POMODORO_ROUTES.sessions,
    sessionData,
  );

  return response.data;
}
