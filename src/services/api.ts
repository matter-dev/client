import axios from "axios";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

privateApi.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("matterToken");
  config.headers["authorization"] = `Bearer ${token}`;

  return config;
});
