import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Error occurred: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
