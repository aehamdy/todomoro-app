import { useParams } from "react-router-dom";
import CreateTaskForm from "../features/tasks/components/CreateTaskForm";
import TaskList from "../features/tasks/components/TaskList";

function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return null;
  }

  return (
    <>
      <CreateTaskForm projectId={projectId} />

      <TaskList projectId={projectId} />
    </>
  );
}

export default ProjectPage;
