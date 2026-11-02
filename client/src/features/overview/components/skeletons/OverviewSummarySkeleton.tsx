import { Paper, Stack, Skeleton, Box } from "@mui/material";

function OverviewSummarySkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
        },
        gap: { xs: 1.5, sm: 1.5 },
      }}
    >
      {[1, 2, 3, 4].map((item) => (
        <Paper
          key={item}
          elevation={0}
          sx={{
            height: "100%",
            p: 1.5,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Stack sx={{ gap: 1 }}>
            {/* Header Skeleton (Matches SummaryCardHeader layout: Icon + Title) */}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width="55%" height={24} />
            </Stack>

            {/* Inner Content Box Skeleton (Matches inner-content-box styling & padding) */}
            <Stack
              sx={{
                gap: 2,
                py: 2,
                px: 1.5,
                bgcolor: "background.default",
                borderRadius: 1,
              }}
            >
              {/* Value & Label Skeleton */}
              <Stack sx={{ gap: 0.5 }}>
                <Skeleton variant="text" width="40%" height={36} />
                <Skeleton variant="text" width="65%" height={20} />
              </Stack>

              {/* Message & Secondary Icon Skeleton */}
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Skeleton variant="circular" width={16} height={16} />
                <Skeleton variant="text" width="50%" height={20} />
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export default OverviewSummarySkeleton;
