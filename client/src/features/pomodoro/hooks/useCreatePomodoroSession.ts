import { useMutation } from "@tanstack/react-query";
import { createPomodoroSession } from "../api/pomodoro.api";

export function useCreatePomodoroSession() {
  return useMutation({
    mutationFn: createPomodoroSession,
  });
}
