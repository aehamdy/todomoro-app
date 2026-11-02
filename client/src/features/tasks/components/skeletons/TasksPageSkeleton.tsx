import { Stack } from "@mui/material";
import TaskOverviewSkeleton from "../../../../components/common/TaskOverviewSkeleton";
import CreateTaskFormSkeleton from "./CreateTaskFormSkeleton";
import TaskListSkeleton from "./TaskListSkeleton";

function TasksPageSkeleton() {
  return (
    <Stack spacing={3}>
      <TaskOverviewSkeleton />

      <CreateTaskFormSkeleton />

      <TaskListSkeleton />
    </Stack>
  );
}

export default TasksPageSkeleton;
