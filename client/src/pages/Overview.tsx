import { Box } from "@mui/material";
import TodayTasksPanel from "../features/overview/components/TodayTasksPanel";
import RecentProjectsPanel from "../features/overview/components/RecentProjectsPanel";
import { useFetchOverviewSummary } from "../features/overview/hooks/useFetchOverviewSummary";
import OverviewGreeting from "../features/overview/components/OverviewGreeting";
import OverviewSummary from "../features/overview/components/OverviewSummary";
import TaskSchedulePanel from "../features/overview/components/TaskSchedulePanel";
import OverviewPageSkeleton from "../features/overview/components/skeletons/OverviewPageSkeleton";

function OverviewPage() {
  const { data, isLoading } = useFetchOverviewSummary();

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <OverviewGreeting />
      <OverviewSummary summary={summary} />

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
        <TodayTasksPanel tasks={todayTasks} />

        <TaskSchedulePanel
          overdueTasks={overdueTasks}
          upcomingTasks={upcomingTasks}
          completedTasks={completedTasks}
        />
      </Box>

      <RecentProjectsPanel projects={recentProjects} />
    </Box>
  );
}

export default OverviewPage;
