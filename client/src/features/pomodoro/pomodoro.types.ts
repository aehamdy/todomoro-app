import type { AuthUser } from "../auth/auth.types";
import type { useUpdateUserPreferences } from "../auth/hooks/useUpdateUserPreferences";

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
  | "fireplace"
  | "cafe"
  | "library"
  | "classroom"
  | "ocean-shore"
  | "bonfire"
  | "forest"
  | "wind";

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

  backgroundSoundVolume: number;
  selectedBackgroundSound: PomodoroSound;
  autoPlayBackgroundSound: boolean;

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

export interface PomodoroSessionContext {
  taskId: string | null;
  projectId: string | null;
}

export interface CompletedPomodoroSession {
  sessionId: string;
  sessionType: PomodoroSessionType;
  plannedDurationSeconds: number;
  actualDurationSeconds: number;
  startedAt: string;
  completedAt: string;
  context: PomodoroSessionContext;
}

export type PomodoroSettingsProps = {
  user: AuthUser;
  updatePreferences: ReturnType<typeof useUpdateUserPreferences>;
};

export interface CreatePomodoroSessionRequest {
  sessionId: string;
  sessionType: PomodoroSessionType;
  plannedDurationSeconds: number;
  actualDurationSeconds: number;
  startedAt: string;
  completedAt: string;
  task: string | null;
  project: string | null;
  timezone: string;
}

export interface PomodoroSession {
  _id: string;
  sessionId: string;
  sessionType: PomodoroSessionType;
  plannedDurationSeconds: number;
  actualDurationSeconds: number;
  startedAt: string;
  completedAt: string;
  task: string | null;
  project: string | null;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePomodoroSessionResponse {
  status: "success";
  data: {
    session: PomodoroSession;
    alreadyRecorded: boolean;
  };
}
