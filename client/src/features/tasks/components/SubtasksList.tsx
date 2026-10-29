import { List, Stack } from "@mui/material";

import type { Subtask } from "../task.types";
import CreateSubtaskForm from "./CreateSubtaskForm";
import SubtaskItem from "./SubtaskItem";
import CompletionProgress from "../../../components/common/CompletionProgress";

type SubtasksListProps = {
  taskId: string;
  subtasks: Subtask[];
};

function SubtasksList({ taskId, subtasks }: SubtasksListProps) {
  const completedSubtasks = subtasks.filter((item) => item.isCompleted);
  const incompleteSubtasks = subtasks.filter((item) => !item.isCompleted);

  return (
    <Stack sx={{ flexDirection: "column", gap: 2 }}>
      <CompletionProgress
        completed={completedSubtasks.length}
        incomplete={incompleteSubtasks.length}
      />

      <CreateSubtaskForm taskId={taskId} />

      <List disablePadding>
        {subtasks.map((subtask) => (
          <SubtaskItem key={subtask._id} taskId={taskId} subtask={subtask} />
        ))}
      </List>
    </Stack>
  );
}

export default SubtasksList;
