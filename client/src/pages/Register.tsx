import { Container, Paper, Stack, Typography } from "@mui/material";
import RegisterForm from "../features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
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
            Create your account
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Start organizing your tasks with Todomoro.
          </Typography>
        </Stack>

        <RegisterForm />
      </Paper>
    </Container>
  );
}

export default RegisterPage;
