import api from "../../lib/api";
import type {
  createTaskRequest,
  createTaskResponse,
  GetTasksResponse,
} from "./task.types";

export async function getTasks(): Promise<GetTasksResponse> {
  const response = await api.get<GetTasksResponse>("/tasks");

  return response.data;
}

export async function createTask(
  taskData: createTaskRequest,
): Promise<createTaskResponse> {
  const response = await api.post<createTaskResponse>("/tasks", taskData);

  return response.data;
}
