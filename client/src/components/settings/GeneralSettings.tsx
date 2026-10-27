import { FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { useAuth } from "../../features/auth/useAuth";
import { useUpdateUserPreferences } from "../../features/auth/useUpdateUserPreferences";

function GeneralSettings() {
  const { user } = useAuth();
  const { mutate: updatePreferences, isPending } = useUpdateUserPreferences();

  const soundEnabled = user?.preferences.taskCompletionSoundEnabled ?? true;

  const handleSoundChange = (checked: boolean) => {
    updatePreferences({ taskCompletionSoundEnabled: checked });
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="body1" sx={{ color: "text.primary" }}>
          Task completion sound
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Play a sound when a task is completed.
        </Typography>
      </Stack>

      <FormControlLabel
        label={soundEnabled ? "On" : "Off"}
        control={
          <Switch
            checked={soundEnabled}
            onChange={(_, checked) => handleSoundChange(checked)}
            disabled={!user || isPending}
            slotProps={{
              input: {
                "aria-label": "Enable task completion sound",
              },
            }}
          />
        }
      />
    </Stack>
  );
}

export default GeneralSettings;
