import api from "./axios";

export async function getDashboardSummary() {
  const { data } = await api.get("/dashboard");
  return data;
}

export default getDashboardSummary;