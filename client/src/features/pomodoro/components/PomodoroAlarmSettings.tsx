import { useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUpdateUserPreferences } from "../../auth/hooks/useUpdateUserPreferences";
import { playAlarm } from "../utils/alarmSound.utils";
import type {
  PomodoroAlarmSound,
  PomodoroPreferences,
} from "../pomodoro.types";

type AlarmPreferenceField =
  | "alarmVolume"
  | "focusAlarmSound"
  | "breakAlarmSound";

const alarmSounds: {
  value: PomodoroAlarmSound;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "default", label: "Default" },
  { value: "bell", label: "Bell" },
  { value: "digital", label: "Digital" },
  { value: "gentle", label: "Gentle" },
];

function PomodoroAlarmSettings() {
  const { user } = useAuth();
  const updatePreferences = useUpdateUserPreferences();

  const [localPreferences, setLocalPreferences] = useState<
    Partial<PomodoroPreferences>
  >({});

  const [savingField, setSavingField] = useState<AlarmPreferenceField | null>(
    null,
  );

  const [previewing, setPreviewing] = useState<"focus" | "break" | null>(null);

  if (!user) return null;

  const preferences: PomodoroPreferences = user.preferences.pomodoro;

  const currentVolume = localPreferences.alarmVolume ?? preferences.alarmVolume;

  const currentFocusSound =
    localPreferences.focusAlarmSound ?? preferences.focusAlarmSound;

  const currentBreakSound =
    localPreferences.breakAlarmSound ?? preferences.breakAlarmSound;

  const savePreference = async (
    field: AlarmPreferenceField,
    value: number | PomodoroAlarmSound,
  ) => {
    if (savingField) return;

    setLocalPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSavingField(field);

    try {
      await updatePreferences.mutateAsync({
        pomodoro: {
          [field]: value,
        },
      });
    } catch {
      setLocalPreferences((prev) => {
        const updated = { ...prev };
        delete updated[field];

        return updated;
      });
    } finally {
      setSavingField(null);
    }
  };

  const handlePreview = async (
    type: "focus" | "break",
    sound: PomodoroAlarmSound,
  ) => {
    if (previewing || sound === "none" || currentVolume <= 0 || savingField) {
      return;
    }

    setPreviewing(type);

    try {
      await playAlarm({
        sound,
        volume: currentVolume,
      });
    } finally {
      window.setTimeout(() => {
        setPreviewing(null);
      }, 1600);
    }
  };

  const renderSoundSelector = (
    label: string,
    field: AlarmPreferenceField,
    value: PomodoroAlarmSound,
    previewType: "focus" | "break",
  ) => {
    const isSaving = savingField === field;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography>{label}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FormControl size="small" sx={{ width: 200 }}>
            <Select<PomodoroAlarmSound>
              value={value}
              disabled={Boolean(savingField)}
              onChange={(event) => {
                const sound = event.target.value;
                void savePreference(field, sound);
              }}
            >
              {alarmSounds.map((sound) => (
                <MenuItem key={sound.value} value={sound.value}>
                  {sound.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isSaving ? (
              <CircularProgress size={22} />
            ) : (
              <IconButton
                aria-label={`Preview ${label}`}
                disabled={
                  Boolean(previewing) ||
                  value === "none" ||
                  currentVolume <= 0 ||
                  Boolean(savingField)
                }
                onClick={() => void handlePreview(previewType, value)}
              >
                {previewing === previewType ? (
                  <CircularProgress size={22} />
                ) : (
                  <PlayArrowRoundedIcon />
                )}
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Stack spacing={6}>
      <Stack spacing={0.5}>
        <Typography variant="h6">Alarm Sounds</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Customize the alarm sounds and volume for your focus sessions and
          breaks.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <Box>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <VolumeUpRoundedIcon color="action" />

            <Typography>Alarm volume</Typography>

            <Box sx={{ flex: 1 }} />

            <Typography variant="body2" color="text.secondary">
              {currentVolume}%
            </Typography>
          </Stack>

          <Slider
            value={currentVolume}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            disabled={Boolean(savingField)}
            onChange={(_, value) => {
              if (typeof value === "number") {
                setLocalPreferences((prev) => ({
                  ...prev,
                  alarmVolume: value,
                }));
              }
            }}
            onChangeCommitted={(_, value) => {
              if (
                typeof value === "number" &&
                value !== preferences.alarmVolume
              ) {
                void savePreference("alarmVolume", value);
              }
            }}
          />
        </Box>

        {renderSoundSelector(
          "Focus Alarm",
          "focusAlarmSound",
          currentFocusSound,
          "focus",
        )}

        {renderSoundSelector(
          "Break Alarm",
          "breakAlarmSound",
          currentBreakSound,
          "break",
        )}
      </Stack>
    </Stack>
  );
}

export default PomodoroAlarmSettings;
