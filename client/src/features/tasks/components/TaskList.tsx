import { List, Paper } from "@mui/material";
import { useFetchTasks } from "../hooks/useFetchTasks";
import TaskItem from "./TaskItem";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";
import { useEffect, useMemo, type Dispatch, type SetStateAction } from "react";
import EmptyTaskList from "./EmptyTaskList";
import { useAuth } from "../../auth/hooks/useAuth";

type TaskListProps = {
  projectId: string | null;
  onTaskCountChange?: (completed: number, incomplete: number) => void;
  setIsLoadingData?: Dispatch<SetStateAction<boolean>>;
};

function TaskList({
  projectId,
  onTaskCountChange,
  setIsLoadingData,
}: TaskListProps) {
  const { setSelectedTask } = useOutletContext<DashboardOutletContext>();

  const { tasks, isLoading, error, isError, refetch } =
    useFetchTasks(projectId);
  const { user } = useAuth();

  const completedCount = tasks.filter((task) => task.isCompleted).length;

  const incompleteCount = tasks.length - completedCount;

  const addNewTasksToTop = user?.preferences.addNewTasksToTop ?? false;

  const displayedTasks = useMemo(() => {
    if (!addNewTasksToTop) return tasks;

    return [...tasks].reverse();
  }, [tasks, addNewTasksToTop]);

  useEffect(() => {
    if (!isLoading && !isError) {
      onTaskCountChange?.(completedCount, incompleteCount);
    }
  }, [completedCount, incompleteCount, isLoading, isError, onTaskCountChange]);

  useEffect(() => {
    setIsLoadingData?.(isLoading);
  }, [isLoading, setIsLoadingData]);

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
        <EmptyTaskList
          title={
            projectId ? "No tasks in this project" : "No tasks in this list"
          }
          description={
            projectId
              ? "Add tasks to this project to keep everything organized."
              : "Create your first task and start organizing your day."
          }
        />
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
          {displayedTasks.map((task) => (
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
