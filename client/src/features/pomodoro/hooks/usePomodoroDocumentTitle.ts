import { useEffect } from "react";
import type { PomodoroTimerState } from "../types/pomodoro.types";
import { APP_NAME } from "../../../config/app";

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

function usePomodoroDocumentTitle(timer: PomodoroTimerState) {
  useEffect(() => {
    const updateDocumentTitle = () => {
      if (document.visibilityState === "visible") {
        document.title = `${APP_NAME}`;
        return;
      }

      if (timer.status !== "running" && timer.status !== "paused") {
        document.title = `${APP_NAME}`;
        return;
      }

      const formattedTime = formatTime(timer.remainingTime);

      if (timer.status === "paused") {
        document.title = `Paused - ${formattedTime}`;
        return;
      }

      document.title = `${formattedTime} - ${SESSION_LABELS[timer.sessionType]}`;
    };

    updateDocumentTitle();

    document.addEventListener("visibilitychange", updateDocumentTitle);

    return () => {
      document.removeEventListener("visibilitychange", updateDocumentTitle);
      document.title = `${APP_NAME}`;
    };
  }, [timer.status, timer.remainingTime, timer.sessionType]);
}

export { usePomodoroDocumentTitle };
