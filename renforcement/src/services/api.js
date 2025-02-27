import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true
});

export const getTasks = async () => {
  const response = await instance.get("/tasks");
  return response.data;
};

export const addTask = async (task) => {
  const response = await instance.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id, updates) => {
  const response = await instance.put(`/tasks/${id}`, updates);
  return response.data;
};

export const completeTask = async (id) => {
  const response = await instance.patch(`/tasks/${id}/complete`);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await instance.delete(`/tasks/${id}`);
  return response.data;
};