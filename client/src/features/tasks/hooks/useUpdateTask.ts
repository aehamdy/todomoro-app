import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTaskRequest } from "../task.types";
import { TASKS_QUERY_KEY } from "./useFetchTasks";
import { updateTask } from "../api/task.api";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      taskId,
      taskData,
    }: {
      taskId: string;
      taskData: UpdateTaskRequest;
    }) => updateTask(taskId, taskData),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });
    },
  });

  return {
    updateTask: mutation.mutate,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}
