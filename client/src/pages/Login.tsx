import { Container, Paper, Stack, Typography } from "@mui/material";
import LoginForm from "../features/auth/components/LoginForm";

function LoginPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        textAlign: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
        }}
      >
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Login to your account
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Start organizing your tasks with Todomoro.
          </Typography>
        </Stack>

        <LoginForm />
      </Paper>
    </Container>
  );
}

export default LoginPage;
