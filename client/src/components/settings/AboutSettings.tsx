import { Stack, Chip, Typography } from "@mui/material";
import { APP_NAME, APP_VERSION } from "../../config/app";

function AboutSettings() {
  return (
    <Stack sx={{ gap: 2, color: "text.primary" }}>
      <Stack>
        <Typography variant="h6">About {APP_NAME}</Typography>

        <Typography sx={{ mb: 2, color: "text.secondary" }}>
          Your personal space to organize tasks and projects.
        </Typography>
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2">Version</Typography>
        <Chip
          label={`${APP_VERSION}`}
          size="small"
          variant="filled"
          sx={{ color: "text.secondary" }}
        />
      </Stack>

      <Stack
        sx={{
          gap: 1,
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Features
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Manage tasks, organize projects, track subtasks, set priorities and
          due dates, and personalize your experience with themes and sound
          preferences.
        </Typography>
      </Stack>

      <Stack
        sx={{
          gap: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
          Built with
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          React, TypeScript, Material UI, Node.js, Express, and MongoDB.
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AboutSettings;
