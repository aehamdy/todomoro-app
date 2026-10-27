import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserPreferences } from "./auth.types";
import { updateUserPreferences } from "./auth.api";
import { AUTH_QUERY_KEY } from "./useAuth";

type UpdatePreferencesData = Partial<UserPreferences>;

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: UpdatePreferencesData) =>
      updateUserPreferences(preferences),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AUTH_QUERY_KEY,
      });
    },
  });
}
