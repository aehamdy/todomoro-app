import { Box } from "@mui/material";
import OverviewSummarySkeleton from "./OverviewSummarySkeleton";
import TodayTasksPanelSkeleton from "./TodayTasksPanelSkeleton";
import OverviewGreetingSkeleton from "./OverviewGreetingSkeleton";
import RecentProjectsPanelSkeleton from "./RecentProjectsPanelSkeleton";
import TaskSchedulePanelSkeleton from "./TaskSchedulePanelSkeleton";

function OverviewPageSkeleton() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <OverviewGreetingSkeleton />
      <OverviewSummarySkeleton />

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
        <TodayTasksPanelSkeleton />

        <TaskSchedulePanelSkeleton />
      </Box>

      <RecentProjectsPanelSkeleton />
    </Box>
  );
}

export default OverviewPageSkeleton;
