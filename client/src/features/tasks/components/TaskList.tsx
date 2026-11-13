import { Box, Button, List, Paper } from "@mui/material";
import { useFetchTasks } from "../hooks/useFetchTasks";
import TaskItem from "./TaskItem";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";
import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import EmptyTaskList from "./EmptyTaskList";
import { useAuth } from "../../auth/hooks/useAuth";
import type { Task } from "../task.types";
import { getActivePomodoroTask } from "../utils/getActivePomodoroTask";

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
  const { setSelectedTask, setActivePomodoroTask } =
    useOutletContext<DashboardOutletContext>();
  const [isShowCompleted, setIsShowCompleted] = useState<boolean>(false);

  const { tasks, isLoading, error, isError, refetch } =
    useFetchTasks(projectId);
  const { user } = useAuth();

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const inCompleteTasks = tasks.filter((task) => !task.isCompleted);

  const completedCount = completedTasks.length;
  const incompleteCount = tasks.length - completedCount;

  const addNewTasksToTop = user?.preferences.addNewTasksToTop ?? false;

  const displayedTasks = useMemo(() => {
    if (!addNewTasksToTop) return inCompleteTasks;

    return [...inCompleteTasks].reverse();
  }, [inCompleteTasks, addNewTasksToTop]);

  // const handlePlayTask = useCallback(
  //   (task: Task) => {
  //     const project =
  //       task.project && typeof task.project !== "string" ? task.project : null;

  //     setActivePomodoroTask({
  //       taskId: task._id,
  //       title: task.title,
  //       projectId:
  //         project?._id ??
  //         (typeof task.project === "string" ? task.project : null),
  //       projectTitle: project?.title ?? null,
  //     });
  //   },
  //   [setActivePomodoroTask],
  // );
  const handlePlayTask = (task: Task) => {
    setActivePomodoroTask(getActivePomodoroTask(task));
  };

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
        <>
          <List
            sx={{
              maxHeight: "450px",
              overflowY: "auto",
            }}
          >
            {displayedTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onClick={() => setSelectedTask(task)}
                onPlay={handlePlayTask}
              />
            ))}
          </List>

          {completedCount >= 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 1,
              }}
            >
              <Button
                onClick={() => setIsShowCompleted(!isShowCompleted)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {isShowCompleted ? (
                  <>
                    Hide completed tasks
                    <ExpandLessRoundedIcon />
                  </>
                ) : (
                  <>
                    Show completed tasks
                    <ExpandMoreRoundedIcon />
                  </>
                )}
              </Button>
            </Box>
          )}

          {isShowCompleted && (
            <List
              sx={{
                maxHeight: "450px",
                overflowY: "auto",
              }}
            >
              {completedTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onClick={() => setSelectedTask(task)}
                />
              ))}
            </List>
          )}
        </>
      )}
    </Paper>
  );
}

export default TaskList;
