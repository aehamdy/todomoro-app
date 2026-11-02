import { Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";

import SummaryCard from "./SummaryCard";

export type DashboardSummaryData = {
  activeTasks: number;
  dueToday: number;
  completedToday: number;
  overdue: number;
};

type DashboardSummaryProps = {
  summary: DashboardSummaryData;
};

function OverviewSummary({ summary }: DashboardSummaryProps) {
  const totalTasksValue = summary.activeTasks;
  const completedTasksValue = summary.completedToday;
  const dueValue = summary.dueToday;
  const overdueValue = summary.overdue;

  const cards = [
    {
      id: 1,
      title: "Total Tasks",
      primaryIcon: <AssignmentIcon />,
      value: summary.activeTasks,
      label: totalTasksValue === 1 ? "Active Task" : "Active Tasks",
      secondaryIcon: <TrendingUpIcon />,
      message:
        summary.activeTasks === 0
          ? "You're free to start something new"
          : "Keep the momentum going!",
      status: "neutral",
    },
    {
      id: 2,
      title: "Completed Tasks",
      primaryIcon: <CheckBoxIcon />,
      value: summary.completedToday,
      label: completedTasksValue === 1 ? "Task" : "Tasks",
      secondaryIcon: <DoneAllIcon />,
      message:
        summary.completedToday === 0
          ? "Your first win is waiting!"
          : "Great work! Keep it up!",
      status: "success",
    },

    {
      id: 3,
      title: "Due Today",
      primaryIcon: <TodayIcon />,
      value: summary.dueToday,
      label: dueValue === 1 ? "Task" : "Tasks",
      secondaryIcon: <AccessTimeIcon />,
      message:
        summary.dueToday === 0
          ? "Nothing on your schedule today"
          : "Make today count!",
      status: "warning",
    },
    {
      id: 4,
      title: "Overdue Tasks",
      primaryIcon: <DateRangeIcon />,
      value: summary.overdue,
      label: overdueValue === 1 ? "Task" : "Tasks",
      secondaryIcon: (
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 9,
            height: 9,
            marginInlineStart: 1.5,
          }}
        >
          {/* Expanding outer wave/ping */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              bgcolor: "error.dark",
              borderRadius: "50%",
              opacity: 0.75,
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              "@keyframes ping": {
                "75%, 100%": {
                  transform: "scale(3.5)",
                  opacity: 0,
                },
              },
            }}
          />

          {/* Solid center dot */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              bgcolor: "error.dark",
              borderRadius: "50%",
            }}
          />
        </Box>
      ),
      message:
        summary.overdue === 0
          ? "You're all caught up. Well done!"
          : summary.overdue === 1
            ? "Needs your attention"
            : "Need your attention",
      status: "error",
    },
  ] as const;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
        },
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      {cards.map((card) => (
        <SummaryCard key={card.id} {...card} />
      ))}
    </Box>
  );
}

export default OverviewSummary;
