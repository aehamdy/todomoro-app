import api from "../../lib/api";
import type {
  createTaskRequest,
  createTaskResponse,
  GetTaskResponse,
  GetTasksResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "./task.types";

export async function getTasks(): Promise<GetTasksResponse> {
  const response = await api.get<GetTasksResponse>("/tasks");

  return response.data;
}

export async function getTaskById(taskId: string): Promise<GetTaskResponse> {
  const response = await api.get<GetTaskResponse>(`/tasks/${taskId}`);

  return response.data;
}

export async function createTask(
  taskData: createTaskRequest,
): Promise<createTaskResponse> {
  const response = await api.post<createTaskResponse>("/tasks", taskData);

  return response.data;
}

export async function updateTask(
  taskId: string,
  taskData: UpdateTaskRequest,
): Promise<UpdateTaskResponse> {
  const response = await api.patch(`/tasks/${taskId}`, taskData);

  return response.data;
}
