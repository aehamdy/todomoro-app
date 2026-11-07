import { Box, Paper, Stack, Typography } from "@mui/material";
import LoginForm from "../features/auth/components/LoginForm";
import Logo from "../components/layout/AppLogo";

function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        p: { xs: 1, sm: 2 },
        display: "flex",
        alignItems: "stretch",
        bgcolor: "#FFF",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          minHeight: { xs: "calc(100dvh - 16px)", sm: "calc(100dvh - 32px)" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
          borderRadius: { xs: 4, md: 5 },
          bgcolor: "#222222",
        }}
      >
        {/* Branding panel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: { xs: "100%", md: "65%" },
            minHeight: { xs: 260, md: "auto" },
            p: { xs: 3, sm: 5, md: 6 },
            color: "#FFFFFF",
            borderRadius: { xs: 4, md: 0 },
          }}
        >
          <Logo color="light" />

          {/* Main tagline */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              py: { xs: 4, md: 0 },
              px: { xs: 0, sm: 2 },
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{
                maxWidth: 650,
                fontWeight: 300,
                fontSize: {
                  xs: "1.15rem",
                  sm: "1.5rem",
                  md: "1.65rem",
                },
                lineHeight: 1.6,
                letterSpacing: "0.5px",
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            >
              A simple space to plan, focus, and make progress.
            </Typography>
          </Box>

          {/* Footer */}
          <Typography
            variant="body2"
            sx={{
              display: { xs: "none", sm: "block" },
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.55)",
            }}
          >
            Make every day a little more intentional.
          </Typography>
        </Box>

        {/* Login form panel */}
        <Box
          sx={{
            flex: { xs: 1, md: "initial" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", md: "35%" },
            p: { xs: 3, sm: 5, md: 4, lg: 6 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 380,
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
      </Paper>
    </Box>
  );
}

export default LoginPage;
