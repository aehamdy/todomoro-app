import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { PomodoroSessionType } from "../pomodoro.types";

interface PomodoroSessionSelectorProps {
  sessionType: PomodoroSessionType;
  onChange: (sessionType: PomodoroSessionType) => void;
  disabled?: boolean;
}

function PomodoroSessionSelector({
  sessionType,
  onChange,
  disabled = false,
}: PomodoroSessionSelectorProps) {
  return (
    <ToggleButtonGroup
      exclusive
      fullWidth
      size="small"
      value={sessionType}
      disabled={disabled}
      onChange={(_, value: PomodoroSessionType | null) => {
        if (value) onChange(value);
      }}
    >
      <ToggleButton value="focus">Focus</ToggleButton>
      <ToggleButton value="shortBreak">Short Break</ToggleButton>
      <ToggleButton value="longBreak">Long Break</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default PomodoroSessionSelector;
