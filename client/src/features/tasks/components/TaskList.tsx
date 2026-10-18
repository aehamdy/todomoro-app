import { Chip, List, Paper, Stack } from "@mui/material";
import { useTasks } from "../useTasks";
import TaskItem from "./TaskItem";
import TasksEmptyList from "./TasksEmptyList";
import AppLoader from "../../../components/ui/AppLoader";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { priorityColors } from "../task.constants";
import { blue } from "@mui/material/colors";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";

function TaskList() {
  const { setSelectedTask } = useOutletContext<DashboardOutletContext>();
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
        bgcolor: "transparent",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: "dlex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Chip
          label={`${tasks.length} Total`}
          size="medium"
          sx={{ fontSize: "14px", color: "white", bgcolor: blue[400] }}
        />

        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Chip
            label="Low"
            size="medium"
            sx={{
              color: `${priorityColors["low"].text}`,
              bgcolor: `${priorityColors["low"].bg}`,
            }}
          />
          <Chip
            label="Medium"
            size="medium"
            sx={{
              color: `${priorityColors["medium"].text}`,
              bgcolor: `${priorityColors["medium"].bg}`,
            }}
          />
          <Chip
            label="High"
            size="medium"
            sx={{
              color: `${priorityColors["high"].text}`,
              bgcolor: `${priorityColors["high"].bg}`,
            }}
          />
          <Chip
            label="Urgent"
            size="medium"
            sx={{
              color: `${priorityColors["urgent"].text}`,
              bgcolor: `${priorityColors["urgent"].bg}`,
            }}
          />
        </Stack>
      </Stack>

      {tasks.length === 0 ? (
        <TasksEmptyList />
      ) : (
        <List disablePadding>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onClick={() => setSelectedTask(task)}
            />
          ))}
        </List>
      )}
    </Paper>
  );
}

export default TaskList;
