import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../project.api";
import { PROJECTS_QUERY_KEY } from "./useFetchProjects";
import { OVERVIEW_QUERY_KEY } from "../../overview/hooks/useFetchOverviewSummary";

export function useUpdateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProject,

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
    updateProject: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
