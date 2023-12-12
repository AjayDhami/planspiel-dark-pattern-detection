import axios, {AxiosResponse, AxiosError} from "axios";

interface Credentials {
    email: string;
    password: string;
    role: string;
}

interface LoginResponse {
    accessToken: string
}
// const clientUrl = process.env.API_BASE_URL_CLIENT;
const API_BASE_URL_CLIENT = 'http://localhost:8080/user'
const url = process.env.REACT_APP_API_BASE_URL_CLIENT
console.log(url);


const authService = {
    login: async (credentials : Credentials): Promise<boolean> => {
        try {
            const response: AxiosResponse<LoginResponse> = await axios.post<LoginResponse>(`${url}/signin`, credentials);
            console.log(response);
            const {accessToken} = response.data;
            localStorage.setItem('token',accessToken);
            return true;
        } catch (error) {
            console.log(error);
            return false;    
        }
    },
    logout: (): void => {
        localStorage.removeItem('token');
    },
    
    getToken: (): string | null => {
        return localStorage.getItem('token');
    },
    
    isAuthenticated: (): boolean => {
       const token = localStorage.getItem('token');
        return !!token;
    },
}

export default authService;