import type { Task } from "../task.types";
import { Chip, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import type { TaskPriority } from "../task.types";

type TaskItemProps = {
  task: Task;
  index: number;
  tasksLength: number;
};

const priorityColors: Record<
  TaskPriority,
  "error" | "warning" | "info" | "default"
> = {
  urgent: "error",
  high: "warning",
  medium: "info",
  low: "default",
};

function formatDueDate(dueDate: string | null): string {
  if (!dueDate) return "No due date";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(dueDate));
}

function TaskItem({ task, index, tasksLength }: TaskItemProps) {
  return (
    <ListItem
      divider={index !== tasksLength - 1}
      disableGutters
      sx={{ py: 2, alignItems: "flex-start" }}
    >
      <ListItemText
        primary={
          <Stack>
            <Typography
              sx={{
                fontWeight: 600,
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>

            <Typography>{task.note}</Typography>
          </Stack>
        }
        secondary={
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{
              mt: 1,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={task.priority}
              size="small"
              color={priorityColors[task.priority]}
            />
            <Chip
              label={task.isCompleted ? "Completed" : "Pending"}
              size="small"
              variant="outlined"
            />
            <Chip
              label={formatDueDate(task.dueDate)}
              size="small"
              variant="outlined"
            />
          </Stack>
        }
      />
    </ListItem>
  );
}

export default TaskItem;
