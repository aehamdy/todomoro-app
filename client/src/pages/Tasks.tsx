import { Paper, Stack } from "@mui/material";
import TaskList from "../features/tasks/components/TaskList";
import TaskCompletionSummary from "../features/tasks/components/TaskCompletionSummary";
import { useState } from "react";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";

function TasksPage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  const handleTaskCountChange = (completed: number, incomplete: number) => {
    setCompletedCount(completed);
    setIncompleteCount(incomplete);
  };

  return (
    <Stack spacing={3}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: "8px" }}>
        <Stack
          direction="row"
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

      <CreateTaskForm projectId={null} />

      <TaskList projectId={null} onTaskCountChange={handleTaskCountChange} />
    </Stack>
  );
}

export default TasksPage;
