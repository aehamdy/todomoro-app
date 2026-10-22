import {
  Alert,
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import type { Subtask } from "../task.types";
import { useUpdateSubtask } from "../hooks/useUpdateSubtask";
import { useDeleteSubtask } from "../hooks/useDeleteSubtask";
import { useState } from "react";
import DeleteModal from "../../../components/common/DeleteModal";

type SubtaskItemProps = {
  taskId: string;
  subtask: Subtask;
};

function SubtaskItem({ taskId, subtask }: SubtaskItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditingSubtask, setIsEditingSubtask] = useState(false);
  const [draftTitle, setDraftTitle] = useState(subtask.title);

  const {
    updateTask,
    isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateSubtask();
  const {
    deleteTask,
    isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteSubtask();

  const handleToggle = async () => {
    try {
      await updateTask({
        taskId,
        subtaskId: subtask._id,
        subtaskData: { isCompleted: !subtask.isCompleted },
      });
    } catch {
      //
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask({ taskId, subtaskId: subtask._id });

      setIsDeleteModalOpen(false);
    } catch {
      //
    }
  };

  const handleStartEditing = () => {
    setDraftTitle(subtask.title);
    setIsEditingSubtask(true);
  };

  const handleCancelEditing = () => {
    setDraftTitle(subtask.title);
    setIsEditingSubtask(false);
  };

  const handleSaveSubtask = async () => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle || isUpdating) return;

    if (trimmedTitle === subtask.title) {
      setIsEditingSubtask(false);
      return;
    }

    try {
      await updateTask({
        taskId,
        subtaskId: subtask._id,
        subtaskData: { title: trimmedTitle },
      });

      setIsEditingSubtask(false);
    } catch {
      // Keep the editor open so the user can retry.
    }
  };

  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 0,
          py: 1,
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
            minWidth: 0,
          }}
        >
          <Checkbox
            icon={
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "6px",
                  border: "2px solid",
                  borderColor: "text.secondary",
                }}
              />
            }
            checkedIcon={
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "6px",
                  bgcolor: "success.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckIcon sx={{ fontSize: 14, color: "white" }} />
              </Box>
            }
            checked={subtask.isCompleted}
            onChange={handleToggle}
            disabled={isUpdating || isDeleting}
            size="small"
            slotProps={{
              input: {
                "aria-label": `Complete ${subtask.title}`,
              },
            }}
          />
          {isEditingSubtask ? (
            <TextField
              autoFocus
              fullWidth
              size="small"
              variant="standard"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              disabled={isUpdating}
              error={!draftTitle.trim()}
              helperText={!draftTitle.trim() ? "Title is required" : ""}
              slotProps={{
                htmlInput: {
                  maxLength: 100,
                  "aria-label": "Edit subtask title",
                  onKeyDown: (event: {
                    key: string;
                    preventDefault: () => void;
                  }) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void handleSaveSubtask();
                    }

                    if (event.key === "Escape") {
                      handleCancelEditing();
                    }
                  },
                },
              }}
              sx={{ flex: 1, minWidth: 0 }}
            />
          ) : (
            <>
              {isUpdating && (
                <CircularProgress
                  size={16}
                  thickness={5}
                  aria-label="Updating subtask"
                  sx={{ flexShrink: 0 }}
                />
              )}

              <Typography
                onClick={handleStartEditing}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: subtask.isCompleted ? "line-through" : "none",
                  //   change the color to dark grey while updating
                  color:
                    subtask.isCompleted || isUpdating
                      ? "text.secondary"
                      : "text.primary",
                  wordBreak: "break-word",
                  flex: 1,
                  cursor: "text",
                  minWidth: 0,
                }}
              >
                {subtask.title}
              </Typography>
            </>
          )}
        </Stack>

        {isEditingSubtask ? (
          <>
            <IconButton
              aria-label="Save subtask"
              onClick={() => void handleSaveSubtask()}
              disabled={!draftTitle.trim() || isUpdating}
              size="small"
              sx={{ color: "success.main" }}
            >
              <CheckIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="Cancel editing"
              onClick={handleCancelEditing}
              disabled={isUpdating}
              size="small"
              sx={{ color: "text.secondary" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <IconButton
            aria-label={`Delete ${subtask.title}`}
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting || isUpdating}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": { color: "error.main" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </ListItem>

      {(isUpdateError || isDeleteError) && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {isUpdateError
            ? updateError instanceof Error
              ? updateError.message
              : "Failed to update subtask."
            : deleteError instanceof Error
              ? deleteError.message
              : "Failed to delete subtask."}
        </Alert>
      )}

      <DeleteModal
        open={isDeleteModalOpen}
        itemName={subtask.title}
        itemType="subtask"
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}

export default SubtaskItem;
