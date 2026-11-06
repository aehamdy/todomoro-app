import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { PomodoroSessionType } from "../types/pomodoro.types";

interface PomodoroSessionSelectorProps {
  sessionType: PomodoroSessionType;
  onChange: (sessionType: PomodoroSessionType) => void;
  disabled?: boolean;
}

const toggleButtons = [
  { id: 1, value: "focus", label: "Focus" },
  { id: 2, value: "shortBreak", label: "Short Break" },
  { id: 3, value: "longBreak", label: "Long Break" },
];

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
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      {toggleButtons.map((button) => (
        <ToggleButton
          value={button.value}
          sx={{
            // Inactive state styles
            color: "text.secondary",
            bgcolor: "transparent",
            // Active state styles
            "&.Mui-selected": {
              bgcolor: "primary.main",
              color: "primary.contrastText",

              "&:hover": {
                bgcolor: "primary.dark",
              },
            },
          }}
        >
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default PomodoroSessionSelector;
