import type {
  PomodoroPreferences,
  PomodoroSessionType,
  PomodoroTimerState,
} from "./pomodoro.types";

export function getSessionDuration(
  sessionType: PomodoroSessionType,
  preferences: PomodoroPreferences,
): number {
  const durations: Record<PomodoroSessionType, number> = {
    focus: preferences.focusDuration,
    shortBreak: preferences.shortBreakDuration,
    longBreak: preferences.longBreakDuration,
  };

  return durations[sessionType] * 60;
}

export function createTimerState(
  sessionType: PomodoroSessionType,
  preferences: PomodoroPreferences,
  focusSessionsInCycle = 0,
): PomodoroTimerState {
  const duration = getSessionDuration(sessionType, preferences);

  return {
    status: "idle",
    sessionType,
    duration,
    remainingTime: duration,
    endTime: null,
    pausedAt: null,
    focusSessionsInCycle,
  };
}

export function getRemainingTime(endTime: number): number {
  return Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
}

export function getNextSession(
  currentSession: PomodoroSessionType,
  focusSessionsInCycle: number,
  preferences: PomodoroPreferences,
): {
  sessionType: PomodoroSessionType;
  focusSessionsInCycle: number;
} {
  if (currentSession === "focus") {
    const nextFocusSessions = focusSessionsInCycle + 1;

    if (preferences.disableBreaks) {
      return {
        sessionType: "focus",
        focusSessionsInCycle: nextFocusSessions % preferences.longBreakInterval,
      };
    }

    const isLongBreak = nextFocusSessions % preferences.longBreakInterval === 0;

    return {
      sessionType: isLongBreak ? "longBreak" : "shortBreak",
      focusSessionsInCycle: nextFocusSessions,
    };
  }

  if (currentSession === "longBreak") {
    return {
      sessionType: "focus",
      focusSessionsInCycle: 0,
    };
  }

  return {
    sessionType: "focus",
    focusSessionsInCycle,
  };
}
