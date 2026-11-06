import {
  Box,
  CircularProgress,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { PomodoroSettingsProps } from "../types/pomodoro.types";

type PomodoroToggleField =
  | "autoStartNextPomodoro"
  | "autoStartBreak"
  | "disableBreaks";

const pomodoroToggleFields: {
  name: PomodoroToggleField;
  label: string;
  description: string;
}[] = [
  {
    name: "autoStartNextPomodoro",
    label: "Auto start next pomodoro",
    description: "Automatically start the next focus session.",
  },
  {
    name: "autoStartBreak",
    label: "Auto start break",
    description: "Automatically start a break after a focus session.",
  },
  {
    name: "disableBreaks",
    label: "Disable breaks",
    description: "Skip breaks between focus sessions.",
  },
];

type PomodoroAutomationSettingsProps = PomodoroSettingsProps;

function PomodoroAutomationSettings({
  user,
  updatePreferences,
}: PomodoroAutomationSettingsProps) {
  const [savingToggle, setSavingToggle] = useState<PomodoroToggleField | null>(
    null,
  );

  const handleToggleChange = async (
    field: PomodoroToggleField,
    value: boolean,
  ) => {
    if (savingToggle) return;

    setSavingToggle(field);

    try {
      await updatePreferences.mutateAsync({
        pomodoro: {
          [field]: value,
        },
      });
    } catch {
      // The cached user preferences remain unchanged.
      // The switch will revert to its previous value.
    } finally {
      setSavingToggle(null);
    }
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="h6">Automation</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Customize how your focus sessions and breaks start.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {pomodoroToggleFields.map((field) => {
          const isSaving = savingToggle === field.name;

          return (
            <Box
              key={field.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography>{field.label}</Typography>

                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {field.description}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {isSaving && <CircularProgress size={18} sx={{ mr: 1 }} />}

                <Switch
                  checked={user.preferences.pomodoro[field.name]}
                  onChange={(event) =>
                    handleToggleChange(field.name, event.target.checked)
                  }
                  disabled={Boolean(savingToggle)}
                />
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default PomodoroAutomationSettings;
