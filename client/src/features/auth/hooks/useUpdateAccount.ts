import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccount } from "../auth.api";
import type { CurrentUserResponse } from "../auth.types";
import { AUTH_QUERY_KEY } from "./useAuth";

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccount,

    onSuccess: (response) => {
      const updatedUser = response.data.user;

      queryClient.setQueryData<CurrentUserResponse>(
        AUTH_QUERY_KEY,
        (currentData) => {
          if (!currentData?.data?.user) {
            return currentData;
          }

          return {
            ...currentData,
            data: {
              ...currentData.data,
              user: {
                ...currentData.data.user,
                ...updatedUser,
              },
            },
          };
        },
      );
    },
  });
}
