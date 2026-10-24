import {
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TProject } from "../project.types";
import { useState } from "react";
import ProjectFormDialog from "./ProjectFormDialog";
import { useUpdateProject } from "../hooks/useUpdateProject";
import axios from "axios";
import { useDeleteProject } from "../hooks/useDeleteProject";
import DeleteModal from "../../../components/common/DeleteModal";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { updateProject, isUpdating, isError, error } = useUpdateProject();
  const {
    deleteProject,
    isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteProject();

  const errorMessage = axios.isAxiosError(error)
    ? error.response?.data?.message ||
      "Unable to update the project. Please try again."
    : "An unexpected error occurred. Please try again.";

  const deleteErrorMessage = axios.isAxiosError(deleteError)
    ? deleteError.response?.data?.message ||
      "Unable to delete the project. Please try again."
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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(project._id);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Failed to delete project:", err);
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

        <Divider />

        <MenuItem
          onClick={handleDeleteClick}
          sx={{
            gap: 1.5,
            fontSize: "0.875rem",
            color: "error.main",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.08)",
              borderColor: "error.main",
            },
          }}
        >
          <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
          Delete
        </MenuItem>
      </Menu>

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

      <DeleteModal
        open={isDeleteModalOpen}
        itemName={project.title}
        itemType="project"
        isDeleting={isDeleting}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isError={isDeleteError}
        errorMessage={deleteErrorMessage}
      />
    </>
  );
}

export default ProjectItem;
