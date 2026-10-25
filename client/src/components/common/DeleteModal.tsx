import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DeleteModalProps = {
  open: boolean;
  itemName: string;
  itemType: "task" | "subtask" | "project";
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isError?: boolean;
  errorMessage?: string;
};

function DeleteModal({
  open,
  itemName,
  itemType,
  isDeleting,
  onClose,
  onConfirm,
  isError,
  errorMessage,
}: DeleteModalProps) {
  const title = `Delete ${itemType}`;

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete "{itemName}"? This action cannot be
          undone.
        </DialogContentText>

        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isDeleting} color="inherit">
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          color="error"
          variant="contained"
          //   autoFocus
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
