import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import { BarChart } from "@mui/x-charts/BarChart";
import type { PomodoroDailyStat } from "../../types/pomodoro-stats.types";
import { formatFocusTime } from "../../utils/pomodoro-stats.utils";

type PomodoroDailyChartProps = {
  dailyStats: PomodoroDailyStat[];
};

function formatDateLabel(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  // Construct a local date to avoid UTC date-shift issues.
  const localDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
  }).format(localDate);
}

function PomodoroDailyChart({ dailyStats }: PomodoroDailyChartProps) {
  const theme = useTheme();

  const chartData = dailyStats.map((stat) => ({
    date: stat.date,
    focusTime: stat.focusTimeSeconds,
    completedSessions: stat.completedSessions,
  }));

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Daily Focus Activity
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Your completed focus time for each day.
          </Typography>
        </Box>

        {dailyStats.length === 0 ? (
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              minHeight: 220,
              py: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "action.hover",
                color: "text.secondary",
              }}
            >
              <QueryStatsRoundedIcon />
            </Box>

            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              No focus activity yet
            </Typography>

            <Typography
              variant="caption"
              sx={{
                maxWidth: 260,
                color: "text.secondary",
              }}
            >
              Complete a Pomodoro focus session to see your daily focus activity
              here.
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ width: "100%", minWidth: 0 }}>
            <BarChart
              dataset={chartData}
              height={280}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "date",
                  valueFormatter: (value) => formatDateLabel(value),
                  tickLabelStyle: {
                    fontSize: 12,
                  },
                  // Optional: Adjust category gap ratio if you want thinner/wider bars (e.g., 0.3 to 0.7)
                  categoryGapRatio: 0.3,
                },
              ]}
              yAxis={[
                {
                  valueFormatter: (value: string) =>
                    formatFocusTime(Number(value)),
                  width: 65,
                },
              ]}
              series={[
                {
                  dataKey: "focusTime",
                  label: "Focus Time",
                  valueFormatter: (value) =>
                    value == null ? "" : formatFocusTime(value),
                  color: theme.palette.primary.main,
                },
              ]}
              grid={{ horizontal: true }}
              borderRadius={6}
              margin={{
                top: 20,
                right: 16,
                bottom: 30,
                left: 12,
              }}
              sx={{
                "& .MuiChartsAxis-line": {
                  stroke: theme.palette.text.secondary,
                },
                "& .MuiChartsAxis-tick": {
                  stroke: theme.palette.text.secondary,
                },
                "& .MuiChartsAxis-tickLabel": {
                  fill: theme.palette.text.primary,
                },
                "& .MuiChartsGrid-line": {
                  stroke: theme.palette.divider,
                  strokeDasharray: "4 4",
                },
              }}
            />
          </Box>
        )}
      </Stack>
    </Paper>
  );
}

export default PomodoroDailyChart;
