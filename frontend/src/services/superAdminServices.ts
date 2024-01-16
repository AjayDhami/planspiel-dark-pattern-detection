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
      return response.data
    } catch (error) {
        console.error('Error is --', error);
        throw error; 
      }
  }

export const getExpertsDetails = async() => {
  try {
    const response = await api.get('/website/Expert/details');
    return response.data
  } catch (error) {
    console.error('Error is --', error);
    throw error;
  }
}

export const assignExperts = async(id: string, expertIds: string[], primaryExpertId: string) => {
  const body = {
    expertIds: expertIds,
    primaryExpertId: primaryExpertId
  };
  try {
    const response = await api.put(`website/${id}/assignExperts`, body);
    return response.status;
  } catch (error) {
    console.error('Error is --', error);
    throw error;
  }
}
  