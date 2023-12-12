import axios,{AxiosError} from "axios";
import { useNavigate } from "react-router-dom";


// const baseURL = process.env.API_BASE_URL_CLIENT
const API_BASE_URL_CLIENT = 'http://localhost:8080/user'
let authToken : {token?: string} | null; 
let storedToken = localStorage.getItem('token');
if(storedToken !== null){
    authToken = JSON.parse(storedToken)
}else{
    authToken = null
}

const axiosInstance = axios.create({
    baseURL : API_BASE_URL_CLIENT,
    headers : {Authorization : `Bearer ${authToken?.token}`}
})

const navigate = useNavigate();

axiosInstance.interceptors.request.use(async (req) => {
    if (!authToken) {
        storedToken = localStorage.getItem('token');
        if (storedToken) {
            authToken = JSON.parse(storedToken);
            req.headers.Authorization = `Bearer ${authToken?.token}`;
        }
    }
    return req
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            navigate("/login");
        }
        return Promise.reject(error);
    }
);

