import { Box, Paper, Stack, Typography } from "@mui/material";
import RecentProjectItem from "./RecentProjectItem";
import RecentProjectHeader from "./RecentProjectHeader";

export type RecentProject = {
  _id: string;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  totalTasks: number;
  completedTasks: number;
  incompleteTasks: number;
};

type RecentProjectsPanelProps = {
  projects: RecentProject[];
  onProjectClick?: (project: RecentProject) => void;
};

function RecentProjectsPanel({ projects }: RecentProjectsPanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        minWidth: 0,
      }}
    >
      <Stack
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2.5,
        }}
      >
        <RecentProjectHeader />

        {projects?.length === 0 ? (
          <Box
            sx={{
              py: 4,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              No projects yet
            </Typography>

            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Create a project to start organizing your tasks.
            </Typography>
          </Box>
        ) : (
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 1,
              width: "100%",
              maxWidth: "100%",
              overflowX: "hidden",
            }}
          >
            {projects?.map((project) => {
              const completedTasks = project.completedTasks;
              const incompleteTasks = project.incompleteTasks;
              const totalTasks = completedTasks + incompleteTasks;
              const progress =
                totalTasks > 0
                  ? Math.round((completedTasks / totalTasks) * 100)
                  : 0;

              return (
                <RecentProjectItem
                  key={project._id}
                  projectId={project._id}
                  projectsLength={projects.length}
                  projectTitle={project.title}
                  projectColor={project.color}
                  creationDate={project.createdAt}
                  updateDate={project.updatedAt}
                  progress={progress}
                  completedTasks={completedTasks}
                  totalTasks={totalTasks}
                />
              );
            })}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export default RecentProjectsPanel;
