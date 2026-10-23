import { List } from "@mui/material";
import ProjectItem from "./ProjectItem";
import type { TProject } from "../project.types";
import { useFetchProjects } from "../hooks/useFetchProjects";
import AppLoader from "../../../components/ui/AppLoader";
import ErrorAlert from "../../../components/ui/ErrorAlert";

function ProjectsList() {
  const { projects, isLoading, isError, error } = useFetchProjects();

  if (isLoading) return <AppLoader message="Loading projects..." size={22} />;

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

  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      {projects.map((project: TProject) => (
        <ProjectItem key={project._id} project={project} />
      ))}
    </List>
  );
}

export default ProjectsList;
