import { Box, Divider, List } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import NavList from "./NavList";
import ProjectsSection from "../../features/projects/components/ProjectsSection";
import PomodoroWidget from "../../features/pomodoro/components/PomodoroWidget";
import type { ActivePomodoroTask } from "../../features/tasks/task.types";

type AppSidebarProps = {
  collapsed?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  activePomodoroTask: ActivePomodoroTask | null;
  onClearActivePomodoroTask: () => void;
};

const MotionBox = motion.create(Box);

function AppSidebar({
  collapsed = false,
  activePomodoroTask,
  onClearActivePomodoroTask,
}: AppSidebarProps) {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  if (collapsed) return null;

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        minHeight: 0,
        p: 1.5,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
          },
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <MotionBox variants={sectionVariants}>
          <NavList />
        </MotionBox>

        <MotionBox variants={sectionVariants}>
          <Divider />
        </MotionBox>

        <MotionBox variants={sectionVariants}>
          <ProjectsSection />
        </MotionBox>
      </MotionBox>

      <MotionBox
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        sx={{
          mt: "auto",
          flexShrink: 0,
        }}
      >
        <PomodoroWidget
          activeTask={activePomodoroTask}
          onClearActiveTask={onClearActivePomodoroTask}
        />
      </MotionBox>
    </List>
  );
}

export default AppSidebar;
