import { Box, Typography } from "@mui/material";

function AboutSettings() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        About Todomoro
      </Typography>

      <Typography color="text.secondary">
        View information about Todomoro and its version.
      </Typography>
    </Box>
  );
}

export default AboutSettings;
