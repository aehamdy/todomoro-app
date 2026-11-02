import { Box, Paper, Skeleton, Stack } from "@mui/material";

function TaskOverviewSkeleton() {
  return (
    <Paper
      elevation={3}
      aria-hidden="true"
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 3, md: 4 },
        borderRadius: { xs: 2, md: 3 },
      }}
    >
      <Stack sx={{ gap: 3 }}>
        {/* Header Skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>

        {/* Stats Section Skeleton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "space-around", md: "space-evenly" },
            alignItems: "center",
          }}
        >
          {/* Completed Stat Column Skeleton */}
          {Array.from({ length: 2 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width={90} height={24} />
              <Skeleton variant="text" width={60} height={100} />
              <Skeleton variant="text" width={100} height={20} />
            </Box>
          ))}
        </Box>

        {/* Completion Progress Skeleton */}
        <Stack spacing={1}>
          <Skeleton variant="text" width={200} height={20} />
          <Skeleton
            variant="rounded"
            width="100%"
            height={8}
            sx={{ borderRadius: 4 }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default TaskOverviewSkeleton;
