import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCurrentUser } from "./auth.api";

export const AUTH_QUERY_KEY = ["auth", "user"] as const;

export function useAuth() {
  const query = useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: getCurrentUser,
    retry: (failureCount, error) => {
      // An unauthenticated user is an expected state, not a transient failure.
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }

      return failureCount < 1;
    },
  });

  const isUnauthenticated =
    axios.isAxiosError(query.error) && query.error.response?.status === 401;

  return {
    user: query.data?.data.user ?? null,
    isLoading: query.isPending,
    isUnauthenticated,
    error: query.error && !isUnauthenticated ? query.error : null,
  };
}
