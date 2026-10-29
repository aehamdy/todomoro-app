import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "./useFetchTasks";
import { updateTask } from "../api/task.api";
import { OVERVIEW_QUERY_KEY } from "../../overview/hooks/useFetchOverviewSummary";

interface ToggleTaskVariables {
  taskId: string;
  isCompleted: boolean;
}

export function useToggleTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, isCompleted }: ToggleTaskVariables) =>
      updateTask(taskId, { isCompleted }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: OVERVIEW_QUERY_KEY,
      });
    },
  });

  return {
    toggleTask: mutation.mutateAsync,
    isToggling: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}
