import { Box, Stack } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import TaskList from "../features/tasks/components/TaskList";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskOverview from "../components/common/TaskOverview";
import TasksPageSkeleton from "../features/tasks/components/skeletons/TasksPageSkeleton";

const MotionBox = motion.create(Box);

function TasksPage() {
  const shouldReduceMotion = useReducedMotion();

  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const handleTaskCountChange = (completed: number, incomplete: number) => {
    setCompletedCount(completed);
    setIncompleteCount(incomplete);
  };

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

  return (
    <Stack spacing={3}>
      {isLoadingData ? (
        <TasksPageSkeleton />
      ) : (
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
            gap: 3,
          }}
        >
          <MotionBox variants={sectionVariants}>
            <TaskOverview
              completed={completedCount}
              incomplete={incompleteCount}
            />
          </MotionBox>

          <MotionBox variants={sectionVariants}>
            <CreateTaskForm projectId={null} />
          </MotionBox>
        </MotionBox>
      )}

      <MotionBox
        initial="hidden"
        animate={isLoadingData ? "hidden" : "visible"}
        variants={sectionVariants}
        sx={{
          display: isLoadingData ? "none" : "block",
        }}
      >
        <TaskList
          projectId={null}
          onTaskCountChange={handleTaskCountChange}
          setIsLoadingData={setIsLoadingData}
        />
      </MotionBox>
    </Stack>
  );
}

export default TasksPage;
