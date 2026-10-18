import { Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatDateTime } from "../../../utils/utils";

function TaskDate({ taskDate }: { taskDate: string | Date }) {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
        mx: -0.5,
        borderRadius: 1,
      }}
    >
      <Typography
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", gap: "6px" }}
      >
        <CalendarMonthIcon color="inherit" />
        Task Date
      </Typography>
      {formatDateTime(taskDate)}
    </Stack>
  );
}

export default TaskDate;
