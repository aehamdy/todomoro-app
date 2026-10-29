import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubtask } from "../api/subtask.api";
import { TASKS_QUERY_KEY } from "./useFetchTasks";
import { OVERVIEW_QUERY_KEY } from "../../overview/hooks/useFetchOverviewSummary";

type updateTaskInput = {
  taskId: string;
  subtaskId: string;
  subtaskData: { title?: string; isCompleted?: boolean };
};

export function useUpdateSubtask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, subtaskId, subtaskData }: updateTaskInput) =>
      updateSubtask(taskId, subtaskId, subtaskData),

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
    updateTask: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
