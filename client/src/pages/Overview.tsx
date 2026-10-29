import { Box } from "@mui/material";
import TodayTasksPanel from "../features/overview/components/TodayTasksPanel";
import UpcomingTasksPanel from "../features/overview/components/UpcomingTasksPanel";
import RecentProjectsPanel from "../features/overview/components/RecentProjectsPanel";
import { useFetchOverviewSummary } from "../features/overview/hooks/useFetchOverviewSummary";
import OverviewGreeting from "../features/overview/components/OverviewGreeting";
import OverviewSummary from "../features/overview/components/OverviewSummary";

function OverviewPage() {
  const { data } = useFetchOverviewSummary();

  const summary = data?.data.summary;
  const todayTasks = data?.data.todayTasks;
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

        <UpcomingTasksPanel tasks={upcomingTasks} />
      </Box>

      <RecentProjectsPanel projects={recentProjects} />
    </Box>
  );
}

export default OverviewPage;
