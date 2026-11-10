import { Box, Stack, Typography } from "@mui/material";
import LoginForm from "../features/auth/components/LoginForm";
import AuthContainer from "../components/common/AuthContainer";

function LoginPage() {
  return (
    <AuthContainer>
      <Box
        sx={{
          flex: { xs: 1, md: "initial" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", lg: "70%" },
          height: "100%",
          p: { xs: 3, sm: 5, md: 4, lg: 6 },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%", lg: "100%" },
          }}
        >
          <Stack spacing={0.5} sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              Welcome back
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.55)" }}
            >
              Log in to pick up where you left off.
            </Typography>
          </Stack>

          <LoginForm />
        </Box>
      </Box>
    </AuthContainer>
  );
}

export default LoginPage;
