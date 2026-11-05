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
import PomodoroTimer from "./PomodoroTimer";
import PomodoroControls from "./PomodoroControls";
import PomodoroSessionSelector from "./PomodoroSessionSelector";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer";
import type { PomodoroPreferences } from "../pomodoro.types";
import { useCallback, useEffect, useState } from "react";
import { useBackgroundSound } from "../hooks/useBackgroundSound";
import { usePomodoroDocumentTitle } from "../hooks/usePomodoroDocumentTitle";

interface PomodoroTimerContainerProps {
  preferences: PomodoroPreferences;
}

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

function PomodoroTimerContainer({ preferences }: PomodoroTimerContainerProps) {
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
  } = usePomodoroTimer({ preferences });

  usePomodoroDocumentTitle(timer);

  const {
    play: playBackgroundSound,
    pause: pauseBackgroundSound,
    stop: stopBackgroundSound,
  } = useBackgroundSound({
    sound: preferences.selectedBackgroundSound,
    volume: preferences.backgroundSoundVolume,
  });

  const handleStart = useCallback(() => {
    start();

    if (preferences.autoPlayBackgroundSound) {
      void playBackgroundSound().catch((error: unknown) => {
        console.error("Failed to play background sound:", error);
      });
    }
  }, [start, preferences.autoPlayBackgroundSound, playBackgroundSound]);

  const handleResume = useCallback(() => {
    resume();

    if (preferences.autoPlayBackgroundSound) {
      void playBackgroundSound().catch((error: unknown) => {
        console.error("Failed to resume background sound:", error);
      });
    }
  }, [resume, preferences.autoPlayBackgroundSound, playBackgroundSound]);

  const isSessionLocked =
    timer.status === "running" || timer.status === "paused";

  useEffect(() => {
    if (timer.status === "paused") {
      pauseBackgroundSound();
      return;
    }

    if (timer.status === "idle" || timer.status === "stopped") {
      stopBackgroundSound();
      return;
    }

    // A completed session is immediately handled by usePomodoroTimer.
    // Wait for the resulting next-session state.
    if (timer.status === "completed") {
      return;
    }

    if (
      timer.status === "running" &&
      preferences.autoPlayBackgroundSound &&
      preferences.selectedBackgroundSound !== "none"
    ) {
      void playBackgroundSound().catch((error: unknown) => {
        console.error("Failed to play background sound:", error);
      });

      return;
    }

    stopBackgroundSound();
  }, [
    timer.status,
    timer.sessionType,
    preferences.autoPlayBackgroundSound,
    preferences.selectedBackgroundSound,
    playBackgroundSound,
    pauseBackgroundSound,
    stopBackgroundSound,
  ]);
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
            sx={{ color: "inherit" }}
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
              onStart={handleStart}
              onPause={pause}
              onResume={handleResume}
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
              onStart={handleStart}
              onPause={pause}
              onResume={handleResume}
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

export default PomodoroTimerContainer;
