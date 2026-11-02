import { List } from "@mui/material";
import ProjectItem from "./ProjectItem";
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

  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1, md: 0.5 },
        minHeight: 0,
        height: "235px",
        pb: 0.5,
        px: 1,
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
