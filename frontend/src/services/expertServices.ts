import { AxiosResponse } from 'axios';
import api from "../utils/AxiosHelper";
import { PatternData, WebsiteData, publishObj} from "../types"


const getUserDetails = async(id:String) => {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data
  } catch (error) {
  }
}

const getWebsites = async(id:String) => {
  try {
    const response = await api.get(`/website?userId=${id}`);
    response.data.forEach((website : WebsiteData)=>{
      if(website.phase === "InProgress"){
        website.phaseColor = "bg-[#F9C32F]"
        website.phaseText = "In Progress"
        website.hoverText = "In Progress"
      }
      else if(website.phase==="Published" && website.isDarkPatternFree === false){
        website.phaseColor = "bg-[#E6321D]"
        website.phaseText = "Published"
        website.hoverText = "Published without certification"
      }
      else if(website.phase==="Published" && website.isDarkPatternFree === true){
        website.phaseColor = "bg-[#E6321D]"
        website.phaseText = "Published"
        website.hoverText = "Published with certification"
      }
    })
    return response.data
  } catch (error) {
  }
}

const getSpecificWebsite = async(id:string) => {
  try {
    const response: AxiosResponse<WebsiteData> = await api.get<WebsiteData>(`/website/${id}`);
    if(response.data.phase==="Published" && response.data.isDarkPatternFree===true){
      response.data.phaseText = "Published with certification"
    }else if(response.data.phase==="Published" && response.data.isDarkPatternFree===false){
      response.data.phaseText = "Published without certification"
    }
    return response.data
  } catch (error) {
  }
}

const getPatternsData = async (websiteId: string) => {
  try {
    const response = await api.get(
      `/website/${websiteId}/pattern`,
    );
    response.data.forEach((pattern : PatternData) => {
      if(pattern.patternPhase === "InProgress"){
        pattern.phaseColor = "#F9C32F"
        pattern.phaseText = "In Progress"
        pattern.hoverText = "Awaiting Verification from experts"
      }
      else if(pattern.patternPhase === "Verified" && pattern.isPatternExists === true){
        pattern.phaseColor = "#E6321D"
        pattern.phaseText = "Verified"
        pattern.hoverText = "Verified but dark pattern exists"
      }
      else if(pattern.patternPhase === "Verified" && pattern.isPatternExists === false){
        pattern.phaseColor = "#538D3F"
        pattern.phaseText = "Verified"
        pattern.hoverText = "Verified and dark pattern free"
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patterns', error);
    throw error; 
  }
};

const getSpecificPattern = async (id: String, websiteId: String): Promise<PatternData> => {
  try {
    const response: AxiosResponse<PatternData> = await api.get<PatternData>(
      `/website/${websiteId}/pattern/${id}`,
    );
    if(response.data.patternPhase === "InProgress"){
      response.data.phaseColor = "#F9C32F"
      response.data.phaseText = "In Progress"
      response.data.hoverText = "Awaiting Verification from experts"
    }
    else if(response.data.patternPhase === "Verified" && response.data.isPatternExists === true){
      response.data.phaseColor = "#E6321D"
      response.data.phaseText = "Verified"
      response.data.hoverText = "Verified but dark pattern exists"
    }
    else if(response.data.patternPhase === "Verified" && response.data.isPatternExists === false){
      response.data.phaseColor = "#538D3F"
      response.data.phaseText = "Verified"
      response.data.hoverText = "Verified and dark pattern free"
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching pattern details', error);
    throw error; 
  }
};

const CommentPost = async(patternId : String, websiteId : String, expertId : String, commentText : String) => {
  const body = {
    expertId : expertId,
    content : commentText
  }
  const response: AxiosResponse<PatternData> = await api.post<PatternData>(
    `/website/${websiteId}/pattern/${patternId}/comment`,
    body,
  );
  return response.status;
}

const replyPost = async(commentId : String, websiteId : String, patternId : String, expertId : String, replyText : String) => {
  const body = {
    expertId : expertId,
    content : replyText
  }
  const response: AxiosResponse<PatternData> = await api.post<PatternData>(
    `/website/${websiteId}/pattern/${patternId}/comment/${commentId}/reply`,
    body,
  );
  return response.status
  
}

const patternPost = async(websiteId : string, expertId : string, patternType : string, description : string, detectedUrl : string) =>{
  const body = {
    createdByExpertId : expertId,
    patternType : patternType,
    description : description,
    detectedUrl : detectedUrl
  }
  const response: AxiosResponse<PatternData> = await api.post<PatternData>(
    `/website/${websiteId}/pattern`,
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
    `/website/updatePatternPhase`,
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

const publishWebsite = async(websiteId:string, publishObj:publishObj) =>{
  try {
    const response = await api.put(`/website/${websiteId}/publish`, publishObj)
    return response.status;
  } catch (error) {
    
  }
}

export { getPatternsData, getSpecificPattern, CommentPost, replyPost, getWebsites, patternPost, stringAvatar, postVerification, getUserDetails, getSpecificWebsite, publishWebsite};