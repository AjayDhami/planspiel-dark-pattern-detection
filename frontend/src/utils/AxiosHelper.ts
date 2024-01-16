import axios, { AxiosError } from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL_CLIENT;
let redirectCallback: (() => void) | null = null;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTlkNjQxNjFmYWViMGUyNjg0MzQ1NmQiLCJlbWFpbCI6ImFqYXlAZ21haWwuY29tIiwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE3MDU0MjM0OTIsImV4cCI6MTcwNTQyNzA5Mn0.4T4efqwJYxsoJbuwLU0irWTe8haN-Zx0hk7DTbmKaOA`,
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
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
