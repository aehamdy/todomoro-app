import type { Task } from "../task.types";
import {
  Alert,
  Box,
  ListItem,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { formatDateTime } from "../../../utils/utils";
import { grey } from "@mui/material/colors";
import { useToggleTask } from "../hooks/useToggleTask";
import { useState } from "react";
import TaskCheckbox from "./TaskCheckbox";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import FormatListBulletedRounded from "@mui/icons-material/FormatListBulletedRounded";
import { playTaskCompletionSound } from "../utils/playTaskCompletionSound";

type TaskItemProps = {
  task: Task;
  onClick: () => void;
};

function TaskItem({ task, onClick }: TaskItemProps) {
  const { toggleTask, isToggling, error, isError } = useToggleTask();
  const [showError, setShowError] = useState(false);

  const includesNote = task.note.length > 0;
  const includesSubtasks = task.subtasks.some((item) => !item.isCompleted);

  const handleToggle = async () => {
    const isCompleting = !task.isCompleted;

    try {
      await toggleTask({ taskId: task._id, isCompleted: isCompleting });

      if (isCompleting) {
        playTaskCompletionSound();
      }
    } catch {
      setShowError(true);
    }
  };

  const dueDate = task.dueDate ? formatDateTime(task.dueDate) : "No due date";

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          alignItems: "stretch",
          p: 0,
          mb: "6px",
          bgcolor: "background.default",
          borderRadius: "8px",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onClick={onClick}
      >
        <TaskCheckbox
          isCompleted={task.isCompleted}
          priority={task.priority}
          handleToggle={handleToggle}
          isToggling={isToggling}
        />

        <ListItemText
          sx={{
            my: "auto",
            py: 1,
            px: 2,
            borderInlineStart: "3px solid",
            borderColor: "background.paper",
          }}
          primary={
            <Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    textDecoration: task.isCompleted ? "line-through" : "none",
                    color: task.isCompleted ? "text.secondary" : "text.primary",
                  }}
                >
                  {task.title}
                </Typography>

                {(includesNote || includesSubtasks) && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1,
                      color: "text.secondary",
                    }}
                  >
                    {includesNote && <DescriptionOutlined fontSize="small" />}
                    {includesSubtasks && (
                      <FormatListBulletedRounded fontSize="small" />
                    )}
                  </Box>
                )}
              </Stack>

              <Typography variant="caption" sx={{ color: grey[500] }}>
                {dueDate}
              </Typography>
            </Stack>
          }
        />
      </ListItem>

      <Snackbar
        open={showError && isError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setShowError(false)}
          variant="filled"
        >
          {error instanceof Error
            ? error.message
            : "Failed to update task. Please try again."}
        </Alert>
      </Snackbar>
    </>
  );
}

export default TaskItem;
