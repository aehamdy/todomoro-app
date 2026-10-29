export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "reset-password",
  overview: "/overview",
  tasks: "/tasks",
  project: "/projects/:projectId",
  projectById: (projectId: string) => `/projects/${projectId}`,
} as const;
