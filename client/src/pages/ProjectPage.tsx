import { Box, Stack } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskList from "../features/tasks/components/TaskList";
import TaskOverview from "../components/common/TaskOverview";
import TasksPageSkeleton from "../features/tasks/components/skeletons/TasksPageSkeleton";

const MotionBox = motion.create(Box);

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const shouldReduceMotion = useReducedMotion();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  const handleTaskCountChange = useCallback(
    (completed: number, incomplete: number) => {
      setCompletedCount(completed);
      setIncompleteCount(incomplete);
    },
    [],
  );

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

  if (!projectId) {
    return null;
  }

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
            <CreateTaskForm projectId={projectId} />
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
          projectId={projectId}
          onTaskCountChange={handleTaskCountChange}
          setIsLoadingData={setIsLoadingData}
        />
      </MotionBox>
    </Stack>
  );
}

export default ProjectPage;
