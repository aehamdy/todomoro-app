import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY_KEY } from "./useFetchTasks";
import { deleteTask } from "../api/task.api";
import { PROJECTS_QUERY_KEY } from "../../projects/hooks/useFetchProjects";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEY,
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
