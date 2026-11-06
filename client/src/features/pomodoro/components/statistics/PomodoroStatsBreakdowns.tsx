import { Box } from "@mui/material";
import type {
  PomodoroTaskStat,
  PomodoroProjectStat,
} from "../../types/pomodoro-stats.types";
import BreakdownCard from "./BreakdownCard";

type BreakdownItem = {
  id: string | null;
  title: string;
  focusTimeSeconds: number;
  completedSessions: number;
};

type PomodoroStatsBreakdownsProps = {
  taskStats: PomodoroTaskStat[];
  projectStats: PomodoroProjectStat[];
};

function PomodoroStatsBreakdowns({
  taskStats,
  projectStats,
}: PomodoroStatsBreakdownsProps) {
  const tasks: BreakdownItem[] = taskStats.map((stat) => ({
    id: stat.taskId,
    title: stat.taskTitle,
    focusTimeSeconds: stat.focusTimeSeconds,
    completedSessions: stat.completedSessions,
  }));

  const projects: BreakdownItem[] = projectStats.map((stat) => ({
    id: stat.projectId,
    title: stat.projectTitle,
    focusTimeSeconds: stat.focusTimeSeconds,
    completedSessions: stat.completedSessions,
  }));

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          md: "repeat(2, minmax(0, 1fr))",
        },
        gap: { xs: 1.5, sm: 2 },
        alignItems: "start",
      }}
    >
      <BreakdownCard
        title="Focus Time by Task"
        description="See which tasks receive the most focus."
        items={tasks}
        emptyMessage="No task activity for this period yet."
      />

      <BreakdownCard
        title="Focus Time by Project"
        description="See how your projects contribute to your focus time."
        items={projects}
        emptyMessage="No project activity for this period yet."
      />
    </Box>
  );
}

export default PomodoroStatsBreakdowns;
