import api from '../utils/AxiosHelper';

export type ClientsDetails = {
   userId: string;
   firstName: string;
   lastName: string;
   email: string;
   role: string;
   websites: Websites[];
  };

export type Websites = {
    websiteId: string;
    baseUrl: string;
    websiteName: string;
    description?: string;
  };

export const getClientsDetails = async() => {
    try {
      const response = await api.get(`/website/Client/details`);
      console.log(response.data)
      return response.data
    } catch (error) {
        console.error('Error is --', error);
        throw error; 
      }
  }

  