import { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { usePomodoroTimer } from "../hooks/usePomodoroTimer";
import { DEFAULT_POMODORO_PREFERENCES } from "../pomodoro.constants";

import PomodoroTimer from "./PomodoroTimer";
import PomodoroControls from "./PomodoroControls";
import PomodoroSessionSelector from "./PomodoroSessionSelector";

const SESSION_LABELS = {
  focus: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
} as const;

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function PomodoroWidget() {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    timer,
    start,
    pause,
    resume,
    stop,
    reset,
    selectSession,
    nextSession,
  } = usePomodoroTimer({
    preferences: DEFAULT_POMODORO_PREFERENCES,
  });

  const isSessionLocked =
    timer.status === "running" || timer.status === "paused";

  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        {/* Widget header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            Pomodoro
          </Typography>

          <IconButton
            size="small"
            aria-label={isExpanded ? "Collapse timer" : "Expand timer"}
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
          </IconButton>
        </Box>

        {/* Compact view */}
        {!isExpanded && (
          <Stack sx={{ gap: 0.5, alignItems: "center" }}>
            <Typography variant="caption" color="text.secondary">
              {SESSION_LABELS[timer.sessionType]}
            </Typography>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700, fontVariant: "tabular-nums" }}
            >
              {formatTime(timer.remainingTime)}
            </Typography>

            <PomodoroControls
              timer={timer}
              onStart={start}
              onPause={pause}
              onResume={resume}
              onStop={stop}
              onReset={reset}
              onNext={nextSession}
            />
          </Stack>
        )}

        {/* Expanded view */}
        <Collapse in={isExpanded}>
          <Stack spacing={2}>
            <PomodoroSessionSelector
              sessionType={timer.sessionType}
              onChange={selectSession}
              disabled={isSessionLocked}
            />

            <PomodoroTimer timer={timer} />

            <PomodoroControls
              timer={timer}
              onStart={start}
              onPause={pause}
              onResume={resume}
              onStop={stop}
              onReset={reset}
              onNext={nextSession}
            />
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
}

export default PomodoroWidget;
