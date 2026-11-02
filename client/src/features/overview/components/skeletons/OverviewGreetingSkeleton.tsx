import { Box, Skeleton, Stack } from "@mui/material";

function OverviewGreetingSkeleton() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        bgcolor: "primary.main",
        backgroundImage: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.05) 100%)",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0px 10px 30px rgba(0, 0, 0, 0.4)"
            : "0px 10px 30px rgba(0, 0, 0, 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack spacing={1}>
        {/* Title skeleton */}
        <Skeleton
          variant="text"
          width="45%"
          height={28}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.25)" }}
        />
        {/* Subtitle skeleton */}
        <Skeleton
          variant="text"
          width="70%"
          height={22}
          sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
        />
      </Stack>
    </Box>
  );
}

export default OverviewGreetingSkeleton;
