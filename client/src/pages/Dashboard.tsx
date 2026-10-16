import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Logout, TaskAlt } from "@mui/icons-material";
import { logoutUser } from "../features/auth/auth.api";
import { AUTH_QUERY_KEY, useAuth } from "../features/auth/useAuth";
import { ROUTES } from "../routes/paths";
import TaskList from "../features/tasks/components/TaskList";
import PageHeading from "../components/ui/PageHeading";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await logoutUser();

      queryClient.removeQueries({
        queryKey: AUTH_QUERY_KEY,
        exact: true,
      });

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
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Box
        component="header"
        sx={{
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            minHeight: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
            <TaskAlt color="primary" fontSize="large" />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Todomoro
            </Typography>
          </Stack>

          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={4}>
          {logoutError && (
            <Alert severity="error" role="alert">
              {logoutError}
            </Alert>
          )}

          <PageHeading
            title={`Welcome, ${user?.name}!`}
            description="Here's an overview of your tasks."
          />

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "primary.main",
                  fontSize: "1.25rem",
                }}
              >
                {user?.name.trim().charAt(0).toUpperCase() || "U"}
              </Avatar>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {user?.name}
                </Typography>
                <Typography color="text.secondary">{user?.email}</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              Your workspace
            </Typography>

            <Typography color="text.secondary">
              Your tasks and daily progress will live here. We'll build the task
              management features next.
            </Typography>
          </Paper>

          <TaskList />
        </Stack>
      </Container>
    </Box>
  );
}

export default Dashboard;
