import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CompletedPomodoroSession,
  PomodoroPreferences,
  PomodoroSessionContext,
  PomodoroSessionType,
  PomodoroTimerState,
} from "../pomodoro.types";
import {
  createTimerState,
  getNextSession,
  getRemainingTime,
  getSessionDuration,
} from "../utils/pomodoro.utils";
import { playAlarm, unlockAlarmAudio } from "../utils/alarmSound.utils";

interface UsePomodoroTimerProps {
  preferences: PomodoroPreferences;
  onSessionComplete: (session: CompletedPomodoroSession) => void;
}

interface ActiveSessionTracking {
  sessionId: string;
  sessionType: PomodoroSessionType;
  plannedDurationSeconds: number;
  startedAt: Date;
  runningStartedAt: number;
  accumulatedRunningTime: number;
  context: PomodoroSessionContext;
}

export function usePomodoroTimer({
  preferences,
  onSessionComplete,
}: UsePomodoroTimerProps) {
  const [timer, setTimer] = useState<PomodoroTimerState>(() =>
    createTimerState("focus", preferences),
  );

  const completionHandledRef = useRef(false);

  const activeSessionRef = useRef<ActiveSessionTracking | null>(null);

  // Handle the completion of a Pomodoro session.
  const handleSessionCompletion = useCallback(
    (sessionType: PomodoroSessionType, focusSessionsInCycle: number) => {
      const activeSession = activeSessionRef.current;

      if (!activeSession) {
        console.error("Completed Pomodoro session has no tracking data.");
        return;
      }

      const completedAt = Date.now();

      const actualDurationMs =
        activeSession.accumulatedRunningTime +
        (activeSession.runningStartedAt > 0
          ? completedAt - activeSession.runningStartedAt
          : 0);

      const completedSession: CompletedPomodoroSession = {
        sessionId: activeSession.sessionId,
        sessionType: activeSession.sessionType,
        plannedDurationSeconds: activeSession.plannedDurationSeconds,
        actualDurationSeconds: Math.max(1, Math.round(actualDurationMs / 1000)),
        startedAt: activeSession.startedAt.toISOString(),
        completedAt: new Date(completedAt).toISOString(),
        context: activeSession.context,
      };

      // Notify the container that the session has completed.
      onSessionComplete(completedSession);

      // Play the completion alarm.
      const sound =
        sessionType === "focus"
          ? preferences.focusAlarmSound
          : preferences.breakAlarmSound;

      void playAlarm({
        sound,
        volume: preferences.alarmVolume,
      }).catch((error: unknown) => {
        console.error("Failed to play Pomodoro alarm:", error);
      });

      // Determine the next session.
      const next = getNextSession(
        sessionType,
        focusSessionsInCycle,
        preferences,
      );

      const shouldAutoStart =
        next.sessionType === "focus"
          ? preferences.autoStartNextPomodoro
          : preferences.autoStartBreak;

      // Discard the completed session's tracking data.
      activeSessionRef.current = null;

      const nextTimer = createTimerState(
        next.sessionType,
        preferences,
        next.focusSessionsInCycle,
      );

      if (shouldAutoStart) {
        const now = Date.now();

        // Initialize tracking for the automatically started session.
        activeSessionRef.current = {
          sessionId: crypto.randomUUID(),
          sessionType: next.sessionType,
          plannedDurationSeconds: nextTimer.duration,
          startedAt: new Date(now),
          runningStartedAt: now,
          accumulatedRunningTime: 0,
          context: activeSession.context,
        };

        setTimer({
          ...nextTimer,
          status: "running",
          endTime: now + nextTimer.duration * 1000,
        });

        return;
      }

      setTimer(nextTimer);
    },
    [onSessionComplete, preferences],
  );

  // Keep the displayed timer synchronized with its end timestamp.
  useEffect(() => {
    if (timer.status !== "running" || timer.endTime === null) {
      return;
    }

    const endTime = timer.endTime;

    // Allow the new running session to complete.
    completionHandledRef.current = false;

    const updateRemainingTime = () => {
      const remainingTime = getRemainingTime(endTime);

      if (remainingTime === 0) {
        if (completionHandledRef.current) return;

        completionHandledRef.current = true;

        handleSessionCompletion(timer.sessionType, timer.focusSessionsInCycle);

        return;
      }

      setTimer((current) => ({
        ...current,
        remainingTime,
      }));
    };

    const intervalId = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(intervalId);
  }, [
    timer.status,
    timer.endTime,
    timer.sessionType,
    timer.focusSessionsInCycle,
    handleSessionCompletion,
  ]);

  // Start the timer and initialize session tracking.
  const start = useCallback(
    (context: PomodoroSessionContext) => {
      if (
        timer.status === "running" ||
        timer.status === "paused" ||
        timer.status === "completed"
      ) {
        return;
      }

      void unlockAlarmAudio().catch((error: unknown) => {
        console.error("Failed to initialize alarm audio:", error);
      });

      const now = Date.now();

      const freshTimer = createTimerState(
        timer.sessionType,
        preferences,
        timer.focusSessionsInCycle,
      );

      activeSessionRef.current = {
        sessionId: crypto.randomUUID(),
        sessionType: timer.sessionType,
        plannedDurationSeconds: freshTimer.duration,
        startedAt: new Date(now),
        runningStartedAt: now,
        accumulatedRunningTime: 0,
        context,
      };

      setTimer({
        ...freshTimer,
        status: "running",
        endTime: now + freshTimer.remainingTime * 1000,
        pausedAt: null,
      });
    },
    [timer, preferences],
  );

  // Pause the timer and accumulate the current running period.
  const pause = useCallback(() => {
    const now = Date.now();
    const activeSession = activeSessionRef.current;

    if (activeSession && activeSession.runningStartedAt > 0) {
      activeSession.accumulatedRunningTime +=
        now - activeSession.runningStartedAt;

      activeSession.runningStartedAt = 0;
    }

    setTimer((current) => {
      if (current.status !== "running" || current.endTime === null) {
        return current;
      }

      const remainingTime = getRemainingTime(current.endTime);

      return {
        ...current,
        status: "paused",
        remainingTime,
        endTime: null,
        pausedAt: now,
      };
    });
  }, []);

  // Resume the timer and start a new running period.
  const resume = useCallback(() => {
    void unlockAlarmAudio().catch((error: unknown) => {
      console.error("Failed to initialize alarm audio:", error);
    });

    const now = Date.now();
    const activeSession = activeSessionRef.current;

    if (activeSession) {
      activeSession.runningStartedAt = now;
    }

    setTimer((current) => {
      if (current.status !== "paused") {
        return current;
      }

      return {
        ...current,
        status: "running",
        endTime: now + current.remainingTime * 1000,
        pausedAt: null,
      };
    });
  }, []);

  // Stop the timer and discard the unfinished session.
  const stop = useCallback(() => {
    activeSessionRef.current = null;

    setTimer((current) =>
      createTimerState(
        current.sessionType,
        preferences,
        current.focusSessionsInCycle,
      ),
    );
  }, [preferences]);

  // Reset the current session and discard its tracking data.
  const reset = useCallback(() => {
    activeSessionRef.current = null;

    setTimer((current) =>
      createTimerState(
        current.sessionType,
        preferences,
        current.focusSessionsInCycle,
      ),
    );
  }, [preferences]);

  // Manually select a session.
  const selectSession = useCallback(
    (sessionType: PomodoroSessionType) => {
      setTimer((current) => {
        if (current.sessionType === sessionType) {
          return current;
        }

        if (current.status === "running" || current.status === "paused") {
          return current;
        }

        return createTimerState(
          sessionType,
          preferences,
          current.focusSessionsInCycle,
        );
      });
    },
    [preferences],
  );

  // Manually move to the next session.
  const nextSession = useCallback(() => {
    setTimer((current) => {
      if (current.status !== "completed") {
        return current;
      }

      const next = getNextSession(
        current.sessionType,
        current.focusSessionsInCycle,
        preferences,
      );

      return createTimerState(
        next.sessionType,
        preferences,
        next.focusSessionsInCycle,
      );
    });
  }, [preferences]);

  // Reflect updated preferences in idle timers without an effect.
  const isIdle = timer.status === "idle" || timer.status === "stopped";

  const currentDuration = getSessionDuration(timer.sessionType, preferences);

  const displayedTimer = isIdle
    ? {
        ...timer,
        duration: currentDuration,
        remainingTime: currentDuration,
      }
    : timer;

  return {
    timer: displayedTimer,
    start,
    pause,
    resume,
    stop,
    reset,
    selectSession,
    nextSession,
  };
}
