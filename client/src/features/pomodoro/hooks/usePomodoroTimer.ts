import { useCallback, useEffect, useRef, useState } from "react";
import type {
  PomodoroPreferences,
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
}

export function usePomodoroTimer({ preferences }: UsePomodoroTimerProps) {
  const [timer, setTimer] = useState<PomodoroTimerState>(() =>
    createTimerState("focus", preferences),
  );

  const completionHandledRef = useRef(false);

  // Keep the displayed timer synchronized with its end timestamp.
  useEffect(() => {
    if (timer.status !== "running" || timer.endTime === null) {
      return;
    }

    const updateRemainingTime = () => {
      const remainingTime = getRemainingTime(timer.endTime!);

      if (remainingTime === 0) {
        setTimer((current) => ({
          ...current,
          status: "completed",
          remainingTime: 0,
          endTime: null,
          pausedAt: null,
        }));

        return;
      }

      setTimer((current) => ({
        ...current,
        remainingTime,
      }));
    };

    updateRemainingTime();

    const intervalId = window.setInterval(updateRemainingTime, 1000);

    return () => window.clearInterval(intervalId);
  }, [timer.status, timer.endTime]);

  // Handle completed sessions.
  useEffect(() => {
    if (timer.status !== "completed") {
      completionHandledRef.current = false;
      return;
    }

    if (completionHandledRef.current) {
      return;
    }

    completionHandledRef.current = true;

    // Play the alarm for the session that just finished.
    const sound =
      timer.sessionType === "focus"
        ? preferences.focusAlarmSound
        : preferences.breakAlarmSound;

    void playAlarm({
      sound,
      volume: preferences.alarmVolume,
    }).catch((error: unknown) => {
      console.error("Failed to play Pomodoro alarm:", error);
    });

    // Determine and prepare the next session.
    const next = getNextSession(
      timer.sessionType,
      timer.focusSessionsInCycle,
      preferences,
    );

    const shouldAutoStart =
      next.sessionType === "focus"
        ? preferences.autoStartNextPomodoro
        : preferences.autoStartBreak;

    setTimer(() => {
      const nextTimer = createTimerState(
        next.sessionType,
        preferences,
        next.focusSessionsInCycle,
      );

      if (!shouldAutoStart) {
        return nextTimer;
      }

      return {
        ...nextTimer,
        status: "running",
        endTime: Date.now() + nextTimer.duration * 1000,
      };
    });
  }, [
    timer.status,
    timer.sessionType,
    timer.focusSessionsInCycle,
    preferences,
  ]);

  // Start the timer.
  const start = useCallback(() => {
    void unlockAlarmAudio().catch((error: unknown) => {
      console.error("Failed to initialize alarm audio:", error);
    });

    setTimer((current) => {
      if (
        current.status === "running" ||
        current.status === "paused" ||
        current.status === "completed"
      ) {
        return current;
      }

      const freshTimer = createTimerState(
        current.sessionType,
        preferences,
        current.focusSessionsInCycle,
      );

      return {
        ...freshTimer,
        status: "running",
        endTime: Date.now() + freshTimer.remainingTime * 1000,
        pausedAt: null,
      };
    });
  }, [preferences]);

  // Pause the timer.
  const pause = useCallback(() => {
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
        pausedAt: Date.now(),
      };
    });
  }, []);

  // Resume the timer.
  const resume = useCallback(() => {
    void unlockAlarmAudio().catch((error: unknown) => {
      console.error("Failed to initialize alarm audio:", error);
    });

    setTimer((current) => {
      if (current.status !== "paused") {
        return current;
      }

      return {
        ...current,
        status: "running",
        endTime: Date.now() + current.remainingTime * 1000,
        pausedAt: null,
      };
    });
  }, []);

  // Stop the timer.
  const stop = useCallback(() => {
    setTimer((current) =>
      createTimerState(
        current.sessionType,
        preferences,
        current.focusSessionsInCycle,
      ),
    );
  }, [preferences]);

  // Reset the current session.
  const reset = useCallback(() => {
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
