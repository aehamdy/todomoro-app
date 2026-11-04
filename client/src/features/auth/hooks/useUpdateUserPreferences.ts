import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserPreferencesData } from "../auth.types";
import { updateUserPreferences } from "../auth.api";
import { AUTH_QUERY_KEY } from "./useAuth";

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: UpdateUserPreferencesData) =>
      updateUserPreferences(preferences),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AUTH_QUERY_KEY,
      });
    },
  });
}
