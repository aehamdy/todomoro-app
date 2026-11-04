export type PomodoroSessionType = "focus" | "shortBreak" | "longBreak";

export type PomodoroSessionStatus =
  | "idle"
  | "running"
  | "paused"
  | "stopped"
  | "completed"
  | "cancelled";

export type PomodoroSound =
  | "none"
  | "white-noise"
  | "pink-noise"
  | "brown-noise"
  | "rain"
  | "ocean"
  | "forest"
  | "fireplace"
  | "cafe";

export type PomodoroAlarmSound =
  | "none"
  | "default"
  | "bell"
  | "digital"
  | "gentle";

export type PomodoroWidgetTheme =
  | "midnight"
  | "warm-sand"
  | "forest"
  | "lavender"
  | "rose";

export interface PomodoroPreferences {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;

  autoStartNextPomodoro: boolean;
  autoStartBreak: boolean;
  disableBreaks: boolean;

  alarmVolume: number;
  focusAlarmSound: PomodoroAlarmSound;
  breakAlarmSound: PomodoroAlarmSound;

  whiteNoiseVolume: number;
  selectedWhiteNoise: PomodoroSound;
  autoPlayWhiteNoise: boolean;

  widgetTheme: PomodoroWidgetTheme;
}

export interface PomodoroTimerState {
  status: PomodoroSessionStatus;
  sessionType: PomodoroSessionType;
  duration: number;
  remainingTime: number;
  endTime: number | null;
  pausedAt: number | null;
  focusSessionsInCycle: number;
}
