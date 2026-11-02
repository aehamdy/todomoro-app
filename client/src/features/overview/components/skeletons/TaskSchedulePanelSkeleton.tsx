import { Paper, Skeleton, Stack } from "@mui/material";
import TaskListSkeleton from "../../../tasks/components/skeletons/TaskListSkeleton";

function TaskSchedulePanelSkeleton() {
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
      <Stack sx={{ flex: 1, minHeight: 0, gap: 1 }}>
        {/* Tabs Skeleton */}
        <Stack direction="row" spacing={1}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={90}
              height={36}
              sx={{ flex: 1, borderRadius: 1 }}
            />
          ))}
        </Stack>

        <TaskListSkeleton />
      </Stack>
    </Paper>
  );
}

export default TaskSchedulePanelSkeleton;
