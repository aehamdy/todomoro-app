import { useState } from "react";
import type { FocusEvent } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUpdateUserPreferences } from "../../auth/hooks/useUpdateUserPreferences";

type PomodoroField =
  | "focusDuration"
  | "shortBreakDuration"
  | "longBreakDuration"
  | "longBreakInterval";

const pomodoroFields: {
  name: PomodoroField;
  label: string;
  description: string;
  min: number;
  max: number;
}[] = [
  {
    name: "focusDuration",
    label: "Focus duration",
    description: "Duration of your focus sessions in minutes.",
    min: 1,
    max: 480,
  },
  {
    name: "shortBreakDuration",
    label: "Short break duration",
    description: "Duration of your short breaks in minutes.",
    min: 1,
    max: 480,
  },
  {
    name: "longBreakDuration",
    label: "Long break duration",
    description: "Duration of your long breaks in minutes.",
    min: 1,
    max: 480,
  },
  {
    name: "longBreakInterval",
    label: "Long break interval",
    description: "Number of focus sessions before a long break.",
    min: 2,
    max: 90,
  },
];

function PomodoroSettings() {
  const { user, isLoading } = useAuth();
  const updatePreferences = useUpdateUserPreferences();

  const [savingField, setSavingField] = useState<PomodoroField | null>(null);

  const [errors, setErrors] = useState<Partial<Record<PomodoroField, string>>>(
    {},
  );

  const handleChange = (field: PomodoroField) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleBlur = async (
    field: PomodoroField,
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!user || savingField) return;

    const input = event.currentTarget;
    const value = Number(input.value);

    const config = pomodoroFields.find((item) => item.name === field)!;

    const originalValue = user.preferences.pomodoro[field];

    if (
      input.value.trim() === "" ||
      !Number.isInteger(value) ||
      value < config.min ||
      value > config.max
    ) {
      input.value = String(originalValue);

      setErrors((prev) => ({
        ...prev,
        [field]: `Enter a whole number between ${config.min} and ${config.max}.`,
      }));

      return;
    }

    if (value === originalValue) return;

    setSavingField(field);

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    try {
      await updatePreferences.mutateAsync({
        pomodoro: {
          [field]: value,
        },
      });
    } catch {
      input.value = String(originalValue);

      setErrors((prev) => ({
        ...prev,
        [field]: "Failed to update this setting. Please try again.",
      }));
    } finally {
      setSavingField(null);
    }
  };

  if (isLoading) {
    return <Typography>Loading preferences...</Typography>;
  }

  if (!user) {
    return (
      <Typography color="error.main">
        Please log in to manage your preferences.
      </Typography>
    );
  }

  return (
    <Stack spacing={4}>
      <Stack spacing={0.5}>
        <Typography variant="h6">Timer</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Customize the duration of your focus sessions and breaks.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {pomodoroFields.map((field) => {
          const isSaving = savingField === field.name;

          return (
            <Box
              key={field.name}
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "row" },
                alignItems: { xs: "stretch", md: "center" },
                gap: { xs: 5, md: 8 },
              }}
            >
              <Box sx={{ width: { xs: "50%", md: 270 }, flexShrink: 0 }}>
                <Typography>{field.label}</Typography>

                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {field.description}
                </Typography>
              </Box>

              <Box sx={{ width: { xs: "50%", md: 280 } }}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  defaultValue={user.preferences.pomodoro[field.name]}
                  onChange={() => handleChange(field.name)}
                  onBlur={(event) => handleBlur(field.name, event)}
                  disabled={isSaving}
                  error={Boolean(errors[field.name])}
                  helperText={errors[field.name] || " "}
                  slotProps={{
                    htmlInput: {
                      min: field.min,
                      max: field.max,
                      step: 1,
                    },
                    input: {
                      endAdornment: isSaving ? (
                        <CircularProgress size={18} />
                      ) : null,
                    },
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default PomodoroSettings;
