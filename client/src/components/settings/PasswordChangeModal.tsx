import { useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useChangePassword } from "../../features/auth/useChangePassword";

type PasswordChangeModalProps = {
  isPasswordDialogOpen: boolean;
  handleClosePasswordDialog: () => void;
};

function PasswordChangeModal({
  isPasswordDialogOpen,
  handleClosePasswordDialog,
}: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const changePasswordMutation = useChangePassword();

  const isPending = changePasswordMutation.isPending;

  const handleClose = () => {
    if (isPending) return;

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setValidationError("");
    changePasswordMutation.reset();
    handleClosePasswordDialog();
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");
    changePasswordMutation.reset();

    if (newPassword !== confirmPassword) {
      setValidationError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setValidationError(
        "Your new password must differ from your current password.",
      );
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      handleClosePasswordDialog();
    } catch {
      // Display the mutation error below.
    }
  };

  const error = changePasswordMutation.error;

  const serverError = error
    ? axios.isAxiosError(error)
      ? (error.response?.data?.message ??
        "Failed to change password. Please try again.")
      : "Something went wrong. Please try again."
    : null;

  return (
    <Dialog
      open={isPasswordDialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Change Password</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {(validationError || serverError) && (
              <Alert severity="error">{validationError || serverError}</Alert>
            )}

            <TextField
              label="Current Password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              fullWidth
              size="small"
              disabled={isPending}
            />

            <TextField
              label="New Password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              fullWidth
              size="small"
              disabled={isPending}
              slotProps={{
                htmlInput: { minLength: 8 },
              }}
              helperText="Use at least 8 characters."
            />

            <TextField
              label="Confirm New Password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              fullWidth
              size="small"
              disabled={isPending}
              slotProps={{
                htmlInput: { minLength: 8 },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={
              isPending || !currentPassword || !newPassword || !confirmPassword
            }
          >
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PasswordChangeModal;
