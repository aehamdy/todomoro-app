export type GetProjectsResponse = {
  status: "success";
  data: {
    projects: TProject[];
  };
};

export type TProject = {
  _id: string;
  title: string;
  description?: string;
  color?: string;
};
