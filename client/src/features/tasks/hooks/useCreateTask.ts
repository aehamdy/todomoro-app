import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../task.api";
import { TASKS_QUERY_KEY } from "../useTasks";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });
    },
  });

  return {
    createTask: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    reset: mutation.reset,
  };
}
