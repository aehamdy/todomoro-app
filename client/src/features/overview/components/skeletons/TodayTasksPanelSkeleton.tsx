import { Box, Paper, Skeleton, Stack } from "@mui/material";
import TaskListSkeleton from "../../../tasks/components/skeletons/TaskListSkeleton";

function TodayTasksPanelSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: { xs: 480, md: 560 },
        boxSizing: "border-box",
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        minWidth: 0,
      }}
    >
      <Stack
        sx={{
          gap: 2.5,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Header Skeleton (Matches TodayTasksHeader) */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}>
            <Skeleton variant="text" width={120} height={32} />
            <Skeleton
              variant="rounded"
              width={32}
              height={20}
              sx={{ borderRadius: 1 }}
            />
          </Stack>
          <Skeleton variant="circular" width={28} height={28} />
        </Stack>

        {/* Completion Progress Skeleton */}
        <Stack spacing={1}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton variant="text" width={160} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Stack>
          <Skeleton
            variant="rounded"
            width="100%"
            height={8}
            sx={{ borderRadius: 4 }}
          />
        </Stack>

        {/* Task List Scroll Container Skeleton */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            pr: 1,
          }}
        >
          <TaskListSkeleton />
        </Box>
      </Stack>
    </Paper>
  );
}

export default TodayTasksPanelSkeleton;
