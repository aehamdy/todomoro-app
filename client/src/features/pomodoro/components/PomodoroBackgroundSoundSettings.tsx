import { useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUpdateUserPreferences } from "../../auth/hooks/useUpdateUserPreferences";
import type {
  PomodoroPreferences,
  PomodoroSound,
} from "../types/pomodoro.types";

type BackgroundSoundField =
  | "selectedBackgroundSound"
  | "backgroundSoundVolume"
  | "autoPlayBackgroundSound";

const backgroundSounds: {
  value: PomodoroSound;
  label: string;
}[] = [
  { value: "none", label: "None" },
  { value: "white-noise", label: "White Noise" },
  { value: "pink-noise", label: "Pink Noise" },
  { value: "brown-noise", label: "Brown Noise" },
  { value: "rain", label: "Rain" },
  { value: "fireplace", label: "Fireplace" },
  { value: "cafe", label: "Café" },
  { value: "library", label: "Library" },
  { value: "classroom", label: "Classroom" },
  { value: "ocean-shore", label: "Ocean Shore" },
  { value: "bonfire", label: "Bonfire" },
  { value: "forest", label: "Forest" },
  { value: "wind", label: "Wind" },
];

function PomodoroBackgroundSoundSettings() {
  const { user } = useAuth();
  const updatePreferences = useUpdateUserPreferences();

  const [localPreferences, setLocalPreferences] = useState<
    Partial<
      Pick<
        PomodoroPreferences,
        | "selectedBackgroundSound"
        | "backgroundSoundVolume"
        | "autoPlayBackgroundSound"
      >
    >
  >({});

  const [savingField, setSavingField] = useState<BackgroundSoundField | null>(
    null,
  );

  if (!user) return null;

  const preferences: PomodoroPreferences = user.preferences.pomodoro;

  const currentSound =
    localPreferences.selectedBackgroundSound ??
    preferences.selectedBackgroundSound;

  const currentVolume =
    localPreferences.backgroundSoundVolume ?? preferences.backgroundSoundVolume;

  const currentAutoPlay =
    localPreferences.autoPlayBackgroundSound ??
    preferences.autoPlayBackgroundSound;

  const savePreference = async (
    field: BackgroundSoundField,
    value: PomodoroSound | number | boolean,
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

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h6">Background Sound</Typography>

        <Typography variant="body2" color="text.secondary">
          Choose ambient sounds to accompany your focus sessions.
        </Typography>
      </Stack>

      {/* Sound selection */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography>Selected sound</Typography>
          <Typography variant="caption" color="text.secondary">
            Choose your preferred background sound.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControl size="small" sx={{ width: 200 }}>
            <Select<PomodoroSound>
              value={currentSound}
              disabled={Boolean(savingField)}
              onChange={(event) => {
                void savePreference(
                  "selectedBackgroundSound",
                  event.target.value,
                );
              }}
            >
              {backgroundSounds.map((sound) => (
                <MenuItem key={sound.value} value={sound.value}>
                  {sound.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {savingField === "selectedBackgroundSound" && (
            <CircularProgress size={20} />
          )}
        </Box>
      </Box>

      {/* Volume */}
      <Box>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <VolumeUpRoundedIcon color="action" />

          <Typography>Background sound volume</Typography>

          <Box sx={{ flex: 1 }} />

          <Typography variant="body2" color="text.secondary">
            {currentVolume}%
          </Typography>

          {savingField === "backgroundSoundVolume" && (
            <CircularProgress size={18} />
          )}
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
                backgroundSoundVolume: value,
              }));
            }
          }}
          onChangeCommitted={(_, value) => {
            if (
              typeof value === "number" &&
              value !== preferences.backgroundSoundVolume
            ) {
              void savePreference("backgroundSoundVolume", value);
            }
          }}
        />
      </Box>

      {/* Auto-play */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography>Auto-play background sound</Typography>

          <Typography variant="caption" color="text.secondary">
            Automatically play the selected sound when a session starts.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {savingField === "autoPlayBackgroundSound" && (
            <CircularProgress size={18} />
          )}

          <Switch
            checked={currentAutoPlay}
            disabled={Boolean(savingField)}
            onChange={(_, checked) => {
              void savePreference("autoPlayBackgroundSound", checked);
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
}

export default PomodoroBackgroundSoundSettings;
