import axios from "axios";
import { toastError } from "../utils/toastify";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  withCredentials: true,
});

AxiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    toastError(error);

    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await AxiosInstance.post("/api/auth/refresh-token");
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
