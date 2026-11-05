import { Box, Paper, Stack } from "@mui/material";
import { useMemo } from "react";
import TaskItem from "../../tasks/components/TaskItem";
import type { Task } from "../../tasks/task.types";
import TodayTasksHeader from "./TodayTasksHeader";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";
import CompletionProgress from "../../../components/common/CompletionProgress";
import EmptyTaskList from "../../tasks/components/EmptyTaskList";
import { getActivePomodoroTask } from "../../tasks/utils/getActivePomodoroTask";

type TodayTasksPanelProps = {
  tasks: Task[];
};

function TodayTasksPanel({ tasks }: TodayTasksPanelProps) {
  const { setSelectedTask, setActivePomodoroTask } =
    useOutletContext<DashboardOutletContext>();

  const completedCount = useMemo(
    () => tasks?.filter((task) => task.isCompleted).length,
    [tasks],
  );

  const incompleteCount = useMemo(
    () => tasks?.filter((task) => !task.isCompleted).length,
    [tasks],
  );

  const total = completedCount + incompleteCount;

  const handlePlayTask = (task: Task) => {
    setActivePomodoroTask(getActivePomodoroTask(task));
  };
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
          gap: 2.5,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Header */}
        <TodayTasksHeader />

        {/* Progress */}
        <CompletionProgress
          completed={completedCount}
          incomplete={incompleteCount}
          label={`${completedCount} of ${total} tasks completed`}
        />

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
          {/* Task list */}
          {tasks.length === 0 ? (
            <EmptyTaskList
              title={"You're all caught up!"}
              description={
                "You don't have any tasks scheduled for today. Enjoy the extra time or plan something new!"
              }
            />
          ) : (
            <Stack spacing={0}>
              {tasks.map((task) => {
                return (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onClick={() => setSelectedTask(task)}
                    onPlay={handlePlayTask}
                  />
                );
              })}
            </Stack>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}

export default TodayTasksPanel;
