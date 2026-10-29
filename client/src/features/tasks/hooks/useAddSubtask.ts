import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSubtask } from "../api/subtask.api";
import { TASKS_QUERY_KEY } from "./useFetchTasks";
import { OVERVIEW_QUERY_KEY } from "../../overview/hooks/useFetchOverviewSummary";

type AddSubtaskVariables = {
  taskId: string;
  subtaskData: {
    title: string;
  };
};

export function useAddSubtask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, subtaskData }: AddSubtaskVariables) =>
      addSubtask(taskId, subtaskData),

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
    addSubtask: mutation.mutate,
    isAdding: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
