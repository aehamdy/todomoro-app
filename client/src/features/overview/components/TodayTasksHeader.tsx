import { Box, Stack, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

type TodayTasksHeaderProps = {
  completedCount: number;
  tasksLength: number;
};

function TodayTasksHeader({
  completedCount,
  tasksLength,
}: TodayTasksHeaderProps) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Today's focus
        </Typography>

        <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
          {completedCount} of {tasksLength} tasks completed
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 38,
          height: 38,
          borderRadius: 2.5,
          bgcolor: "action.hover",
          color: "primary.main",
        }}
      >
        <AssignmentIcon fontSize="small" sx={{ color: "primary.main" }} />
      </Box>
    </Stack>
  );
}

export default TodayTasksHeader;
