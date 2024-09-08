import axios from "axios";
import { env } from "../utils/env.utils";
import { useAuthStore } from "../store/auth.store";

const instance = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const { isAuthenticated, token } = useAuthStore.getState();

  if (isAuthenticated && token) {
    config.headers.Authorization ||= `Bearer ${token}`;
  }

  return config;
});

export { instance as axios };
