import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../project.api";
import { PROJECTS_QUERY_KEY } from "./useFetchProjects";
import { OVERVIEW_QUERY_KEY } from "../../overview/hooks/useFetchOverviewSummary";

export function useCreateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECTS_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: OVERVIEW_QUERY_KEY,
      });
    },
  });

  return {
    createProject: mutation.mutateAsync,
    isCreating: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
