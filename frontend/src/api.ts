import { WebsiteDetails } from "./types";
import api from "./utils/AxiosHelper";
import { extractUserDetails } from "./utils/DataHelper";

// Function to get the user websites
export const getAllWebsites = async () => {
  try {
    const user = extractUserDetails();

    const response = await api.get(`/website?userId=${user?.sub}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Function to add a website for certification
export const addWebsiteForCertification = async (website: WebsiteDetails) => {
  try {
    const user = extractUserDetails();
    const data = { ...website, userId: user?.sub };

    const response = await api.post(`/website`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
