import { Box, Chip, Stack, Typography } from "@mui/material";
import { getDayLabel } from "../overview.utils";
import type { TaskPriority } from "../../tasks/task.types";
import TaskProjectInfo from "./TaskProjectInfo";

type TaskInformationProps = {
  taskDuedate: string;
  taskTitle: string;
  projectColor: string | undefined;
  projectTitle: string | undefined;
  taskPriority: TaskPriority;
};

const priorityColors = {
  low: "success",
  medium: "warning",
  high: "error",
  urgent: "error",
} as const;

function TaskInformation({
  taskDuedate,
  taskTitle,
  projectColor,
  projectTitle,
  taskPriority,
}: TaskInformationProps) {
  const priorityColor = priorityColors[taskPriority];

  return (
    <Box sx={{ flex: 1, minWidth: 0, py: 0.25 }}>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 0.5,
          color: "text.secondary",
        }}
      >
        {getDayLabel(taskDuedate)}
      </Typography>

      <Typography
        variant="body2"
        sx={{ fontWeight: 600, overflowWrap: "anywhere" }}
      >
        {taskTitle}
      </Typography>

      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
          flexWrap: "wrap",
          mt: 0.75,
        }}
        useFlexGap
      >
        {/* <Box
          sx={{
            width: 7,
            height: 7,
            flexShrink: 0,
            borderRadius: "50%",
            bgcolor: projectColor ?? "text.disabled",
          }}
        />

        <Typography variant="caption" color="text.secondary" noWrap>
          {projectTitle ?? "Tasks"}
        </Typography> */}
        <TaskProjectInfo
          projectTitle={projectTitle}
          projectColor={projectColor}
        />

        <Chip
          size="small"
          label={taskPriority}
          color={priorityColor}
          variant="outlined"
          sx={{
            height: 21,
            fontSize: "0.68rem",
            textTransform: "capitalize",
            "& .MuiChip-label": {
              px: 0.75,
            },
          }}
        />
      </Stack>
    </Box>
  );
}

export default TaskInformation;
