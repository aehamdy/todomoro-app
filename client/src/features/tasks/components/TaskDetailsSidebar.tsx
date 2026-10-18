import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import CloseIcon from "@mui/icons-material/Close";
import type { Task } from "../task.types";
import { priorityColors } from "../task.constants";
import { formatDateTime } from "../../../utils/utils";
import { CheckCircle } from "@mui/icons-material";

type TaskDetailsSidebarProps = {
  task: Task;
  onClose: () => void;
};

function TaskDetailsSidebar({ task, onClose }: TaskDetailsSidebarProps) {
  const dueDate = task.dueDate ? formatDateTime(task.dueDate) : "Someday";

  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: 0,
        height: "100%",
        p: 2,
        bgcolor: "background.paper",
        borderLeft: 1,
        borderColor: "divider",
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

          <IconButton
            aria-label="Close task details"
            size="small"
            onClick={onClose}
          >
            {/* delete button */}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default TaskDetailsSidebar;
