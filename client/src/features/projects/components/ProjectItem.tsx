import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

import type { TProject } from "../project.types";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import ProjectActionsMenu from "./ProjectActionsMenu";
import ProjectFormDialog from "./ProjectFormDialog";
import DeleteModal from "../../../components/common/DeleteModal";
import { ROUTES } from "../../../routes/paths";
import { useNavigate } from "react-router-dom";

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

function ProjectItem({ project }: ProjectItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const navigate = useNavigate();

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

  const handleProjectSelect = () => {
    navigate(ROUTES.projectById(project._id));
  };

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
        onClick={handleProjectSelect}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1,
          color: "text.secondary",
          borderRadius: 2,
          position: "relative",
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
            minWidth: 36,
            position: "relative",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontVariantNumeric: "tabular-nums",
              transition: "opacity 0.2s ease, visibility 0.2s ease",

              "@media (min-width: 900px) and (hover: hover) and (pointer: fine)":
                {
                  ".MuiListItemButton-root:hover &, .MuiListItemButton-root:focus-within &":
                    {
                      opacity: 0,
                      visibility: "hidden",
                    },
                },
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "inline", md: "none" } }}
            >
              ({project.tasksCount})
            </Box>

            <Box
              component="span"
              sx={{ display: { xs: "none", md: "inline" } }}
            >
              {project.tasksCount}
            </Box>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              transition: "opacity 0.2s ease, visibility 0.2s ease",

              "@media (min-width: 900px) and (hover: hover) and (pointer: fine)":
                {
                  position: "absolute",
                  right: 0,
                  opacity: 0,
                  visibility: "hidden",

                  ".MuiListItemButton-root:hover &, .MuiListItemButton-root:focus-within &":
                    {
                      opacity: 1,
                      visibility: "visible",
                    },
                },

              "@media (max-width: 899.95px)": {
                position: "static",
                opacity: 1,
                visibility: "visible",
              },
            }}
          >
            <ProjectActionsMenu
              onEdit={handleEditOpen}
              onDelete={handleDeleteOpen}
            />
          </Box>
        </Box>
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
