import api from "../../lib/api";
import type { GetTasksResponse } from "./task.types";

export async function getTasks(): Promise<GetTasksResponse> {
  const response = await api.get<GetTasksResponse>("/tasks");

  return response.data;
}
