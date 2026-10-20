import { Box, Typography } from "@mui/material";

function AppearanceSettings() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Appearance
      </Typography>

      <Typography color="text.secondary">
        Customize your theme and application appearance.
      </Typography>
    </Box>
  );
}

export default AppearanceSettings;
