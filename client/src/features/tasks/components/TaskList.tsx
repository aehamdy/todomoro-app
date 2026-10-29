import { List, Paper } from "@mui/material";
import { useFetchTasks } from "../hooks/useFetchTasks";
import TaskItem from "./TaskItem";
import TasksEmptyList from "./TasksEmptyList";
import AppLoader from "../../../components/ui/AppLoader";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";
import { useEffect } from "react";

type TaskListProps = {
  projectId: string | null;
  onTaskCountChange?: (completed: number, incomplete: number) => void;
};

function TaskList({ projectId, onTaskCountChange }: TaskListProps) {
  const { setSelectedTask } = useOutletContext<DashboardOutletContext>();

  const { tasks, isLoading, error, isError, refetch } =
    useFetchTasks(projectId);

  const completedCount = tasks.filter((task) => task.isCompleted).length;

  const incompleteCount = tasks.length - completedCount;

  useEffect(() => {
    if (!isLoading && !isError) {
      onTaskCountChange?.(completedCount, incompleteCount);
    }
  }, [completedCount, incompleteCount, isLoading, isError, onTaskCountChange]);

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
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      {tasks.length === 0 ? (
        <TasksEmptyList />
      ) : (
        <List
          sx={{
            maxHeight: "450px",
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "divider",
              borderRadius: "4px",
            },
          }}
        >
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
