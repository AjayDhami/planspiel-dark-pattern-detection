import { createContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthProviderProps {
  children: ReactNode;
}

interface Credentials {
  email: string;
  password: string;
  role: string;
}
interface SignupData {
  firstName : string,
  lastName : string,
  email: string;
  password: string;
  role: string;
}
interface UserData {
  // Define the structure of the user data as per your needs
}

interface AuthContextProps {
  user: UserData | null;
  authTokens: string | null;
  setAuthTokens: (tokens: string | null) => void;
  setUser: (user: UserData | null) => void;
  signUpUser: (e: React.FormEvent) => Promise<void>;
  loginUser: (e: React.FormEvent) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<string | null>(() =>
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  );
  const [user, setUser] = useState<UserData | null>(() =>
    localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token') as string) : null
  );
  const [loading, setLoading] = useState(true);
  const credentials: Credentials = {
    email: 'alien@yaml.com',
    password: 'xcxcxc',
    role: 'Client',
  };

  const signupData: SignupData = {
    firstName: 'Amay',
    lastName: 'Rajvaidya',
    email: 'amay@yaml.com',
    password: 'xcxcxc',
    role: 'Client',
  };

  const history = useNavigate();

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ accessToken: string }>(
        `${process.env.REACT_APP_API_BASE_URL_CLIENT}/user/signin`,
        credentials
      );

      if (response.status === 201) {
        console.log(response);
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        setAuthTokens(token);
        setUser(jwtDecode(token));
        console.log(user);
        
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error as needed
    }
  };

  const signUpUser = async(e: React.FormEvent) =>{
    e.preventDefault();
    try {
      const response = await axios.post<{ accessToken: string }>(
        `${process.env.REACT_APP_API_BASE_URL_CLIENT}/user/signup`,
        signupData
      );

      if (response.status === 201) {
        console.log(response);
        
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error as needed
    }
  }

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('token');
    history('/login');
  };

  const contextData: AuthContextProps = {
    user,
    authTokens,
    setAuthTokens,
    setUser,
    loginUser,
    signUpUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};

export default AuthContext;