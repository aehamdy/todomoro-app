import { Box, Stack, Typography } from "@mui/material";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

type UpcomingTasksHeaderProps = {
  tasksLength: number;
};

function UpcomingTasksHeader({ tasksLength }: UpcomingTasksHeaderProps) {
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
          Coming up
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 0.5,
            color: "text.secondary",
          }}
        >
          You have
          <Typography sx={{ fontWeight: 600, color: "warning.main" }}>
            {tasksLength} tasks
          </Typography>
          for the next 7 days
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 38,
          height: 38,
          borderRadius: 2.5,
          bgcolor: "warning.lighter",
          color: "primary.main",
        }}
      >
        <CalendarTodayRoundedIcon
          fontSize="small"
          sx={{ color: "warning.main" }}
        />
      </Box>
    </Stack>
  );
}

export default UpcomingTasksHeader;
