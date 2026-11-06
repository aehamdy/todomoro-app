import { Box, Button, Stack } from "@mui/material";
import type { PomodoroTimerState } from "../types/pomodoro.types";

interface PomodoroControlsProps {
  timer: PomodoroTimerState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
  onNext: () => void;
}

function PomodoroControls({
  timer,
  onStart,
  onPause,
  onResume,
  onStop,
  onNext,
}: PomodoroControlsProps) {
  return (
    <Stack
      sx={{
        direction: "row",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {(timer.status === "idle" ||
        timer.status === "stopped" ||
        timer.status === "cancelled") && (
        <Button variant="contained" onClick={onStart}>
          Start
        </Button>
      )}

      {timer.status === "running" && (
        <Button variant="contained" onClick={onPause}>
          Pause
        </Button>
      )}

      {timer.status === "paused" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button variant="contained" onClick={onResume}>
            Continue
          </Button>

          <Button variant="outlined" color="error" onClick={onStop}>
            Stop
          </Button>
        </Box>
      )}

      {timer.status === "completed" && (
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      )}
    </Stack>
  );
}

export default PomodoroControls;
