import axios, { AxiosError } from "axios";

const BASE_URL = process.env.API_BASE_URL_CLIENT || "http://localhost:8080";
let redirectCallback: (() => void) | null = null;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTlkNjQxNjFmYWViMGUyNjg0MzQ1NmQiLCJlbWFpbCI6ImFqYXlAZ21haWwuY29tIiwicm9sZSI6IlN1cGVyQWRtaW4iLCJpYXQiOjE3MDU0MTU2MzcsImV4cCI6MTcwNTQxOTIzN30.9MQUwym2zqgdWEeRCRFHmtx845go-YeO6_sCI74-aYQ`,
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
