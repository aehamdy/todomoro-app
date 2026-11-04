import { DEFAULT_POMODORO_PREFERENCES } from "../pomodoro.constants";
import { useAuth } from "../../auth/hooks/useAuth";
import PomodoroTimerContainer from "./PomodoroTimerContainer";

function PomodoroWidget() {
  const { user } = useAuth();

  const preferences =
    user?.preferences.pomodoro ?? DEFAULT_POMODORO_PREFERENCES;

  return <PomodoroTimerContainer preferences={preferences} />;
}

export default PomodoroWidget;
