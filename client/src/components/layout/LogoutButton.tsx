import { Logout } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/auth.api";
import { ROUTES } from "../../routes/paths";
import axios from "axios";
import ErrorAlert from "../ui/ErrorAlert";

function LogoutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await logoutUser();

      queryClient.clear();
      navigate(ROUTES.login, { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setLogoutError(
          error.response?.data?.message ??
            "We couldn't log you out. Please try again.",
        );
      } else {
        setLogoutError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Logout />}
        onClick={handleLogout}
        disabled={isLoggingOut}
        sx={{ color: "red", borderColor: "red" }}
      >
        {isLoggingOut ? "Logging out..." : "Log out"}
      </Button>

      {logoutError && (
        <Box sx={{ mb: 3 }}>
          <ErrorAlert message={logoutError} />
        </Box>
      )}
    </>
  );
}

export default LogoutButton;
