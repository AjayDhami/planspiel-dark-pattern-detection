import { AxiosResponse } from 'axios';
import api from "../utils/AxiosHelper";
import { PatternData, ServiceResponse} from "../types"



const baseUrl = process.env.REACT_APP_API_BASE_URL_CLIENT

const getWebsites = async(id:String, authToken : String) => {
  try {
    const response = await api.get(`${baseUrl}/website?userId=${id}`);
    return response.data
  } catch (error) {
  }
}

const getPatternsData = async (websiteId: string, token: string): Promise<ServiceResponse> => {
  try {
    const response: AxiosResponse<ServiceResponse> = await api.get<ServiceResponse>(
      `${baseUrl}/website/${websiteId}/pattern`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching patterns', error);
    throw error; 
  }
};

const getSpecificPattern = async (id: String, websiteId: String, token: string): Promise<PatternData> => {
  try {
    const response: AxiosResponse<PatternData> = await api.get<PatternData>(
      `${baseUrl}/website/${websiteId}/pattern/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pattern details', error);
    throw error; 
  }
};

const CommentPost = async(patternId : String, websiteId : String, expertId : String, commentText : String, token : string) => {
  const body = {
    expertId : expertId,
    content : commentText
  }
  const response: AxiosResponse<PatternData> = await api.post<PatternData>(
    `${baseUrl}/website/${websiteId}/pattern/${patternId}/comment`,
    body,
  );
  return response.status;
}

const replyPost = async(commentId : String, websiteId : String, patternId : String, expertId : String, replyText : String, token : string) => {
  const body = {
    expertId : expertId,
    content : replyText
  }
  const response: AxiosResponse<PatternData> = await api.post<PatternData>(
    `${baseUrl}/website/${websiteId}/pattern/${patternId}/comment/${commentId}/reply`,
    body,
  );
  return response.status
  
}

const patternPost = async(websiteId : string, expertId : string, patternType : string, description : string, detectedUrl : string, token : string) =>{
  const body = {
    createdByExpertId : expertId,
    patternType : patternType,
    description : description,
    detectedUrl : detectedUrl
  }
  const response: AxiosResponse<PatternData> = await api.post<PatternData>(
    `${baseUrl}/website/${websiteId}/pattern`,
    body,
  );
  return response.status
}

const postVerification = async(websiteId : string, patternId : string, expertId : string, patternExists : boolean) =>{
  const body = {
    websiteId : websiteId,
    patternId : patternId,
    expertId : expertId,
    patternExists : patternExists
  }
  const response: AxiosResponse<PatternData> = await api.put<PatternData>(
    `${baseUrl}/website/updatePatternPhase`,
    body,
  );
  return response.status
}

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export { getPatternsData, getSpecificPattern, CommentPost, replyPost, getWebsites, patternPost, stringAvatar, postVerification  };