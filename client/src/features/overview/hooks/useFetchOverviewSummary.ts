import { useQuery } from "@tanstack/react-query";
import { fetchOverviewSummary } from "../overview.api";

export const OVERVIEW_QUERY_KEY = ["overview"] as const;

export function useFetchOverviewSummary() {
  const query = useQuery({
    queryKey: OVERVIEW_QUERY_KEY,
    queryFn: fetchOverviewSummary,
  });

  return {
    data: query.data,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
