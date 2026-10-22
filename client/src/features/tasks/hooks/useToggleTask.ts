import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "./useTasks";
import { updateTask } from "../api/task.api";

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
    },
  });

  return {
    toggleTask: mutation.mutateAsync,
    isToggling: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}
