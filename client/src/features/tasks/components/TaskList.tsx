import { Chip, List, Paper, Stack, Typography } from "@mui/material";
import { useTasks } from "../useTasks";

import TaskItem from "./TaskItem";
import TasksEmptyList from "./TasksEmptyList";
import AppLoader from "../../../components/ui/AppLoader";
import ErrorAlert from "../../../components/ui/ErrorAlert";

function TaskList() {
  const { tasks, isLoading, error, isError, refetch } = useTasks();

  if (isLoading) return <AppLoader message="Loading tasks..." />;

  if (isError) {
    return (
      <ErrorAlert
        message={
          error instanceof Error
            ? error.message
            : "We couldn't load your tasks. Please try again."
        }
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          mb: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          My Tasks
        </Typography>

        <Chip label={`${tasks.length} total`} size="small" />
      </Stack>

      {tasks.length === 0 ? (
        <TasksEmptyList />
      ) : (
        <List disablePadding>
          {tasks.map((task, index) => (
            <TaskItem
              key={task._id}
              task={task}
              index={index}
              tasksLength={tasks.length}
            />
          ))}
        </List>
      )}
    </Paper>
  );
}

export default TaskList;
