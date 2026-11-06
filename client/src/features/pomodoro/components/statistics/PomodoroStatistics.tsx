import { useState, type MouseEvent } from "react";
import { Alert, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

import PageHeading from "../../../../components/ui/PageHeading";
import { useFetchPomodoroStats } from "../../hooks/useFetchPomodoroStats";
import PomodoroStatsSummary from "./PomodoroStatsSummary";

import type { PomodoroStatsPeriod } from "../../types/pomodoro-stats.types";
import PomodoroDailyChart from "./PomodoroDailyChart";
import PomodoroStatsBreakdowns from "./PomodoroStatsBreakdowns";

const periodOptions: {
  value: PomodoroStatsPeriod;
  label: string;
}[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

function PomodoroStatistics() {
  const [period, setPeriod] = useState<PomodoroStatsPeriod>("month");

  const { data, isLoading, isError } = useFetchPomodoroStats(period);

  const handlePeriodChange = (
    _event: MouseEvent<HTMLElement>,
    newPeriod: PomodoroStatsPeriod | null,
  ) => {
    if (newPeriod) {
      setPeriod(newPeriod);
    }
  };

  return (
    <Stack spacing={3}>
      <PageHeading
        title="Pomodoro Statistics"
        description="Track your focus sessions and productivity over time."
        action={
          <ToggleButtonGroup
            exclusive
            size="small"
            value={period}
            onChange={handlePeriodChange}
            aria-label="Statistics period"
          >
            {periodOptions.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                sx={{
                  px: { xs: 1.25, sm: 2 },
                  textTransform: "none",
                  fontWeight: 600,
                  color: "text.secondary",
                  "&.Mui-selected": {
                    color: "primary.main",
                    bgcolor: "secondary.lighter",
                  },
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        }
      />

      {isError && (
        <Alert severity="error">
          Failed to load your Pomodoro statistics. Please try again.
        </Alert>
      )}

      {!isLoading && data?.data && (
        <>
          <PomodoroStatsSummary stats={data.data.stats} />

          <PomodoroDailyChart dailyStats={data.data.dailyStats} />

          <PomodoroStatsBreakdowns
            taskStats={data.data.taskStats}
            projectStats={data.data.projectStats}
          />
        </>
      )}
    </Stack>
  );
}

export default PomodoroStatistics;
