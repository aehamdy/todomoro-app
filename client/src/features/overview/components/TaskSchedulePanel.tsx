import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Paper, Stack } from "@mui/material";

import type { Task } from "../../tasks/task.types";
import type { DashboardOutletContext } from "../../../components/layout/DashboardLayout";

import TaskItem from "../../tasks/components/TaskItem";
import TaskScheduleTabs from "./TaskScheduleTabs";
import UpcomingTaskItem from "./UpcomingTaskItem";
import EmptyTaskList from "../../tasks/components/EmptyTaskList";
import { getActivePomodoroTask } from "../../tasks/utils/getActivePomodoroTask";

type TaskSchedulePanelProps = {
  overdueTasks: Task[];
  upcomingTasks: Task[];
  completedTasks: Task[];
};

function TaskSchedulePanel({
  overdueTasks,
  upcomingTasks,
  completedTasks,
}: TaskSchedulePanelProps) {
  const [activeTab, setActiveTab] = useState<
    "overdue" | "upcoming" | "completed"
  >("overdue");

  const { setSelectedTask, setActivePomodoroTask } =
    useOutletContext<DashboardOutletContext>();

  const selectedTab = {
    overdue: overdueTasks,
    upcoming: upcomingTasks,
    completed: completedTasks,
  };

  const displayedTasks = selectedTab[activeTab];

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
      <Stack sx={{ flex: 1, minHeight: 0, gap: 2.5 }}>
        <TaskScheduleTabs
          activeTab={activeTab}
          overdueCount={overdueTasks?.length}
          upcomingCount={upcomingTasks?.length}
          completedCount={completedTasks?.length}
          onChange={setActiveTab}
        />

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            pr: 0.5,
          }}
        >
          {displayedTasks?.length === 0 ? (
            <EmptyTaskList
              title={
                activeTab === "overdue"
                  ? "You're all caught up!"
                  : activeTab === "upcoming"
                    ? "Your schedule is clear"
                    : "Nothing completed yet"
              }
              description={
                activeTab === "overdue"
                  ? "You don't have any overdue tasks. Keep it that way!"
                  : activeTab === "upcoming"
                    ? "You don't have any upcoming tasks for the next 7 days."
                    : "Completed tasks will appear here."
              }
            />
          ) : (
            <Stack spacing={0}>
              {activeTab === "overdue" || activeTab === "completed"
                ? displayedTasks?.map((task) => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onClick={() => setSelectedTask(task)}
                      displayProject
                      onPlay={handlePlayTask}
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
