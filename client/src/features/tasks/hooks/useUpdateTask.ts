import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateTaskRequest } from "../task.types";
import { TASKS_QUERY_KEY } from "./useFetchTasks";
import { updateTask } from "../api/task.api";
import { PROJECTS_QUERY_KEY } from "../../projects/hooks/useFetchProjects";
import { OVERVIEW_QUERY_KEY } from "../../overview/hooks/useFetchOverviewSummary";

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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: OVERVIEW_QUERY_KEY,
      });
    },
  });

  return {
    updateTask: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
  };
}
