import { Alert, Box, Divider, Stack } from "@mui/material";
import { useTaskDetails } from "../hooks/useTaskDetails";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useState } from "react";
import { useUpdateTask } from "../hooks/useUpdateTask";
import TaskTitle from "./TaskTitle";
import TaskDueDate from "./TaskDueDate";
import TaskNote from "./TaskNote";
import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskDetailsFooter from "./TaskDetailsFooter";
import TaskDate from "./TaskDate";
import TaskPrioritySelector from "./TaskPrioritySelector";
import type { TaskPriority } from "../task.types";
import SubtasksList from "./SubtasksList";
import TaskProject from "./TaskProject";
import { playTaskCompletionSound } from "../utils/playTaskCompletionSound";
import { useAuth } from "../../auth/useAuth";

type TaskDetailsSidebarProps = {
  taskId: string;
  onClose: () => void;
};

function TaskDetailsSidebar({ taskId, onClose }: TaskDetailsSidebarProps) {
  const { user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { task, isLoading, isError } = useTaskDetails(taskId);
  const { updateTask, isUpdating, isError: isUpdateError } = useUpdateTask();
  const { deleteTask, isDeleting, isError: isDeleteError } = useDeleteTask();

  if (isLoading) {
    return <div>Loading task details...</div>;
  }

  if (isError || !task) {
    return <div>Failed to load task details.</div>;
  }

  const handleToggleComplete = async (isCompleted: boolean) => {
    const isCompleting = isCompleted;

    try {
      await updateTask({
        taskId,
        taskData: { isCompleted },
      });

      if (isCompleting) {
        await playTaskCompletionSound(
          user?.preferences.taskCompletionSoundEnabled ?? true,
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveTitle = (newTitle: string) => {
    updateTask({
      taskId,
      taskData: { title: newTitle },
    });
  };

  const handleSaveDueDate = (newDueDate: string | null) => {
    updateTask({
      taskId,
      taskData: { dueDate: newDueDate },
    });
  };

  const handleSavePriority = (newPriority: TaskPriority) => {
    updateTask({
      taskId,
      taskData: { priority: newPriority },
    });
  };

  const handleSaveNote = (newNote: string) => {
    updateTask({
      taskId,
      taskData: { note: newNote },
    });
  };

  const handleDelete = () => {
    deleteTask(taskId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        onClose();
      },
    });
  };

  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: 0,
        height: "calc(100% - 40px)",
        my: "20px",
        mx: 1,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 5,
        overflowY: "auto",
      }}
    >
      <Stack>
        <TaskDetailsHeader onClose={onClose} />

        <Stack spacing={1} sx={{ color: "text.secondary" }}>
          {isUpdateError && (
            <Alert severity="error">
              Failed to update the task. Please try again.
            </Alert>
          )}

          <TaskTitle
            title={task.title}
            isCompleted={task.isCompleted}
            onSave={handleSaveTitle}
            onToggleComplete={handleToggleComplete}
            isSaving={isUpdating}
          />

          <TaskDate taskDate={task.createdAt} />

          <TaskDueDate
            dueDate={task.dueDate}
            onSave={handleSaveDueDate}
            isSaving={isUpdating}
          />

          <TaskProject
            taskId={taskId}
            projectId={
              task.project && typeof task.project !== "string"
                ? task.project._id
                : task.project
            }
          />

          <TaskPrioritySelector
            priority={task.priority}
            onSave={handleSavePriority}
            isSaving={isUpdating}
          />

          <TaskNote
            note={task.note}
            onSave={handleSaveNote}
            isSaving={isUpdating}
          />
        </Stack>

        <Divider sx={{ my: 1 }} />

        <SubtasksList taskId={taskId} subtasks={task.subtasks} />
      </Stack>

      <TaskDetailsFooter
        taskTitle={task.title}
        creationDate={task.createdAt}
        isDeleteError={isDeleteError}
        isDeleting={isDeleting}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        handleDelete={handleDelete}
      />
    </Box>
  );
}

export default TaskDetailsSidebar;
