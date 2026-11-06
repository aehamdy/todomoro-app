import { useState, type MouseEvent } from "react";
import {
  Alert,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import { useFetchPomodoroStats } from "../features/pomodoro/hooks/useFetchPomodoroStats";
import type { PomodoroStatsPeriod } from "../features/pomodoro/types/pomodoro-stats.types";
import PageHeading from "../components/ui/PageHeading";
import PomodoroStatsSummary from "../features/pomodoro/components/statistics/PomodoroStatsSummary";
import PomodoroDailyChart from "../features/pomodoro/components/statistics/PomodoroDailyChart";
import PomodoroStatsBreakdowns from "../features/pomodoro/components/statistics/PomodoroStatsBreakdowns";
import { fadeScaleVariants } from "../animations/animationVariants";

const MotionBox = motion.create(Box);

const periodOptions: {
  value: PomodoroStatsPeriod;
  label: string;
}[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
];

function StatisticsPage() {
  const [period, setPeriod] = useState<PomodoroStatsPeriod>("month");

  const shouldReduceMotion = useReducedMotion();

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
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={fadeScaleVariants}
      >
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
      </MotionBox>

      {isError && (
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeScaleVariants}
        >
          <Alert severity="error">
            Failed to load your Pomodoro statistics. Please try again.
          </Alert>
        </MotionBox>
      )}

      {!isLoading && data?.data && (
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
            <PomodoroStatsSummary stats={data.data.stats} />
          </MotionBox>

          <MotionBox variants={fadeScaleVariants}>
            <PomodoroDailyChart dailyStats={data.data.dailyStats} />
          </MotionBox>

          <MotionBox variants={fadeScaleVariants}>
            <PomodoroStatsBreakdowns
              taskStats={data.data.taskStats}
              projectStats={data.data.projectStats}
            />
          </MotionBox>
        </MotionBox>
      )}
    </Stack>
  );
}

export default StatisticsPage;
