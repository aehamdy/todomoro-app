import { useParams } from "react-router-dom";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskList from "../features/tasks/components/TaskList";
import { Paper, Stack } from "@mui/material";
import TaskCompletionSummary from "../features/tasks/components/TaskCompletionSummary";
import { useCallback, useState } from "react";

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
      <Paper elevation={0} sx={{ p: 3, borderRadius: "8px" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={6}
          sx={{
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-evenly",
          }}
        >
          <TaskCompletionSummary count={incompleteCount} status="incomplete" />
          <TaskCompletionSummary count={completedCount} status="completed" />
        </Stack>
      </Paper>

      <CreateTaskForm projectId={projectId} />

      <TaskList
        projectId={projectId}
        onTaskCountChange={handleTaskCountChange}
      />
    </Stack>
  );
}

export default ProjectPage;
