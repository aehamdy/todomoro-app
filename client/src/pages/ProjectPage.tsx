import { useParams } from "react-router-dom";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskList from "../features/tasks/components/TaskList";
import { Stack } from "@mui/material";

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return null;
  }

  return (
    <Stack spacing={3}>
      <CreateTaskForm projectId={projectId} />

      <TaskList projectId={projectId} />
    </Stack>
  );
}

export default ProjectPage;
