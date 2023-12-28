import axios from "axios";

const BASE_URL = "https://localhost:8080";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the user websites
export const getAllWebsites = async () => {
  try {
    // const response = await API.get("/items");
    // return response.data;
  } catch (error) {
    // console.error("Error fetching items:", error);
    // throw error;
  }
};
