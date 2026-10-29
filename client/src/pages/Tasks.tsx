import { Stack } from "@mui/material";
import TaskList from "../features/tasks/components/TaskList";
import { useState } from "react";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskOverview from "../components/common/TaskOverview";

function TasksPage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);

  const handleTaskCountChange = (completed: number, incomplete: number) => {
    setCompletedCount(completed);
    setIncompleteCount(incomplete);
  };

  return (
    <Stack spacing={3}>
      <TaskOverview completed={completedCount} incomplete={incompleteCount} />

      <CreateTaskForm projectId={null} />

      <TaskList projectId={null} onTaskCountChange={handleTaskCountChange} />
    </Stack>
  );
}

export default TasksPage;
