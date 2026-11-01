import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Paper, Stack, Typography } from "@mui/material";

import type { Task } from "../../tasks/task.types";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";

import TaskItem from "../../tasks/components/TaskItem";
import TaskScheduleTabs from "./TaskScheduleTabs";
import UpcomingTaskItem from "./UpcomingTaskItem";

type TaskSchedulePanelProps = {
  upcomingTasks: Task[];
  overdueTasks: Task[];
};

function TaskSchedulePanel({
  upcomingTasks,
  overdueTasks,
}: TaskSchedulePanelProps) {
  const [activeTab, setActiveTab] = useState<"overdue" | "upcoming">("overdue");

  const { setSelectedTask } = useOutletContext<DashboardOutletContext>();

  const displayedTasks = activeTab === "overdue" ? overdueTasks : upcomingTasks;

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
      <Stack sx={{ flex: 1, minHeight: 0, gap: 2.5 }}>
        <TaskScheduleTabs
          activeTab={activeTab}
          overdueCount={overdueTasks?.length}
          upcomingCount={upcomingTasks?.length}
          onChange={setActiveTab}
        />

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            pr: 1,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "action.disabled",
              borderRadius: 3,
            },
          }}
        >
          {displayedTasks?.length === 0 ? (
            <Box
              sx={{
                py: 5,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {activeTab === "upcoming"
                  ? "Your schedule is clear"
                  : "You're all caught up!"}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {activeTab === "upcoming"
                  ? "No upcoming tasks for the next 7 days."
                  : "You have no overdue tasks."}
              </Typography>
            </Box>
          ) : (
            <Stack spacing={0}>
              {activeTab === "overdue"
                ? displayedTasks?.map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))
                : displayedTasks?.map((task) => (
                    <UpcomingTaskItem key={task._id} task={task} />
                  ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}

export default TaskSchedulePanel;
