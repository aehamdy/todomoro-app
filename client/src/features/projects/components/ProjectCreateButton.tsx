import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Stack,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useCreateProject } from "../hooks/useCreateProject";
import { PROJECT_COLORS } from "../project.constants";
import axios from "axios";

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

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        closeAfterTransition={false}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: "600" }}>
            Create New Project
          </DialogTitle>
          <DialogContent>
            {isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Project Title"
                placeholder="e.g., Work, Personal, Marketing"
                disabled={isCreating}
                fullWidth
                required
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                size="small"
              />

              <TextField
                label="Description (Optional)"
                placeholder="Brief summary of the project..."
                disabled={isCreating}
                fullWidth
                multiline
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                size="small"
              />

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block", mb: 1 }}
                >
                  Project Color
                </Typography>
                <Stack
                  role="group"
                  aria-labelledby="project-color-label"
                  sx={{ flexDirection: "row", gap: 1, flexWrap: "wrap" }}
                >
                  {PROJECT_COLORS.map((color, index) => {
                    const selected = selectedColor === color;

                    return (
                      <IconButton
                        key={color}
                        type="button"
                        aria-label={`Select project color ${color}`}
                        aria-pressed={selected}
                        title={`Color option ${index + 1}`}
                        disabled={isCreating}
                        onClick={() => setSelectedColor(color)}
                        sx={{
                          width: 22,
                          height: 22,
                          bgcolor: color,
                          border: "2px solid",
                          borderColor: selected
                            ? "text.primary"
                            : "transparent",
                          outline: "2px solid transparent",
                          outlineOffset: 2,
                          "&:hover": {
                            bgcolor: color,
                            filter: "brightness(0.92)",
                          },
                          "&.Mui-focusVisible": {
                            outlineColor: "primary.main",
                          },
                        }}
                      >
                        {selected && (
                          <CheckRoundedIcon
                            sx={{
                              fontSize: "14px",
                              color: "#fff",
                              filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.65))",
                            }}
                          />
                        )}
                      </IconButton>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} color="inherit" disabled={isCreating}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={!title.trim() || isCreating}
            >
              {isCreating ? "Creating..." : "Create Project"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default ProjectCreateButton;
