import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PomodoroTimer from "./PomodoroTimer";
import PomodoroControls from "./PomodoroControls";
import PomodoroSessionSelector from "./PomodoroSessionSelector";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer";
import type {
  CompletedPomodoroSession,
  CreatePomodoroSessionRequest,
  PomodoroPreferences,
} from "../types/pomodoro.types";
import { useCallback, useEffect, useState } from "react";
import { useBackgroundSound } from "../hooks/useBackgroundSound";
import { usePomodoroDocumentTitle } from "../hooks/usePomodoroDocumentTitle";
import type { ActivePomodoroTask } from "../../tasks/task.types";
import { useCreatePomodoroSession } from "../hooks/useCreatePomodoroSession";

interface PomodoroTimerContainerProps {
  preferences: PomodoroPreferences;
  activeTask: ActivePomodoroTask | null;
  onClearActiveTask: () => void;
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

function PomodoroTimerContainer({
  preferences,
  activeTask,
  onClearActiveTask,
}: PomodoroTimerContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldBeExpanded = isExpanded || Boolean(activeTask);

  const { mutate: createPomodoroSession } = useCreatePomodoroSession();

  const {
    play: playBackgroundSound,
    pause: pauseBackgroundSound,
    stop: stopBackgroundSound,
  } = useBackgroundSound({
    sound: preferences.selectedBackgroundSound,
    volume: preferences.backgroundSoundVolume,
  });

  const handleSessionComplete = useCallback(
    (session: CompletedPomodoroSession) => {
      const sessionData: CreatePomodoroSessionRequest = {
        sessionId: session.sessionId,
        sessionType: session.sessionType,
        plannedDurationSeconds: session.plannedDurationSeconds,
        actualDurationSeconds: session.actualDurationSeconds,
        startedAt: session.startedAt,
        completedAt: session.completedAt,
        task: session.context.taskId,
        project: session.context.projectId,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      createPomodoroSession(sessionData);
    },
    [createPomodoroSession],
  );

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
    preferences,
    onSessionComplete: handleSessionComplete,
  });

  usePomodoroDocumentTitle(timer);

  const isSessionLocked =
    timer.status === "running" || timer.status === "paused";

  const handleStart = useCallback(() => {
    start({
      taskId: activeTask?.taskId ?? null,
      projectId: activeTask?.projectId ?? null,
    });

    if (preferences.autoPlayBackgroundSound) {
      void playBackgroundSound().catch((error: unknown) => {
        console.error("Failed to play background sound:", error);
      });
    }
  }, [
    start,
    activeTask,
    preferences.autoPlayBackgroundSound,
    playBackgroundSound,
  ]);

  const handleResume = useCallback(() => {
    resume();

    if (preferences.autoPlayBackgroundSound) {
      void playBackgroundSound().catch((error: unknown) => {
        console.error("Failed to resume background sound:", error);
      });
    }
  }, [resume, preferences.autoPlayBackgroundSound, playBackgroundSound]);

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
            aria-label={shouldBeExpanded ? "Collapse timer" : "Expand timer"}
            onClick={() => setIsExpanded((current) => !current)}
            sx={{ color: "inherit" }}
          >
            {shouldBeExpanded ? (
              <ExpandLessRoundedIcon />
            ) : (
              <ExpandMoreRoundedIcon />
            )}
          </IconButton>
        </Box>

        {/* Compact view */}
        {!shouldBeExpanded && (
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
        <Collapse in={shouldBeExpanded}>
          <Stack sx={{ alignItems: "center", gap: 2 }}>
            {activeTask && (
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.main" }}
                    >
                      Current Task
                    </Typography>

                    <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                      {activeTask.title}
                    </Typography>

                    {activeTask.projectTitle && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                        }}
                        noWrap
                      >
                        {activeTask.projectTitle}
                      </Typography>
                    )}
                  </Box>

                  <Tooltip title="Clear active task">
                    <IconButton
                      size="small"
                      aria-label="Clear active task"
                      onClick={onClearActiveTask}
                      sx={{ color: "text.secondary" }}
                    >
                      <CloseRoundedIcon
                        fontSize="small"
                        sx={{ color: "inherit" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            )}

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
