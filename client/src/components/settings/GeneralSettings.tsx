import { FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useUpdateUserPreferences } from "../../features/auth/hooks/useUpdateUserPreferences";

function GeneralSettings() {
  const { user } = useAuth();
  const { mutate: updatePreferences, isPending } = useUpdateUserPreferences();

  const soundEnabled = user?.preferences.taskCompletionSoundEnabled ?? true;

  const addNewTasksToTop = user?.preferences.addNewTasksToTop ?? true;

  const handleSoundChange = (checked: boolean) => {
    updatePreferences({ taskCompletionSoundEnabled: checked });
  };

  const handleAddNewTasksToTopChange = (checked: boolean) => {
    updatePreferences({ addNewTasksToTop: checked });
  };

  return (
    <Stack spacing={3}>
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
            Add new tasks on top
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Place newly created tasks at the top of the list.
          </Typography>
        </Stack>

        <FormControlLabel
          label={addNewTasksToTop ? "On" : "Off"}
          control={
            <Switch
              checked={addNewTasksToTop}
              onChange={(_, checked) => handleAddNewTasksToTopChange(checked)}
              disabled={!user || isPending}
              slotProps={{
                input: {
                  "aria-label": "Add new tasks to top",
                },
              }}
            />
          }
        />
      </Stack>
    </Stack>
  );
}

export default GeneralSettings;
