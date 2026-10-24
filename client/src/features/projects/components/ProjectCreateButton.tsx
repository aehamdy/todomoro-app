import { useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useCreateProject } from "../hooks/useCreateProject";
import { PROJECT_COLORS } from "../project.constants";
import axios from "axios";
import ProjectFormDialog from "./ProjectFormDialog";

function ProjectCreateButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(PROJECT_COLORS[4]);

  const { createProject, isCreating, isError, error, reset } =
    useCreateProject();

  const errorMessage = axios.isAxiosError(error)
    ? error.response?.data?.message ||
      "Unable to create the project. Please try again."
    : "An unexpected error occurred. Please try again.";

  const handleOpen = () => {
    reset();
    setOpen(true);
  };
  const handleClose = () => {
    if (isCreating) return;

    setOpen(false);
    setTitle("");
    setDescription("");
    setSelectedColor(PROJECT_COLORS[4]);
    reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const projectData = {
        title: title.trim(),
        description: description.trim(),
        color: selectedColor,
      };

      await createProject(projectData);

      handleClose();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <>
      {isCreating ? (
        <CircularProgress size={28} thickness={5} aria-label="Updating task" />
      ) : (
        <IconButton
          size="small"
          onClick={handleOpen}
          aria-label="create project"
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main", bgcolor: "action.hover" },
          }}
        >
          <AddRoundedIcon fontSize="small" />
        </IconButton>
      )}

      <ProjectFormDialog
        formType="create"
        handleOpen={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isError={isError}
        errorMessage={errorMessage}
        isLoading={isCreating}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
    </>
  );
}

export default ProjectCreateButton;
