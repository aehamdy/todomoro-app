import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ThemePreference } from "./auth.types";
import { updateUserPreferences } from "./auth.api";
import { AUTH_QUERY_KEY } from "./useAuth";

export function useUpdateUserPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (theme: ThemePreference) => updateUserPreferences(theme),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: AUTH_QUERY_KEY,
      });
    },
  });
}
