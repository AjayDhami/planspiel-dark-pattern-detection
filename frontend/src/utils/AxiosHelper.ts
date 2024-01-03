import axios, { AxiosError } from "axios";

const BASE_URL = process.env.API_BASE_URL_CLIENT || "http://localhost:8080";
let redirectCallback: (() => void) | null = null;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      redirectCallback && redirectCallback();
      throw new Error(error.message);
    }
    return Promise.reject(error);
  }
);

export const setRedirectCallback = (callback: (() => void) | null) => {
  redirectCallback = callback;
};

export default api;
