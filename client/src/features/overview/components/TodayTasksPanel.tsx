import { Box, Paper, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import TaskItem from "../../tasks/components/TaskItem";
import type { Task } from "../../tasks/task.types";
import TodayTasksHeader from "./TodayTasksHeader";
import { useOutletContext } from "react-router-dom";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";
import CompletionProgress from "../../../components/common/CompletionProgress";

type TodayTasksPanelProps = {
  tasks: Task[];
};

function TodayTasksPanel({ tasks }: TodayTasksPanelProps) {
  const { setSelectedTask } = useOutletContext<DashboardOutletContext>();

  const completedCount = useMemo(
    () => tasks?.filter((task) => task.isCompleted).length,
    [tasks],
  );

  const incompleteCount = useMemo(
    () => tasks?.filter((task) => !task.isCompleted).length,
    [tasks],
  );

  const total = completedCount + incompleteCount;

  if (!tasks) return <div>No data yet</div>;

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
            <Box
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <Typography variant="body1" sx={{ fontweight: 600 }}>
                You&apos;re all caught up!
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Nothing scheduled for today.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={0}>
              {tasks.map((task) => {
                return (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onClick={() => setSelectedTask(task)}
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
