import { Paper, Stack, Skeleton } from "@mui/material";
import RecentProjectItemSkeleton from "./RecentProjectItemSkeleton";

function RecentProjectsPanelSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        minWidth: 0,
      }}
    >
      <Stack
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2.5,
        }}
      >
        {/* Header Skeleton */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Skeleton variant="text" width={140} height={28} />
          <Skeleton variant="circular" width={24} height={24} />
        </Stack>

        {/* Projects Horizontal/Column Items Skeletons */}
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: "stretch",
            gap: 1,
            width: "100%",
          }}
        >
          <RecentProjectItemSkeleton variant="secondary" />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default RecentProjectsPanelSkeleton;
