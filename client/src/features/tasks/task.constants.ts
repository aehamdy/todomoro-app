import type { TaskPriority, PriorityColorConfig } from "./task.types";

export const priorityColors: Record<TaskPriority, PriorityColorConfig> = {
  low: { text: "#095b45", bg: "#b3e0c1" },
  medium: { text: "#5a7b8b", bg: "#d0e3f2" },
  high: { text: "#f36e42", bg: "#FFE0B2" },
  urgent: { text: "#a10207", bg: "#F8BBD0" },
};
