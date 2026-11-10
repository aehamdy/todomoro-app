import { useState } from "react";
import { useOutlet } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import type { ActivePomodoroTask, Task } from "../../features/tasks/task.types";
import TaskDetailsSidebar from "../../features/tasks/components/TaskDetailsSidebar";
import AnimatedOutlet from "../common/AnimatedOutlet";
import useScreenshotMode from "../../hooks/useScreenshotMode";

const HEADER_HEIGHT = 65;
const SIDEBAR_RAIL_WIDTH = 36;

export type DashboardOutletContext = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  activePomodoroTask: ActivePomodoroTask | null;
  setActivePomodoroTask: (task: ActivePomodoroTask | null) => void;
};

function DashboardLayout() {
  const isScreenshotMode = useScreenshotMode();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activePomodoroTask, setActivePomodoroTask] =
    useState<ActivePomodoroTask | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const closeTaskDetails = () => setSelectedTask(null);

  const outlet = useOutlet({
    selectedTask,
    setSelectedTask,
    activePomodoroTask,
    setActivePomodoroTask,
  });

  return (
    <Box
      sx={{
        height: isScreenshotMode ? "auto" : "100dvh",
        minHeight: isScreenshotMode ? "100vh" : undefined,
        overflow: isScreenshotMode ? "visible" : "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Application header */}
      <Box
        sx={{
          position: isScreenshotMode ? "relative" : "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: `${HEADER_HEIGHT}px`,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <AppHeader />
      </Box>

      {/* Responsive application layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(12, minmax(0, 1fr))",
            md: isSidebarOpen
              ? "repeat(12, minmax(0, 1fr))"
              : `${SIDEBAR_RAIL_WIDTH}px repeat(12, minmax(0, 1fr))`,
            lg: "repeat(12, minmax(0, 1fr))",
          },
          height: isScreenshotMode
            ? "auto"
            : `calc(100dvh - ${HEADER_HEIGHT}px)`,
          minHeight: isScreenshotMode
            ? `calc(100vh - ${HEADER_HEIGHT}px)`
            : undefined,
          mt: isScreenshotMode ? 0 : `${HEADER_HEIGHT}px`,
          overflow: isScreenshotMode ? "visible" : "hidden",
        }}
      >
        {/* Navigation sidebar */}
        <Box
          component="aside"
          sx={{
            display: isMobile ? "none" : "block",
            gridColumn: {
              xs: "1 / -1",
              md: isSidebarOpen ? "span 3" : "1 / 2",
              lg: "span 2",
            },
            position: "relative",
            minWidth: 0,
            height: isScreenshotMode ? "auto" : "100%",
            minHeight: isScreenshotMode ? "100%" : 0,
            bgcolor: "background.sidebar",
            overflow: isScreenshotMode ? "visible" : "hidden",
            transition: "width 250ms ease",
          }}
        >
          <AppSidebar
            mobileOpen={isSidebarOpen}
            onMobileClose={() => setIsSidebarOpen(false)}
            collapsed={!isSidebarOpen && !isMobile && !isDesktop}
            activePomodoroTask={activePomodoroTask}
            onClearActivePomodoroTask={() => setActivePomodoroTask(null)}
          />

          {/* Tablet sidebar toggle */}
          {!isMobile && !isDesktop && !selectedTask && (
            <IconButton
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              onClick={() => setIsSidebarOpen((open) => !open)}
              sx={{
                position: "absolute",
                top: 70,
                right: -16,
                zIndex: theme.zIndex.drawer + 2,
                width: 32,
                height: 32,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            gridColumn: {
              xs: "1 / -1",
              md: isSidebarOpen ? "span 9" : "2 / -1",
              lg: selectedTask ? "span 7" : "span 10",
            },
            minWidth: 0,
            height: isScreenshotMode ? "auto" : "100%",
            overflowY: isScreenshotMode ? "visible" : "auto",
            overscrollBehavior: isScreenshotMode ? "auto" : "contain",
            p: { xs: 1, sm: 1.5, md: 2 },
            transition: "grid-column 250ms ease",
          }}
        >
          <AnimatedOutlet>{outlet}</AnimatedOutlet>
        </Box>

        {/* Inline task details on desktop */}
        {isDesktop && selectedTask && (
          <Box
            component="aside"
            aria-label="Task details panel"
            sx={{
              gridColumn: "span 3",
              minWidth: 0,
              height: isScreenshotMode ? "auto" : "100%",
              overflow: isScreenshotMode ? "visible" : "hidden",
              animation: "slideInFromRight 250ms ease-out",
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
            <TaskDetailsSidebar
              taskId={selectedTask._id}
              onClose={closeTaskDetails}
            />
          </Box>
        )}
      </Box>

      {/* Mobile navigation drawer */}
      {isMobile && (
        <>
          <Drawer
            variant="temporary"
            anchor="left"
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            disableRestoreFocus
            sx={{
              zIndex: 1400,
              "& .MuiDrawer-paper": {
                width: 280,
                maxWidth: "85vw",
                boxSizing: "border-box",
                overflow: "visible",
              },
            }}
          >
            <AppSidebar
              mobileOpen={isSidebarOpen}
              onMobileClose={() => setIsSidebarOpen(false)}
              collapsed={false}
              activePomodoroTask={activePomodoroTask}
              onClearActivePomodoroTask={() => setActivePomodoroTask(null)}
            />
          </Drawer>

          {/* Persistent mobile toggle */}
          {!selectedTask && (
            <IconButton
              aria-label={
                isSidebarOpen
                  ? "Close navigation sidebar"
                  : "Open navigation sidebar"
              }
              onClick={() => setIsSidebarOpen((open) => !open)}
              sx={{
                position: "fixed",
                top: `${HEADER_HEIGHT + 100}px`,
                left: isSidebarOpen ? "min(290px, 85vw)" : 0,
                transform: isSidebarOpen ? "translateX(-50%)" : "translateX(0)",
                // Lower than the Settings modal (1300) so it stays behind it
                zIndex: 1250,
                width: 36,
                height: 40,
                bgcolor: "background.paper",
                borderRadius: "0 8px 8px 0",
                boxShadow: isSidebarOpen ? 0 : 2,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )}
        </>
      )}

      {/* Task details overlay on tablet and mobile */}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          anchor="right"
          open={Boolean(selectedTask)}
          onClose={closeTaskDetails}
          sx={{
            zIndex: 1400,
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: 420 },
              maxWidth: "100%",
              boxSizing: "border-box",
              overflow: "hidden",
            },
          }}
        >
          {selectedTask && (
            <TaskDetailsSidebar
              taskId={selectedTask._id}
              onClose={closeTaskDetails}
            />
          )}
        </Drawer>
      )}
    </Box>
  );
}

export default DashboardLayout;
