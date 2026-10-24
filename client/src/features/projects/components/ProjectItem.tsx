import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

import type { TProject } from "../project.types";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import ProjectActionsMenu from "./ProjectActionsMenu";
import ProjectFormDialog from "./ProjectFormDialog";
import DeleteModal from "../../../components/common/DeleteModal";

type ProjectItemProps = {
  project: TProject;
  onSelect?: (project: TProject) => void;
};

function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }

  return fallbackMessage;
}

function ProjectItem({ project, onSelect }: ProjectItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const {
    updateProject,
    isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateProject();

  const {
    deleteProject,
    isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteProject();

  const updateErrorMessage = getApiErrorMessage(
    updateError,
    "Unable to update the project. Please try again.",
  );

  const deleteErrorMessage = getApiErrorMessage(
    deleteError,
    "Unable to delete the project. Please try again.",
  );

  const handleEditOpen = () => {
    setTitle(project.title);
    setDescription(project.description ?? "");
    setSelectedColor(project.color ?? "");
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    if (!isUpdating) {
      setIsEditDialogOpen(false);
    }
  };

  const handleEditSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const projectData = {
      title: title.trim(),
      description: description.trim(),
      color: selectedColor,
    };

    try {
      await updateProject({
        projectId: project._id,
        projectData,
      });

      setIsEditDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClose = () => {
    if (!isDeleting) {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(project._id);
      setIsDeleteModalOpen(false);
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
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: project.color || "inherit",
            minWidth: 40,
          }}
        >
          <FolderRoundedIcon />
        </ListItemIcon>

        <ListItemText primary={project.title} />

        <ProjectActionsMenu
          onEdit={handleEditOpen}
          onDelete={handleDeleteOpen}
        />
      </ListItemButton>

      <ProjectFormDialog
        formType="edit"
        handleOpen={isEditDialogOpen}
        handleClose={handleEditClose}
        handleSubmit={handleEditSubmit}
        isError={isUpdateError}
        errorMessage={updateErrorMessage}
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
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        isError={isDeleteError}
        errorMessage={deleteErrorMessage}
      />
    </>
  );
}

export default ProjectItem;
