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
        bgcolor: "action.hover",
        px: "20px",
      }}
    >
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={isCompleted}
        onChange={handleToggle}
        onClick={(event) => event.stopPropagation()}
        disabled={isToggling}
        disableRipple
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          color: priorityColors[priority].text,

          "&.Mui-checked": {
            color: "success.main",
          },

          "&:hover": {
            scale: "1.1",
          },
        }}
      />
    </Box>
  );
}

export default TaskCheckbox;
