import {
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import type { TProject } from "../project.types";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import { useState } from "react";
import ProjectFormDialog from "./ProjectFormDialog";
import { useUpdateProject } from "../hooks/useUpdateProject";
import axios from "axios";

type ProjectItemProps = {
  project: TProject;
  onSelect?: (project: TProject) => void;
  onDelete?: (project: TProject) => void;
};
function ProjectItem({ project, onSelect }: ProjectItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const { updateProject, isUpdating, isError, error } = useUpdateProject();

  const errorMessage = axios.isAxiosError(error)
    ? error.response?.data?.message ||
      "Unable to update the project. Please try again."
    : "An unexpected error occurred. Please try again.";

  const handleDotsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();

    setTitle(project.title);
    setDescription(project.description ?? "");
    setSelectedColor(project.color ?? "");

    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const projectData = {
        title: title.trim(),
        description: description.trim(),
        color: selectedColor,
      };

      await updateProject({ projectId: project._id, projectData });

      setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={() => onSelect?.(project)}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          color: "text.secondary",
          borderRadius: 2,
          "&:hover": {
            color: "primary.main",
            bgcolor: "action.hover",
            "& .MuiListItemIcon-root": {
              color: "primary.main",
            },
          },
        }}
      >
        <ListItemIcon sx={{ color: project.color || "inherit", minWidth: 40 }}>
          <FolderRoundedIcon />
        </ListItemIcon>

        <ListItemText primary={project.title} />

        <IconButton
          size="small"
          aria-label="project options"
          onClick={handleDotsClick}
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main", bgcolor: "action.hover" },
          }}
        >
          <MoreHorizRoundedIcon fontSize="small" />
        </IconButton>
      </ListItemButton>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
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
          onClick={handleEditClick}
          sx={{
            gap: 1.5,
            fontSize: "0.875rem",
            color: "primary.main",
            "&:hover": {
              color: "text.primary",
            },
          }}
        >
          <EditOutlinedIcon fontSize="small" sx={{ color: "inherit" }} />
          Edit
        </MenuItem>
      </Menu>

      {
        <ProjectFormDialog
          formType="edit"
          handleOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen(false)}
          handleSubmit={handleSubmit}
          isError={isError}
          errorMessage={errorMessage}
          isLoading={isUpdating}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      }
    </>
  );
}

export default ProjectItem;
