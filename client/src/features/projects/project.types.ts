export type TProject = {
  _id: string;
  title: string;
  description?: string;
  color?: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type GetProjectsResponse = {
  status: "success";
  data: {
    projects: TProject[];
  };
};

export type CreateProjectRequest = {
  title: string;
  description?: string;
  color?: string;
};

export type CreateProjectResponse = {
  status: "success";
  data: {
    project: TProject[] | [];
  };
};

export type UpdateProjectData = {
  title?: string;
  description?: string;
  color?: string;
};

export type UpdateProjectResponse = {
  status: "success";
  data: {
    project: TProject;
  };
};
