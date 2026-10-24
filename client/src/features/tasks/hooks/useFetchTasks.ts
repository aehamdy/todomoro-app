import axios from "axios";
import { getTasks } from "../api/task.api";
import { useQuery } from "@tanstack/react-query";

export const TASKS_QUERY_KEY = ["tasks"] as const;

export function useFetchTasks(projectId: string | null) {
  const query = useQuery({
    queryKey: [...TASKS_QUERY_KEY, projectId],
    queryFn: () => getTasks(projectId),
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }

      return failureCount < 1;
    },
  });

  return {
    tasks: query.data?.data.tasks ?? [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
    refetch: query.refetch,
  };
}
