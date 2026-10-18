import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import type { Task } from "../../features/tasks/task.types";
import TaskDetailsSidebar from "../../features/tasks/components/TaskDetailsSidebar";

const HEADER_HEIGHT = 65;

export type DashboardOutletContext = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
};

function DashboardLayout() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <Box
      sx={{
        height: "100dvh",
        overflow: "hidden",
        bgcolor: "grey.50",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: `${HEADER_HEIGHT}px`,
          zIndex: 1200,
        }}
      >
        <AppHeader />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
          mt: `${HEADER_HEIGHT}px`,
          overflow: "hidden",
        }}
      >
        <Box
          component="aside"
          sx={{
            gridColumn: "span 2",
            minWidth: 0,
            height: "100%",
            overflowY: "auto",
            bgcolor: "background.paper",
          }}
        >
          <AppSidebar />
        </Box>

        <Box
          component="main"
          sx={{
            gridColumn: selectedTask ? "span 7" : "span 10",
            minWidth: 0,
            height: "100%",
            overflowY: "auto",
            overscrollBehavior: "contain",
            p: { xs: 2, sm: 3, md: 2 },
            transition: "grid-column 250ms ease",
          }}
        >
          <Outlet
            context={{
              selectedTask,
              setSelectedTask,
            }}
          />
        </Box>

        <Box
          component="aside"
          aria-label="Task details panel"
          sx={{
            gridColumn: selectedTask ? "span 3" : "span 0",
            minWidth: 0,
            height: "100%",
            overflow: "hidden",
            borderLeft: selectedTask ? 1 : 0,
            borderColor: "divider",
            display: selectedTask ? "block" : "none",
            animation: selectedTask
              ? "slideInFromRight 250ms ease-out"
              : "none",
            "@keyframes slideInFromRight": {
              from: {
                opacity: 0,
                transform: "translateX(24px)",
              },
              to: {
                opacity: 1,
                transform: "translateX(0)",
              },
            },
          }}
        >
          {selectedTask && (
            <TaskDetailsSidebar
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
