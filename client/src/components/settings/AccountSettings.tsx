/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import EmailChangeModal from "./EmailChangeModal";
import PasswordChangeModal from "./PasswordChangeModal";
import { useUpdateAccount } from "../../features/auth/useUpdateAccount";
import { useAuth } from "../../features/auth/useAuth";

function AccountSettings() {
  const { user, isLoading } = useAuth();
  const updateAccountMutation = useUpdateAccount();

  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  useEffect(() => {
    if (user?.name !== undefined) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleCloseEmailDialog = () => {
    setIsEmailDialogOpen(false);
  };

  const handleClosePasswordDialog = () => {
    setIsPasswordDialogOpen(false);
  };

  const handleBlur = async () => {
    if (!user || isSaving) return;

    const trimmedName = name.trim();

    if (!trimmedName) {
      setName(user.name);
      setError("Name cannot be empty.");
      return;
    }

    if (trimmedName === user.name) {
      setName(user.name);
      setError("");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const response = await updateAccountMutation.mutateAsync({
        name: trimmedName,
      });

      setName(response.data.user.name);
      setError("");
    } catch {
      setName(user.name);
      setError("Failed to update your name. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <Typography>Loading account information...</Typography>;
  }

  if (!user) {
    return (
      <Typography color="text.secondary">
        Unable to load your account information.
      </Typography>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        {/* Name */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Box sx={{ width: 110, flexShrink: 0 }}>
            <Typography>Name</Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TextField
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              onBlur={handleBlur}
              size="small"
              disabled={isSaving}
              error={Boolean(error)}
              helperText={error || (isSaving ? "Saving..." : " ")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: grey[300],
                  },
                  "&:hover fieldset": {
                    borderColor: grey[400],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
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
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: grey[300],
                  },
                  "&:hover fieldset": {
                    borderColor: grey[400],
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
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
