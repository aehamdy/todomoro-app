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
} from "../pomodoro.utils";

interface UsePomodoroTimerProps {
  preferences: PomodoroPreferences;
}

export function usePomodoroTimer({ preferences }: UsePomodoroTimerProps) {
  const [timer, setTimer] = useState<PomodoroTimerState>(() =>
    createTimerState("focus", preferences),
  );
  const completionHandledRef = useRef(false);

  // Keep the displayed remaining time synchronized with the end timestamp.
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

  useEffect(() => {
    if (timer.status !== "completed") {
      completionHandledRef.current = false;
      return;
    }

    if (completionHandledRef.current) {
      return;
    }

    completionHandledRef.current = true;

    const next = getNextSession(
      timer.sessionType,
      timer.focusSessionsInCycle,
      preferences,
    );

    const shouldAutoStart =
      timer.sessionType === "focus"
        ? preferences.autoStartBreak
        : preferences.autoStartNextPomodoro;

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

  const start = useCallback(() => {
    setTimer((current) => {
      if (
        current.status === "running" ||
        current.status === "paused" ||
        current.status === "completed"
      ) {
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

  const resume = useCallback(() => {
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

  const stop = useCallback(() => {
    setTimer((current) =>
      createTimerState(
        current.sessionType,
        preferences,
        current.focusSessionsInCycle,
      ),
    );
  }, [preferences]);

  const reset = useCallback(() => {
    setTimer((current) =>
      createTimerState(
        current.sessionType,
        preferences,
        current.focusSessionsInCycle,
      ),
    );
  }, [preferences]);

  const selectSession = useCallback(
    (sessionType: PomodoroSessionType) => {
      setTimer((current) => {
        // Don't switch to the same session.
        if (current.sessionType === sessionType) {
          return current;
        }

        // Don't silently discard an active session.
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

  return {
    timer,
    start,
    pause,
    resume,
    stop,
    reset,
    selectSession,
    nextSession,
  };
}
