import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { PROJECT_COLORS } from "../project.constants";
import type { Dispatch, FormEvent, SetStateAction } from "react";

type ProjectFormDialogProps = {
  formType: "create" | "edit";
  handleOpen: boolean;
  handleClose: () => void;
  handleSubmit: (e: FormEvent) => void;
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
};

function ProjectFormDialog({
  formType,
  handleOpen,
  handleClose,
  handleSubmit,
  isError,
  errorMessage,
  isLoading,
  title,
  setTitle,
  description,
  setDescription,
  selectedColor,
  setSelectedColor,
}: ProjectFormDialogProps) {
  const isCreate = formType === "create";
  const formTitle = isCreate ? "Create New Project" : "Update project";
  const submitLabel = isCreate ? "Create Project" : "Update Project";
  const loadingLabel = isCreate ? "Creating..." : "Updating...";

  return (
    <Dialog
      open={handleOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      closeAfterTransition={false}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: "600" }}>{formTitle}</DialogTitle>

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
              disabled={isLoading}
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
              disabled={isLoading}
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
                      disabled={isLoading}
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: color,
                        border: "2px solid",
                        borderColor: selected ? "text.primary" : "transparent",
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
          <Button onClick={handleClose} color="inherit" disabled={isLoading}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? loadingLabel : submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProjectFormDialog;
