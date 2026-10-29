import { useParams } from "react-router-dom";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskList from "../features/tasks/components/TaskList";
import { Stack } from "@mui/material";
import { useCallback, useState } from "react";
import TaskOverview from "../components/common/TaskOverview";

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  const handleTaskCountChange = useCallback(
    (completed: number, incomplete: number) => {
      setCompletedCount(completed);
      setIncompleteCount(incomplete);
    },
    [],
  );

  if (!projectId) {
    return null;
  }

  return (
    <Stack spacing={3}>
      <TaskOverview completed={completedCount} incomplete={incompleteCount} />

      <CreateTaskForm projectId={projectId} />

      <TaskList
        projectId={projectId}
        onTaskCountChange={handleTaskCountChange}
      />
    </Stack>
  );
}

export default ProjectPage;
