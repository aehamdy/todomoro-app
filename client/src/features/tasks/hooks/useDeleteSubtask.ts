import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSubtask } from "../api/subtask.api";
import { TASKS_QUERY_KEY } from "./useTasks";

type deleteSubtaskInput = {
  taskId: string;
  subtaskId: string;
};

export function useDeleteSubtask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, subtaskId }: deleteSubtaskInput) =>
      removeSubtask(taskId, subtaskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });
    },
  });

  return {
    deleteTask: mutation.mutate,
    isDeleting: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    reset: mutation.reset,
  };
}
