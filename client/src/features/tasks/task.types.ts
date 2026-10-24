export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Subtask = { _id: string; title: string; isCompleted: boolean };

export interface Task {
  _id: string;
  title: string;
  isCompleted: boolean;
  priority: TaskPriority;
  dueDate: string | null;
  note: string;
  user: string;
  project: string | null;
  subtasks: Subtask[];
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
  project: string | null;
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
