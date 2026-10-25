import { useState } from "react";
import type { MouseEvent } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
// import AssignmentRoundedIcon from "@mui/icons-material/AssignmentIndOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useFetchProjects } from "../../projects/hooks/useFetchProjects";
import { useUpdateTask } from "../hooks/useUpdateTask";

type TaskProjectProps = {
  taskId: string;
  projectId: string | null;
};

function TaskProject({ taskId, projectId }: TaskProjectProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { projects, isLoading, isError } = useFetchProjects();
  const { updateTask, isUpdating, isError: isUpdateError } = useUpdateTask();

  const selectedProject = projects.find((project) => project._id === projectId);

  const isMenuOpen = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProjectChange = async (nextProjectId: string | null) => {
    if (nextProjectId === projectId || isUpdating) {
      handleClose();
      return;
    }

    try {
      await updateTask({
        taskId,
        taskData: { project: nextProjectId },
      });

      handleClose();
    } catch (error) {
      console.error("Failed to change task project:", error);
    }
  };

  return (
    <Stack spacing={1}>
      <Stack
        component="button"
        type="button"
        onClick={handleOpen}
        disabled={isLoading || isUpdating}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: 1,
          border: 0,
          borderRadius: 2,
          backgroundColor: "transparent",
          textAlign: "left",
          font: "inherit",
          cursor: isLoading || isUpdating ? "default" : "pointer",
          "&:hover": {
            backgroundColor:
              isLoading || isUpdating ? "transparent" : "action.hover",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FolderOutlinedIcon fontSize="small" />
          <Typography color="text.secondary">Project</Typography>
        </Box>

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            spacing: 0.75,
            minWidth: 0,
          }}
        >
          {isUpdating && <CircularProgress size={16} />}

          <Typography variant="body2" sx={{ color: "text.primary" }} noWrap>
            {isLoading ? "Loading..." : (selectedProject?.title ?? "Tasks")}
          </Typography>
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.75,
              minWidth: 200,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            },
          },
          list: {
            sx: {
              py: 0.5,
            },
          },
        }}
      >
        <MenuItem
          selected={projectId === null}
          onClick={() => void handleProjectChange(null)}
        >
          <ListItemIcon sx={{ color: "primary.main" }}>
            <ChecklistIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Tasks</ListItemText>

          {projectId === null && <CheckIcon fontSize="small" />}
        </MenuItem>

        {projects.map((project) => (
          <MenuItem
            key={project._id}
            selected={project._id === projectId}
            onClick={() => void handleProjectChange(project._id)}
          >
            <ListItemIcon>
              <FolderRoundedIcon
                fontSize="small"
                sx={{ color: project.color ?? "text.secondary" }}
              />
            </ListItemIcon>

            <ListItemText>{project.title}</ListItemText>

            {project._id === projectId && <CheckIcon fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>

      {isError && <Alert severity="error">Failed to load projects.</Alert>}

      {isUpdateError && (
        <Alert severity="error">
          Failed to change the task&apos;s project. Please try again.
        </Alert>
      )}
    </Stack>
  );
}

export default TaskProject;
