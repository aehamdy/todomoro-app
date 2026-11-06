import { Box } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import TodayTasksPanel from "../features/overview/components/TodayTasksPanel";
import RecentProjectsPanel from "../features/overview/components/RecentProjectsPanel";
import { useFetchOverviewSummary } from "../features/overview/hooks/useFetchOverviewSummary";
import OverviewGreeting from "../features/overview/components/OverviewGreeting";
import OverviewSummary from "../features/overview/components/OverviewSummary";
import TaskSchedulePanel from "../features/overview/components/TaskSchedulePanel";
import OverviewPageSkeleton from "../features/overview/components/skeletons/OverviewPageSkeleton";
import { fadeScaleVariants } from "../animations/animationVariants";

const MotionBox = motion.create(Box);

function OverviewPage() {
  const { data, isLoading } = useFetchOverviewSummary();
  const shouldReduceMotion = useReducedMotion();

  if (isLoading) return <OverviewPageSkeleton />;

  const todayTasks = data?.data.todayTasks;
  const overdueTasks = data?.data.overdueTasks;

  const summary = {
    ...data?.data.summary,
    dueToday: todayTasks?.length,
    overdue: overdueTasks?.length,
  };

  const completedTasks = data?.data.completedTasks;
  const upcomingTasks = data?.data.upcomingTasks;
  const recentProjects = data?.data.recentProjects;

  return (
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
      <MotionBox variants={fadeScaleVariants}>
        <OverviewGreeting />
      </MotionBox>

      <MotionBox variants={fadeScaleVariants}>
        <OverviewSummary summary={summary} />
      </MotionBox>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "minmax(0, 1fr) minmax(0, 1fr)",
            lg: "minmax(0, 3fr) minmax(0, 2fr)",
          },
          gap: { xs: 1.5, sm: 2 },
          alignItems: "start",
        }}
      >
        <MotionBox variants={fadeScaleVariants}>
          <TodayTasksPanel tasks={todayTasks} />
        </MotionBox>

        <MotionBox variants={fadeScaleVariants}>
          <TaskSchedulePanel
            overdueTasks={overdueTasks}
            upcomingTasks={upcomingTasks}
            completedTasks={completedTasks}
          />
        </MotionBox>
      </Box>

      <MotionBox variants={fadeScaleVariants}>
        <RecentProjectsPanel projects={recentProjects} />
      </MotionBox>
    </MotionBox>
  );
}

export default OverviewPage;
