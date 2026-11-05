import { DEFAULT_POMODORO_PREFERENCES } from "../pomodoro.constants";
import { useAuth } from "../../auth/hooks/useAuth";
import PomodoroTimerContainer from "./PomodoroTimerContainer";
import type { ActivePomodoroTask } from "../../tasks/task.types";

interface PomodoroWidgetProps {
  activeTask: ActivePomodoroTask | null;
  onClearActiveTask: () => void;
}

function PomodoroWidget({
  activeTask,
  onClearActiveTask,
}: PomodoroWidgetProps) {
  const { user } = useAuth();

  const preferences =
    user?.preferences.pomodoro ?? DEFAULT_POMODORO_PREFERENCES;

  return (
    <PomodoroTimerContainer
      preferences={preferences}
      activeTask={activeTask}
      onClearActiveTask={onClearActiveTask}
    />
  );
}

export default PomodoroWidget;
