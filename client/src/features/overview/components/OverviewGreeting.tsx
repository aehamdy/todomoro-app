import { Box, Stack, Typography } from "@mui/material";

function OverviewGreeting() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        bgcolor: "primary.main",
        // Richer gradient overlay for depth
        backgroundImage: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.05) 100%)",
        // Stronger shadow so it pops out of the page
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0px 10px 30px rgba(0, 0, 0, 0.4)"
            : "0px 10px 30px rgba(0, 0, 0, 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontSize: { xs: 16, md: 18 },
            fontWeight: 600,
            color: "primary.contrastText",
            letterSpacing: "-0.02em",
          }}
        >
          Good to see you, Ahmed! 👋
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            fontSize: { xs: 12, md: 16 },
            color: "primary.contrastText",
            opacity: 0.85,
          }}
        >
          Ready to conquer the day? Let's get things done 🚀
        </Typography>
      </Stack>
    </Box>
  );
}

export default OverviewGreeting;
