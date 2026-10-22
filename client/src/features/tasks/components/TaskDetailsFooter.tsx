import { Alert, Box, Button, CircularProgress, Stack } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteTaskDialog from "./DeleteTaskDialog";
import type { Dispatch, SetStateAction } from "react";

type TaskDetailsFooterProps = {
  taskTitle: string;
  creationDate: string | Date;
  isDeleteError: boolean;
  isDeleting: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  isDeleteDialogOpen: boolean;
  handleDelete: () => void;
};

function TaskDetailsFooter({
  taskTitle,
  isDeleteError,
  isDeleting,
  setIsDeleteDialogOpen,
  isDeleteDialogOpen,
  handleDelete,
}: TaskDetailsFooterProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {isDeleteError && (
          <Alert severity="error" sx={{ width: "100%" }}>
            Failed to delete task. Please try again.
          </Alert>
        )}

        <Button
          variant="outlined"
          aria-label="Delete task"
          color="error"
          onClick={() => setIsDeleteDialogOpen(true)}
          disabled={isDeleting}
          size="small"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "16px",
          }}
        >
          {isDeleting ? (
            <>
              <CircularProgress size={14} color="inherit" />
              Deleting...
            </>
          ) : (
            <>
              <DeleteRoundedIcon />
              Delete
            </>
          )}
        </Button>

        <DeleteTaskDialog
          taskTitle={taskTitle}
          isDeleteDialogOpen={isDeleteDialogOpen}
          isDeleting={isDeleting}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          handleDelete={handleDelete}
        />
      </Stack>
    </Box>
  );
}

export default TaskDetailsFooter;
