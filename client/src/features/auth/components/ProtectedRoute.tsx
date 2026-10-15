import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../useAuth";

export default function ProtectedRoute() {
  const { user, isLoading, isUnauthenticated, error } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress aria-label="Checking authentication" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }} role="alert">
        We couldn't verify your session. Please check your connection and try
        again.
      </Box>
    );
  }

  if (isUnauthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
