import { Box, Paper, Stack, Typography } from "@mui/material";
import AppLogo from "../layout/AppLogo";
import type { ReactNode } from "react";

type AuthContainerProps = {
  children: ReactNode;
};

function AuthContainer({ children }: AuthContainerProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        p: { xs: 0.5, md: 1 },
        display: "flex",
        alignItems: "stretch",
        bgcolor: "#FFF",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: { xs: "calc(100dvh - 16px)", sm: "calc(100dvh - 32px)" },
          bgcolor: "#3F51C7",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBlock: "16px",
          }}
        >
          <AppLogo color="light" />
        </Box>

        {/* Wrapper */}
        <Stack
          sx={{
            flexDirection: { xs: "column-reverse", lg: "row" },
            height: "100%",
          }}
        >
          {/* Branding panel */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "100%" },
              p: { xs: 3, sm: 5, md: 6 },
              color: "#FFFFFF",
              borderRadius: { xs: 4, md: 0 },
            }}
          >
            {/* Main tagline */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                px: { xs: 0, sm: 2 },
                py: { xs: 4, md: 0 },
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{
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
                  maxWidth: 650,
                }}
              >
                A simple space to plan, focus, and make progress.
              </Typography>

              {/* Footer */}
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.55)",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Make every day a little more intentional.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ height: "100%", width: "100%" }}>{children}</Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AuthContainer;
