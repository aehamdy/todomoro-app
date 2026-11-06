import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPomodoroSession } from "../api/pomodoro.api";
import { POMODORO_STATS_QUERY_KEY } from "../pomodoro.constants";

export function useCreatePomodoroSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPomodoroSession,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: POMODORO_STATS_QUERY_KEY,
      });
    },
  });
}
