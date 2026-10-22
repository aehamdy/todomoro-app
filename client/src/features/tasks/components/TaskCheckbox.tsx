import { Box, Checkbox, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { priorityColors } from "../task.constants";
import type { TaskPriority } from "../task.types";

type TaskCheckboxProps = {
  isCompleted: boolean;
  priority?: TaskPriority;
  handleToggle: () => void;
  isToggling: boolean;
  loaderSize?: number;
};

function TaskCheckbox({
  isCompleted,
  priority,
  handleToggle,
  isToggling,
  loaderSize = 14,
}: TaskCheckboxProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: 35,
        maxHeight: "100%",
      }}
    >
      {isToggling ? (
        <CircularProgress
          size={loaderSize}
          thickness={5}
          aria-label="Updating task"
        />
      ) : (
        <Checkbox
          icon={
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "6px",
                border: "2px solid",
                borderColor: priority
                  ? priorityColors[priority]
                  : "text.secondary",
              }}
            />
          }
          checkedIcon={
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "6px",
                bgcolor: priority
                  ? priorityColors[priority].text
                  : "success.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckIcon sx={{ fontSize: 14, color: "white" }} />
            </Box>
          }
          checked={isCompleted}
          onChange={handleToggle}
          onClick={(event) => event.stopPropagation()}
          disabled={isToggling}
          disableRipple
          sx={{
            p: 0.5,
            color: priority ? priorityColors[priority].text : "text.secondary",
            "&.Mui-checked": {
              color: priority ? priorityColors[priority].text : "success.main",
            },
            "&:hover": {
              scale: "1.1",
            },
          }}
          slotProps={{
            input: {
              "aria-label": "Toggle task completion",
            },
          }}
        />
      )}
    </Box>
  );
}

export default TaskCheckbox;
