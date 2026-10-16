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
