import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTasks } from "./task.api";

export const TASKS_QUERY_KEY = ["tasks"] as const;

export function useTasks() {
  const query = useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: getTasks,
    retry: (failureCount, error) => {
      // A 401 means the user is not authenticated.
      // Don't repeatedly retry an expected authentication failure.
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
