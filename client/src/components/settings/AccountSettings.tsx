import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "../../features/auth/useAuth";
import { grey } from "@mui/material/colors";
import EmailChangeModal from "./EmailChangeModal";
import PasswordChangeModal from "./PasswordChangeModal";

function AccountSettings() {
  const { user, isLoading } = useAuth();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  if (isLoading) {
    return <Typography>Loading account information...</Typography>;
  }

  const handleCloseEmailDialog = () => {
    setIsEmailDialogOpen(false);
  };

  const handleClosePasswordDialog = () => {
    setIsPasswordDialogOpen(false);
  };

  if (!user) {
    return (
      <Typography color="text.secondary">
        Unable to load your account information.
      </Typography>
    );
  }

  return (
    <>
      {/* Account information rows */}
      <Stack spacing={2}>
        {/* Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Box sx={{ width: 110, flexShrink: 0 }}>
            <Typography>Name</Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              value={user.name}
              size="small"
              slotProps={{
                input: { readOnly: true },
              }}
              sx={{
                bgcolor: grey[100],
                // Target the outlined input wrapper to style borders
                "& .MuiOutlinedInput-root": {
                  // Normal state border
                  "& fieldset": {
                    borderColor: grey[300],
                  },
                  // Hover state border
                  "&:hover fieldset": {
                    borderColor: grey[400],
                  },
                  // Focused/Active state border
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main", // or any color/hex you prefer
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Email */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Box sx={{ width: 110, flexShrink: 0 }}>
            <Typography>Email</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "center",
              gap: 1,
              flex: 1,
              minWidth: 0,
            }}
          >
            <TextField
              value={user.email}
              size="small"
              slotProps={{
                input: { readOnly: true },
              }}
              sx={{
                bgcolor: grey[100],
                // Target the outlined input wrapper to style borders
                "& .MuiOutlinedInput-root": {
                  // Normal state border
                  "& fieldset": {
                    borderColor: grey[300],
                  },
                  // Hover state border
                  "&:hover fieldset": {
                    borderColor: grey[400],
                  },
                  // Focused/Active state border
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main", // or any color/hex you prefer
                  },
                },
              }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Button
                variant="outlined"
                onClick={() => setIsEmailDialogOpen(true)}
              >
                Change email
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Password */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Box sx={{ width: 110, flexShrink: 0 }}>
            <Typography>Password</Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Button
              variant="outlined"
              onClick={() => setIsPasswordDialogOpen(true)}
            >
              Change password
            </Button>
          </Box>
        </Box>
      </Stack>

      {/* Email change modal */}
      <EmailChangeModal
        isEmailDialogOpen={isEmailDialogOpen}
        handleCloseEmailDialog={handleCloseEmailDialog}
      />

      {/* Password change modal */}
      <PasswordChangeModal
        isPasswordDialogOpen={isPasswordDialogOpen}
        handleClosePasswordDialog={handleClosePasswordDialog}
      />
    </>
  );
}

export default AccountSettings;
