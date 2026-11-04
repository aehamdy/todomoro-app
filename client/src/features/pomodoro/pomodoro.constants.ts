import type { PomodoroPreferences, PomodoroTimerState } from "./pomodoro.types";

export const DEFAULT_POMODORO_PREFERENCES: PomodoroPreferences = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,

  autoStartNextPomodoro: false,
  autoStartBreak: false,
  disableBreaks: false,

  alarmVolume: 70,
  focusAlarmSound: "default",
  breakAlarmSound: "default",

  backgroundSoundVolume: 30,
  selectedBackgroundSound: "none",
  autoPlayBackgroundSound: false,

  widgetTheme: "midnight",
};

export const INITIAL_POMODORO_TIMER_STATE: PomodoroTimerState = {
  status: "idle",
  sessionType: "focus",
  duration: DEFAULT_POMODORO_PREFERENCES.focusDuration * 60,
  remainingTime: DEFAULT_POMODORO_PREFERENCES.focusDuration * 60,
  endTime: null,
  pausedAt: null,
  focusSessionsInCycle: 0,
};
