import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // cached query data is considered fresh for 30 seconds.
      retry: 1, // if a query fails, TanStack Query retries it once.
      refetchOnWindowFocus: false, // switching back to the browser tab won't automatically refetch every query.
    },
  },
});

export default queryClient;
