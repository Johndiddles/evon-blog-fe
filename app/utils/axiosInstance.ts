import axios from "axios";
import { API_BASE_URL } from "./constants";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use((config) => {
  if (
    config.status > 199 &&
    config.status < 300 &&
    config.config.method !== "get"
  ) {
    toast.success(config?.data?.message ?? "Success");
  }

  return config;
});
