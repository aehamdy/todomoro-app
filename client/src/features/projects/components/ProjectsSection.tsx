import { Box, Typography } from "@mui/material";
import ProjectsList from "./ProjectsList";
import ProjectCreateButton from "./ProjectCreateButton";

function ProjectsSection() {
  return (
    // <Box sx={{ p: 1, bgcolor: "background.default", borderRadius: 2 }}>
    <Box sx={{ bgcolor: "background.default", borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography sx={{ fontWeight: "600", color: "text.secondary" }}>
          PROJECTS
        </Typography>

        <ProjectCreateButton />
      </Box>

      <ProjectsList />
    </Box>
  );
}

export default ProjectsSection;
