import { Box, List, Stack, Typography } from "@mui/material";
import ProjectItem from "./ProjectItem";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import type { TProject } from "../project.types";
import { useFetchProjects } from "../hooks/useFetchProjects";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import RecentProjectItemSkeleton from "../../overview/components/skeletons/RecentProjectItemSkeleton";

function ProjectsList() {
  const { projects, isLoading, isError, error } = useFetchProjects();

  if (isLoading) return <RecentProjectItemSkeleton count={5} />;

  if (isError) {
    return (
      <ErrorAlert
        message={
          error instanceof Error
            ? error.message
            : "We couldn't load your projects. Please try again."
        }
      />
    );
  }

  if (projects.length === 0) {
    return (
      <Box
        sx={{
          height: "235px",
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <Stack
          sx={{
            spacing: 1,
            alignItems: "center",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              bgcolor: "primary.lighter",
              color: "text.secondary",
            }}
          >
            <FolderOpenOutlinedIcon />
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            No projects yet
          </Typography>

          <Typography variant="body2" sx={{ maxWidth: 260 }}>
            Create a project to start organizing your tasks.
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: { xs: 1, md: 0.5 },
        minHeight: 0,
        maxHeight: { xs: "280px", lg: "240px" },
        pb: 0.5,
        px: 0.5,
        fontSize: "10px",
        bgcolor: "background.default",
        borderRadius: 1,
        overflowY: "auto",
      }}
    >
      {projects.map((project: TProject) => (
        <ProjectItem key={project._id} project={project} />
      ))}
    </List>
  );
}

export default ProjectsList;
