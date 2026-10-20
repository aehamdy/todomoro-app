import { Box, Typography } from "@mui/material";

function AccountSettings() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account
      </Typography>

      <Typography color="text.secondary">
        Manage your account details and preferences.
      </Typography>
    </Box>
  );
}

export default AccountSettings;
