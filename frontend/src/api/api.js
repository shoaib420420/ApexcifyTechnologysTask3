import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Attach token to all requests if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
// Auth APIs
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

// Dashboard APIs
export const getDashboardStats = () => API.get("/dashboard/stats");

export default API;
