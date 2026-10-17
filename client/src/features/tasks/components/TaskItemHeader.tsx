import { Box, Chip, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

type TaskItemHeaderProps = {
  priority: string;
  dueDate: string | null;
};

const getPriorityColor = (
  priority: string,
): "success" | "info" | "warning" | "error" | "default" => {
  switch (priority.toLowerCase()) {
    case "low":
      return "success"; // Green
    case "medium":
      return "info"; // Blue
    case "high":
      return "warning"; // Orange/Yellow
    case "urgent":
      return "error"; // Red
    default:
      return "default";
  }
};

function TaskItemHeader({ priority, dueDate }: TaskItemHeaderProps) {
  const formatDateTime = (
    isoDate: string | Date,
  ): { date: string; time: string } => {
    const stringDate =
      typeof isoDate === "string" ? isoDate : isoDate.toISOString();
    const date: Date = new Date(stringDate);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  const formattedDateTime = dueDate ? formatDateTime(dueDate) : null;

  return (
    <Box sx={{ display: "flex", justifyContent: "end", bgcolor: "red" }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Chip
          label={priority}
          color={getPriorityColor(priority)}
          size="small"
          variant="outlined"
        />

        {formattedDateTime && (
          <Typography sx={{ color: grey[400] }}>
            {formattedDateTime.date}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default TaskItemHeader;
