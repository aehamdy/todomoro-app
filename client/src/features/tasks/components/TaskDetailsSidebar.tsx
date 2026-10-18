import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import CloseIcon from "@mui/icons-material/Close";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { priorityColors } from "../task.constants";
import { formatDateTime } from "../../../utils/utils";
import { CheckCircle } from "@mui/icons-material";
import { useTaskDetails } from "../hooks/useTaskDetails";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useState } from "react";
import DeleteTaskDialog from "./DeleteTaskDialog";

type TaskDetailsSidebarProps = {
  taskId: string;
  onClose: () => void;
};

function TaskDetailsSidebar({ taskId, onClose }: TaskDetailsSidebarProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { task, isLoading, isError } = useTaskDetails(taskId);
  const { deleteTask, isDeleting, isError: isDeleteError } = useDeleteTask();

  if (isLoading) {
    return <div>Loading task details...</div>;
  }

  if (isError || !task) {
    return <div>Failed to load task details.</div>;
  }

  const dueDate = task.dueDate ? formatDateTime(task.dueDate) : "Someday";

  const handleDelete = () => {
    deleteTask(taskId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        onClose();
      },
    });
  };

  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: 0,
        height: "calc(100% - 40px)",
        my: "20px",
        mx: 2,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: "8px",
        overflowY: "auto",
      }}
    >
      <Stack>
        <Box>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontWeight: 600,
              }}
            >
              {task.isCompleted ? (
                <CheckCircle
                  sx={{
                    color: "#a9a9a9",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <FlagIcon
                  sx={{
                    color: priorityColors[task.priority].bg,
                    fontSize: "30px",
                    flexShrink: 0,
                  }}
                />
              )}
              Task details
            </Typography>

            <IconButton
              aria-label="Close task details"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 2 }} />
        </Box>

        <Stack spacing={2}>
          <Typography
            variant="h6"
            sx={{
              overflowWrap: "anywhere",
            }}
          >
            {task.title}
          </Typography>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Due date
            </Typography>
            <Typography>{dueDate}</Typography>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>

            <Typography>
              {task.isCompleted ? "Completed" : "In progress"}
            </Typography>
          </Stack>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Note
            </Typography>
            <Typography
              sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
            >
              {task.note || "No note added."}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Box>
        <Divider sx={{ mb: 2 }} />

        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Created {formatDateTime(task.createdAt)}
          </Typography>

          <Stack spacing={1} sx={{ alignItems: "flex-end" }}>
            {isDeleteError && (
              <Alert severity="error" sx={{ width: "100%" }}>
                Failed to delete task. Please try again.
              </Alert>
            )}

            <IconButton
              aria-label="Delete task"
              color="error"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}
              size="small"
            >
              {isDeleting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <DeleteRoundedIcon />
              )}
            </IconButton>
          </Stack>

          <DeleteTaskDialog
            taskTitle={task.title}
            isDeleteDialogOpen={isDeleteDialogOpen}
            isDeleting={isDeleting}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            handleDelete={handleDelete}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default TaskDetailsSidebar;
