import type { TaskPriority, PriorityColorConfig } from "./task.types";

export const priorityColors: Record<TaskPriority, PriorityColorConfig> = {
  low: { text: "#095b45", bg: "#b3e0c1" },
  medium: { text: "#5a7b8b", bg: "#d0e3f2" },
  high: { text: "#f36e42", bg: "#FFE0B2" },
  urgent: { text: "#a10207", bg: "#F8BBD0" },
  // low: { text: "#166534", bg: "#DCFCE7" },
  // medium: { text: "#1D4ED8", bg: "#DBEAFE" },
  // high: { text: "#9A3412", bg: "#FFEDD5" },
  // urgent: { text: "#9F1239", bg: "#FFE4E6" },
};
