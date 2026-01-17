// Starter API client
export const api = {
  getTasks: async () => {
    return await fetch("/api/tasks").then(res => res.json());
  },
  createTask: async (data: any) => {
    return await fetch("/api/tasks", { method: "POST", body: JSON.stringify(data) });
  }
}
