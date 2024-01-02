import axios, { AxiosResponse } from 'axios';

interface Pattern {
}

interface ServiceResponse {
  status : number;
  patterns: Pattern[];
}

const baseUrl : String = "http://localhost:8080"

const signIn = async (email: String, password : String, role: String) => {
  const config = {
    headers: {
      'Authorization': 'Bearer ACCESS_TOKEN',
      'ngrok-skip-browser-warning': 'any',
    },
  };
  const body = {
    email : email,
    password : password,
    role : role
  }

  try {
    const response = await axios.post(
      `${baseUrl}/user/signin`,
      body,
      config
    );
    return response.data.accessToken;
  } catch (error) {
    console.error('Error fetching patterns', error);
    throw error; 
  }
};

const getWebsites = async(id:String, authToken : String) => {
  const config = {
    headers: {
      'Authorization': `${authToken}`
    },
  };
  try {
    const response = await axios.get(
      `${baseUrl}/website?userId=${id}`,
      config
    );
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const getPatternsData = async (websiteId: string, token: string): Promise<ServiceResponse> => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  };

  try {
    const response: AxiosResponse<ServiceResponse> = await axios.get<ServiceResponse>(
      `${baseUrl}/website/${websiteId}/pattern`,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching patterns', error);
    throw error; 
  }
};

const getSpecificPattern = async (id: String, websiteId: String, token: string): Promise<Pattern> => {
  const config = {
    headers: {
      'Authorization': `${token}`,
    },
  };
  try {
    const response: AxiosResponse<Pattern> = await axios.get<Pattern>(
      `${baseUrl}/website/${websiteId}/pattern/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pattern details', error);
    throw error; 
  }
};

const CommentPost = async(patternId : String, websiteId : String, expertId : String, commentText : String) => {
  const config = {                 
    headers : {
        'Authorization':"Bearer ACCESS_TOKEN",
        'ngrok-skip-browser-warning': 'any'
    }
  }
  const body = {
    expertId : expertId,
    content : commentText
  }
  const response: AxiosResponse<Pattern> = await axios.post<Pattern>(
    `${baseUrl}/website/${websiteId}/pattern/${patternId}/comment`,
    body,
    config
  );
  return response.data;
}

const replyPost = async(commentId : String, websiteId : String, patternId : String, expertId : String, replyText : String) => {
  const config = {                 
    headers : {
        'Authorization':"Bearer ACCESS_TOKEN",
        'ngrok-skip-browser-warning': 'any'
    }
  }
  const body = {
    expertId : expertId,
    content : replyText
  }
  const response: AxiosResponse<Pattern> = await axios.post<Pattern>(
    `${baseUrl}/website/${websiteId}/pattern/${patternId}/comment/${commentId}/reply`,
    body,
    config
  );
  return response.data
  
}

export { getPatternsData, getSpecificPattern, CommentPost, replyPost, signIn, getWebsites  };