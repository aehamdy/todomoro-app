import { Divider, Stack, Typography } from "@mui/material";
import { useAuth } from "../../auth/hooks/useAuth";
import { useUpdateUserPreferences } from "../../auth/hooks/useUpdateUserPreferences";
import PomodoroAlarmSettings from "./PomodoroAlarmSettings";
import PomodoroBackgroundSoundSettings from "./PomodoroBackgroundSoundSettings";
import PomodoroTimerSettings from "./PomodoroTimerSettings";
import PomodoroAutomationSettings from "./PomodoroAutomationSettings";

function PomodoroSettings() {
  const { user, isLoading } = useAuth();
  const updatePreferences = useUpdateUserPreferences();

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

      <PomodoroTimerSettings
        user={user}
        updatePreferences={updatePreferences}
      />

      <Divider />

      <PomodoroAutomationSettings
        user={user}
        updatePreferences={updatePreferences}
      />

      <Divider />

      <PomodoroAlarmSettings />

      <Divider />

      <PomodoroBackgroundSoundSettings />
    </Stack>
  );
}

export default PomodoroSettings;
