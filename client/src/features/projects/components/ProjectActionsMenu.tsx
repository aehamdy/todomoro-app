import { useState } from "react";
import type { MouseEvent } from "react";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

type ProjectActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

function ProjectActionsMenu({ onEdit, onDelete }: ProjectActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    onEdit();
  };

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

  return (
    <>
      <IconButton
        size="small"
        aria-label="Project options"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={handleOpen}
        sx={{
          color: "text.secondary",
          "&:hover": {
            color: "primary.main",
            bgcolor: "action.hover",
          },
        }}
      >
        <MoreVertRoundedIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        onClick={(event) => event.stopPropagation()}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 6,
            sx: {
              minWidth: 120,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            },
          },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          sx={{
            gap: 1.5,
            fontSize: "0.875rem",
            color: "primary.main",
            "&:hover": { color: "text.primary" },
          }}
        >
          <EditOutlinedIcon fontSize="small" />
          Edit
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleDelete}
          sx={{
            gap: 1.5,
            fontSize: "0.875rem",
            color: "error.main",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProjectActionsMenu;
