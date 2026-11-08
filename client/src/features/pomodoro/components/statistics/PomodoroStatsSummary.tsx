import { Box, Paper, Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import CoffeeRoundedIcon from "@mui/icons-material/CoffeeRounded";
import WeekendRoundedIcon from "@mui/icons-material/WeekendRounded";
import type { ReactNode } from "react";
import type { PomodoroStatsSummary as PomodoroStatsSummaryData } from "../../types/pomodoro-stats.types";
import { formatFocusTime } from "../../utils/pomodoro-stats.utils";

type SummaryCardData = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
};

type PomodoroStatsSummaryProps = {
  stats: PomodoroStatsSummaryData;
};

function PomodoroStatsSummary({ stats }: PomodoroStatsSummaryProps) {
  const cards: SummaryCardData[] = [
    {
      title: "Focus Time",
      value: formatFocusTime(stats.totalFocusTimeSeconds),
      icon: <AccessTimeRoundedIcon />,
      color: "primary.main",
    },
    {
      title: "Focus Sessions",
      value: stats.completedFocusSessions,
      icon: <TimerRoundedIcon />,
      color: "success.main",
    },
    {
      title: "Short Breaks",
      value: stats.completedShortBreakSessions,
      icon: <CoffeeRoundedIcon />,
      color: "warning.main",
    },
    {
      title: "Long Breaks",
      value: stats.completedLongBreakSessions,
      icon: <WeekendRoundedIcon />,
      color: "info.main",
    },
  ];

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
        <Paper
          key={card.title}
          elevation={0}
          sx={{
            minWidth: 0,
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={2}>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                {card.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: 34,
                  height: 34,
                  borderRadius: 1.5,
                  bgcolor: "action.hover",
                  color: card.color,
                }}
              >
                {card.icon}
              </Box>
            </Stack>

            <Typography
              variant="h4"
              component="p"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.5rem", sm: "1.875rem" },
                overflowWrap: "anywhere",
                color: card.color,
              }}
            >
              {card.value}
            </Typography>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export default PomodoroStatsSummary;
