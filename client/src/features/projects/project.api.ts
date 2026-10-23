import api from "../../lib/api";
import type { GetProjectsResponse } from "./project.types";

export async function fetchProjects(): Promise<GetProjectsResponse> {
  const response = await api.get<GetProjectsResponse>("/projects");

  return response.data;
}
