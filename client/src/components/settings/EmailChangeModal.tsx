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

type EmailChangeModalProps = {
  isEmailDialogOpen: boolean;
  handleCloseEmailDialog: () => void;
};

function EmailChangeModal({
  isEmailDialogOpen,
  handleCloseEmailDialog,
}: EmailChangeModalProps) {
  return (
    <Dialog
      open={isEmailDialogOpen}
      onClose={handleCloseEmailDialog}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Change email</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Box sx={{ width: 110, flexShrink: 0 }}>
              <Typography>New Email</Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <TextField
                value=""
                size="small"
                type="email"
                autoComplete="current-email"
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
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleCloseEmailDialog}>Cancel</Button>

        <Button variant="contained" disabled>
          Update Email
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmailChangeModal;
