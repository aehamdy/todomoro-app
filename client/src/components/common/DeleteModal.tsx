import {
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
  itemType: "task" | "subtask";
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteModal({
  open,
  itemName,
  itemType,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  const title = `Delete ${itemType}`;

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      closeAfterTransition={false}
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
