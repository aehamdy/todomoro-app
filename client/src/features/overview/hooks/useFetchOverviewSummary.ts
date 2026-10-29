import { useQuery } from "@tanstack/react-query";
import { fetchOverviewSummary } from "../overview.api";

export function useFetchOverviewSummary() {
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchOverviewSummary,
  });

  return {
    data: query.data,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
