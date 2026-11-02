import { Stack } from "@mui/material";
import { useState } from "react";
import TaskList from "../features/tasks/components/TaskList";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskOverview from "../components/common/TaskOverview";
import TasksPageSkeleton from "../features/tasks/components/skeletons/TasksPageSkeleton";

function TasksPage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const handleTaskCountChange = (completed: number, incomplete: number) => {
    setCompletedCount(completed);
    setIncompleteCount(incomplete);
  };

  return (
    <Stack spacing={3}>
      {isLoadingData ? (
        <TasksPageSkeleton />
      ) : (
        <>
          <TaskOverview
            completed={completedCount}
            incomplete={incompleteCount}
          />

          <CreateTaskForm projectId={null} />
        </>
      )}

      <Stack sx={{ display: isLoadingData ? "none" : "block" }}>
        <TaskList
          projectId={null}
          onTaskCountChange={handleTaskCountChange}
          setIsLoadingData={setIsLoadingData}
        />
      </Stack>
    </Stack>
  );
}

export default TasksPage;
