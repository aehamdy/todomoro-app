export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  _id: string;
  title: string;
  note: string;
  isCompleted: boolean;
  priority: TaskPriority;
  dueDate: string | null;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetTasksResponse {
  status: string;
  results: number;
  data: {
    tasks: Task[];
  };
}

export interface GetTaskResponse {
  status: "success";
  data: { task: Task };
}

export type PriorityColorConfig = {
  text: string;
  bg: string;
};

export interface createTaskRequest {
  title: string;
  priority: string;
  dueDate: string | null;
}

export interface createTaskResponse {
  status: "success";
  data: {
    task: Task;
  };
}

export interface UpdateTaskRequest {
  title?: string;
  note?: string;
  isCompleted?: boolean;
  priority?: TaskPriority;
  dueDate?: string | null;
}

export interface UpdateTaskResponse {
  status: "success";
  data: {
    task: Task;
  };
}
