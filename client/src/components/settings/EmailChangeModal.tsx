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
import { useUpdateAccount } from "../../features/auth/useUpdateAccount";

type EmailChangeModalProps = {
  isEmailDialogOpen: boolean;
  handleCloseEmailDialog: () => void;
};

function EmailChangeModal({
  isEmailDialogOpen,
  handleCloseEmailDialog,
}: EmailChangeModalProps) {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const updateAccountMutation = useUpdateAccount();

  const handleClose = () => {
    setEmail("");
    setCurrentPassword("");
    updateAccountMutation.reset();
    handleCloseEmailDialog();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateAccountMutation.reset();

    try {
      await updateAccountMutation.mutateAsync({
        email: email.trim(),
        currentPassword,
      });

      handleClose();
    } catch {
      // The mutation error is displayed below.
    }
  };

  const error = updateAccountMutation.error;

  const errorMessage = error
    ? axios.isAxiosError(error)
      ? (error.response?.data?.message ?? "Failed to update email.")
      : "Something went wrong. Please try again."
    : null;

  return (
    <Dialog
      open={isEmailDialogOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Change Email</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <TextField
              label="New Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
              size="small"
              disabled={updateAccountMutation.isPending}
            />

            <TextField
              label="Current Password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              fullWidth
              size="small"
              disabled={updateAccountMutation.isPending}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            disabled={updateAccountMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={
              updateAccountMutation.isPending ||
              !email.trim() ||
              !currentPassword
            }
          >
            {updateAccountMutation.isPending ? "Updating..." : "Update Email"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EmailChangeModal;
