import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

type DeleteTaskDialogProps = {
  taskTitle: string;
  isDeleteDialogOpen: boolean;
  isDeleting: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
};

function DeleteTaskDialog({
  taskTitle,
  isDeleteDialogOpen,
  isDeleting,
  setIsDeleteDialogOpen,
  handleDelete,
}: DeleteTaskDialogProps) {
  return (
    <Dialog
      open={isDeleteDialogOpen}
      onClose={() => {
        if (!isDeleting) {
          setIsDeleteDialogOpen(false);
        }
      }}
      aria-labelledby="delete-task-dialog-title"
      aria-describedby="delete-task-dialog-description"
      closeAfterTransition={false}
    >
      <DialogTitle id="delete-task-dialog-title">Delete task?</DialogTitle>

      <DialogContent>
        <DialogContentText id="delete-task-dialog-description">
          Are you sure you want to delete{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            "{taskTitle}"
          </Typography>
          ? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setIsDeleteDialogOpen(false)}
          disabled={isDeleting}
        >
          No
        </Button>

        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isDeleting}
          startIcon={
            isDeleting ? (
              <CircularProgress size={16} color="inherit" />
            ) : undefined
          }
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteTaskDialog;
