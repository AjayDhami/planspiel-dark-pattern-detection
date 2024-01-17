import { UserCredentials, UserRegistrationCredentials, WebsiteDetails } from "./types";
import api from "./utils/AxiosHelper";
import { extractUserDetails } from "./utils/DataHelper";

// Function to Register User
export const registerUser = async (user: UserRegistrationCredentials) => {
  try {
    const response = await api.post("/user/signup", user);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to Log in User
export const loginUser = async (user: UserCredentials) => {
  try {
    const response = await api.post(`/user/signin`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to get the KPI data for client's dashboard
export const getClientDashboardKPIData = async () => {
  try {
    const user = extractUserDetails();

    const response = await api.get(`/website/clientKpi/${user?.sub}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get the user websites
export const getAllWebsites = async () => {
  try {
    const user = extractUserDetails();

    const response = await api.get(`/website?userId=${user?.sub}`);
    return response.data;
  } catch (error) {
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
    throw error;
  }
};
