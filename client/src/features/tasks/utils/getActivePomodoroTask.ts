import type { ActivePomodoroTask, Task } from "../task.types";

export function getActivePomodoroTask(task: Task): ActivePomodoroTask {
  const project =
    task.project && typeof task.project !== "string" ? task.project : null;

  return {
    taskId: task._id,
    title: task.title,
    projectId:
      project?._id ?? (typeof task.project === "string" ? task.project : null),
    projectTitle: project?.title ?? null,
  };
}
