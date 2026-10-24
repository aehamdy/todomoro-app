import { Box, Typography } from "@mui/material";
import ProjectsList from "./ProjectsList";
import ProjectCreateButton from "./ProjectCreateButton";

function ProjectsSection() {
  return (
    <Box sx={{ p: 1.5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
