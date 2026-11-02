import { Paper, List, Skeleton, Stack } from "@mui/material";

type TaskListSkeletonProps = {
  count?: number;
};

function TaskListSkeleton({ count = 4 }: TaskListSkeletonProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: "450px",
          overflowY: "hidden",
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Checkbox & Title */}
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1.5,
                flex: 1,
              }}
            >
              <Skeleton variant="circular" width={22} height={22} />
              <Skeleton variant="text" width="60%" height={24} />
            </Stack>

            {/* Tag/Date & Options */}
            <Skeleton
              variant="rounded"
              width={60}
              height={22}
              sx={{ borderRadius: 1 }}
            />
          </Paper>
        ))}
      </List>
    </Paper>
  );
}

export default TaskListSkeleton;
