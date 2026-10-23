import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../project.api";

export function useFetchProjects() {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return {
    projects: query.data?.data.projects ?? [],
    isLoading: query.isPending,
    error: query.error,
    isError: query.isError,
  };
}
