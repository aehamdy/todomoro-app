import api from "../../../lib/api";

export async function addSubtask(
  taskId: string,
  subtaskData: { title: string },
) {
  const response = await api.post(`/tasks/${taskId}/subtasks`, subtaskData);

  return response.data;
}

export async function updateSubtask(
  taskId: string,
  subtaskId: string,
  subtaskData: {
    title?: string;
    isCompleted?: boolean;
  },
) {
  const response = await api.patch(
    `/tasks/${taskId}/subtasks/${subtaskId}`,
    subtaskData,
  );

  return response.data;
}

export async function removeSubtask(
  taskId: string,
  subtaskId: string,
): Promise<void> {
  await api.delete(`/tasks/${taskId}/subtasks/${subtaskId}`);
}
