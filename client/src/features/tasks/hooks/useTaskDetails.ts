import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTaskById } from "../task.api";

export function useTaskDetails(taskId: string | null) {
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: Boolean(taskId),
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }

      return failureCount < 1;
    },
  });

  return {
    task: query.data?.data.task ?? null,
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
}
