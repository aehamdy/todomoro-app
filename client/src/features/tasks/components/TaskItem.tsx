import type { Task } from "../task.types";
import {
  Box,
  Checkbox,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { priorityColors } from "../task.constants";
import { formatDateTime } from "../../../utils/utils";
import { grey } from "@mui/material/colors";

type TaskItemProps = {
  task: Task;
};

function TaskItem({ task }: TaskItemProps) {
  const dueDate = task.dueDate ? formatDateTime(task.dueDate) : "No due date";

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        alignItems: "stretch", // Ensures children stretch to full height
        p: 0,
        mb: "6px",
        bgcolor: "#fff",
        border: `1px solid ${priorityColors[task.priority].bg}`,
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Circular Checkbox Container */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: priorityColors[task.priority].bg,
          borderInlineEnd: "1px solid #eeeeee",
          px: "20px", // Adds a little horizontal padding around the checkbox
        }}
      >
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={task.isCompleted}
          // onChange={() => onToggle(task.id)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      {/* Task Text Content */}
      <ListItemText
        sx={{ my: "auto", py: 1, px: 2 }} // Centers the text vertically inside the ListItem
        primary={
          <Stack>
            <Typography
              sx={{
                fontWeight: 600,
                textDecoration: task.isCompleted ? "line-through" : "none",
                color: task.isCompleted ? "text.secondary" : "text.primary",
              }}
            >
              {task.title}
            </Typography>
            <Typography variant="caption" sx={{ color: grey[500] }}>
              {dueDate}
            </Typography>
          </Stack>
        }
      />
    </ListItem>
  );
}

export default TaskItem;
