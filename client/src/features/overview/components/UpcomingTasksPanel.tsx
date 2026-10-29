import { Box, Paper, Stack, Typography } from "@mui/material";
import type { Task } from "../../tasks/task.types";
import UpcomingTasksHeader from "./UpcomingTasksHeader";
import DateBlock from "./DateBlock";
import TaskInformation from "./TaskInformation";

type UpcomingTasksPanelProps = {
  tasks: Task[];
};

function UpcomingTasksPanel({ tasks }: UpcomingTasksPanelProps) {
  if (!tasks) return <div>No data yet</div>;

  const formatDate = (value: string) => {
    const date = new Date(value);

    return {
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
  };

  const upcomingTasks = tasks.filter((task) => task.dueDate !== null);

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
          flex: 1,
          minHeight: 0,
          gap: 2.5,
        }}
      >
        <UpcomingTasksHeader tasksLength={tasks.length} />

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            pr: 1,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "action.disabled",
              borderRadius: 3,
            },
          }}
        >
          {/* Timeline */}
          {tasks.length === 0 ? (
            <Box
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Your schedule is clear
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                No upcoming tasks for the next 7 days.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={0}>
              {upcomingTasks.map((task) => {
                if (task.dueDate === null) return null;

                const date = formatDate(task.dueDate);

                const project =
                  task.project && typeof task.project !== "string"
                    ? task.project
                    : null;

                return (
                  <Stack
                    key={task._id}
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
                      dateDay={date.day}
                      dateMonth={date.month}
                      dateWeekday={date.weekday}
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
              })}
            </Stack>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}

export default UpcomingTasksPanel;
