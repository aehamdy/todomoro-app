import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../task.api";
import { TASKS_QUERY_KEY } from "./useTasks";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });
    },
  });

  return {
    deleteTask: mutation.mutate,
    isDeleting: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}
