import api from "../../lib/api";

export const fetchOverviewSummary = async () => {
  const response = await api.get("/overview/summary");

  return response.data;
};
