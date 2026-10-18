import { Box, Checkbox } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { priorityColors } from "../task.constants";
import type { TaskPriority } from "../task.types";

type TaskCheckboxProps = {
  isCompleted: boolean;
  priority: TaskPriority;
  handleToggle: () => void;
  isToggling: boolean;
};

function TaskCheckbox({
  isCompleted,
  priority,
  handleToggle,
  isToggling,
}: TaskCheckboxProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isCompleted ? "grey.200" : priorityColors[priority].bg,
        borderInlineEnd: "1px solid #eeeeee",
        px: "20px",
      }}
    >
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={isCompleted}
        onChange={handleToggle}
        disabled={isToggling}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: "grey.500",
          "&.Mui-checked": {
            color: "grey.600",
          },
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      />
    </Box>
  );
}

export default TaskCheckbox;
