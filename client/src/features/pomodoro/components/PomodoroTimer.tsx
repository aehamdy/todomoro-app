import { Box, Typography } from "@mui/material";
import type { PomodoroTimerState } from "../types/pomodoro.types";

interface PomodoroTimerProps {
  timer: PomodoroTimerState;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function PomodoroTimer({ timer }: PomodoroTimerProps) {
  const timerStatus =
    timer.status === "running"
      ? "In progress"
      : timer.status === "paused"
        ? "Paused"
        : timer.status === "completed"
          ? "Completed"
          : "Ready";

  const progress =
    timer.duration > 0
      ? ((timer.duration - timer.remainingTime) / timer.duration) * 100
      : 0;

  return (
    <Box
      sx={{
        width: 180,
        height: 180,
        position: "relative",
        display: "grid",
        placeItems: "center",
        mx: "auto",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 180 180"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transform: "rotate(-90deg)",
        }}
      >
        <circle
          cx="90"
          cy="90"
          r="78"
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth="7"
        />

        <circle
          cx="90"
          cy="90"
          r="78"
          fill="none"
          stroke="var(--mui-palette-primary-main)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 78}
          strokeDashoffset={2 * Math.PI * 78 * (1 - progress / 100)}
          style={{
            transition: "stroke-dashoffset 0.5s linear",
          }}
        />
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, fontVariant: "tabular-nums" }}
        >
          {formatTime(timer.remainingTime)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {timerStatus}
        </Typography>
      </Box>
    </Box>
  );
}

export default PomodoroTimer;
