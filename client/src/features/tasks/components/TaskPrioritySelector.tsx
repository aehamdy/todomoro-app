import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import type { TaskPriority } from "../task.types";
import { useState } from "react";
import FlagIcon from "@mui/icons-material/Flag";

type TaskPriorityProps = {
  priority: TaskPriority;
  onSave: (priority: TaskPriority) => void;
  isSaving: boolean;
};

const PRIORITY_OPTIONS: {
  value: TaskPriority;
  label: string;
  color: string;
}[] = [
  { value: "low", label: "Low", color: "#095b45" },
  { value: "medium", label: "Medium", color: "#5a7b8b" },
  { value: "high", label: "High", color: "#f36e42" },
  { value: "urgent", label: "Urgent", color: "#a10207" },
];

function TaskPrioritySelector({
  priority,
  onSave,
  isSaving,
}: TaskPriorityProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (isSaving) return;

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newPriority: TaskPriority) => {
    handleClose();

    if (newPriority !== priority) {
      onSave(newPriority);
    }
  };

  const currentPriority = PRIORITY_OPTIONS.find(
    (option) => option.value === priority,
  );

  return (
    <>
      <Stack
        onClick={handleOpen}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mx: -0.5,
          p: 1,
          borderRadius: 1,
          cursor: isSaving ? "default" : "pointer",
          "&:hover": {
            backgroundColor: isSaving ? "transparent" : "action.hover",
          },
        }}
      >
        <Typography
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <FlagOutlinedIcon color="inherit" />
          Priority
        </Typography>

        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
            py: 0.5,
            px: 1.5,
            bgcolor: currentPriority?.color ?? "text.secondary",
            borderRadius: 2,
          }}
        >
          <FlagIcon
            fontSize="small"
            // sx={{ color: currentPriority?.color ?? "text.secondary" }}
            sx={{ color: "white" }}
          />

          <Typography
            variant="body2"
            sx={{
              color: "white",
              bgcolor: currentPriority?.color,
            }}
          >
            {currentPriority?.label ?? priority}
          </Typography>
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 160,
              mt: 0.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              "& .MuiMenuItem-root": {
                minHeight: 36,
                gap: 1,
                fontSize: "0.875rem",
              },
            },
          },
        }}
      >
        {PRIORITY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === priority}
            disabled={isSaving}
            onClick={() => handleSelect(option.value)}
            sx={{ color: option.color ?? "text.secondary" }}
          >
            <FlagIcon fontSize="small" sx={{ color: "inherit" }} />
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default TaskPrioritySelector;
