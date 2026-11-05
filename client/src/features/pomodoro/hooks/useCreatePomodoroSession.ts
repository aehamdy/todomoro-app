import { useMutation } from "@tanstack/react-query";
import { createPomodoroSession } from "../pomodoro.api";

export function useCreatePomodoroSession() {
  return useMutation({
    mutationFn: createPomodoroSession,
  });
}
