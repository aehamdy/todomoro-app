import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

type PasswordChangeModalProps = {
  isPasswordDialogOpen: boolean;
  handleClosePasswordDialog: () => void;
};

function PasswordChangeModal({
  isPasswordDialogOpen,
  handleClosePasswordDialog,
}: PasswordChangeModalProps) {
  return (
    <Dialog
      open={isPasswordDialogOpen}
      onClose={handleClosePasswordDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Change password</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Box sx={{ width: 110, flexShrink: 0 }}>
              <Typography>Current Password</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TextField
                value=""
                size="small"
                type="password"
                autoComplete="current-password"
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
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Box sx={{ width: 110, flexShrink: 0 }}>
              <Typography>New Password</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TextField
                value=""
                size="small"
                type="password"
                autoComplete="new-password"
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
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Box sx={{ width: 110, flexShrink: 0 }}>
              <Typography>Confirm Password</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TextField
                value=""
                size="small"
                type="password"
                autoComplete="confirm-password"
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
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClosePasswordDialog}>Cancel</Button>

        <Button variant="contained" disabled>
          Update password
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PasswordChangeModal;
