import { Stack } from "@mui/material";
import type { Task } from "../../tasks/task.types";
import DateBlock from "./DateBlock";
import TaskInformation from "./TaskInformation";

type UpcomingTaskItemProps = {
  task: Task;
};

function UpcomingTaskItem({ task }: UpcomingTaskItemProps) {
  if (task.dueDate === null) return null;

  const date = new Date(task.dueDate);

  const formattedDate = {
    month: new Intl.DateTimeFormat(undefined, {
      month: "short",
    }).format(date),

    day: new Intl.DateTimeFormat(undefined, {
      day: "numeric",
    }).format(date),

    weekday: new Intl.DateTimeFormat(undefined, {
      weekday: "short",
    }).format(date),
  };

  const project =
    task.project && typeof task.project !== "string" ? task.project : null;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        position: "relative",
        py: 1.25,
        borderRadius: 2,
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <DateBlock
        dateDay={formattedDate.day}
        dateMonth={formattedDate.month}
        dateWeekday={formattedDate.weekday}
      />

      <TaskInformation
        taskDuedate={task.dueDate}
        taskTitle={task.title}
        projectColor={project?.color}
        projectTitle={project?.title}
        taskPriority={task.priority}
      />
    </Stack>
  );
}

export default UpcomingTaskItem;
