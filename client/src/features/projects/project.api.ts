import api from "../../lib/api";
import type {
  CreateProjectRequest,
  CreateProjectResponse,
  GetProjectsResponse,
  UpdateProjectData,
  UpdateProjectResponse,
} from "./project.types";

export async function fetchProjects(): Promise<GetProjectsResponse> {
  const response = await api.get<GetProjectsResponse>("/projects");

  return response.data;
}

export async function createProject(
  projectData: CreateProjectRequest,
): Promise<CreateProjectResponse> {
  const response = await api.post<CreateProjectResponse>(
    "/projects",
    projectData,
  );

  return response.data;
}

export async function updateProject({
  projectId,
  projectData,
}: {
  projectId: string;
  projectData: UpdateProjectData;
}): Promise<UpdateProjectResponse> {
  const response = await api.patch<UpdateProjectResponse>(
    `/projects/${projectId}`,
    projectData,
  );

  return response.data;
}
