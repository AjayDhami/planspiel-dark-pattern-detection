import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AuthContextProps,
  AuthProviderProps,
  User,
  UserCredentials,
} from "../types";
import { loginUser as loginUserAPI } from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<string | null>(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [user, setUser] = useState<User | null>(() =>
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token") as string)
      : null
  );
  const [loading, setLoading] = useState(true);
  const credentials: UserCredentials = {
    email: "alien@yaml.com",
    password: "xcxcxc",
    role: "Client",
  };
  const navigate = useNavigate();

  const loginUser = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const { email, password } = e.target as unknown as {
      email: HTMLFormElement;
      password: HTMLFormElement;
    };
    const user = {
      email: email.value,
      password: password.value,
      role: "Client",
    };

    try {
      const response = await loginUserAPI(user);
      if (response.status === 201) {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);

        setAuthTokens(token);
        setUser(jwtDecode(token));

        toast.success("User Logged in successfully");
        navigate("/client/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(
          `User not authenticated. Please check email and password and try again`
        );
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const signUpUser = async (e: React.FormEvent) => {
    const { firstName, lastName, email, password } = e.target as unknown as {
      firstName: HTMLFormElement;
      lastName: HTMLFormElement;
      email: HTMLFormElement;
      password: HTMLFormElement;
    };
    e.preventDefault();
    try {
      const response = await axios.post<{ accessToken: string }>(
        `${process.env.REACT_APP_API_BASE_URL_CLIENT}/user/signup`,
        {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
          role: credentials.role,
        }
      );

      if (response.status === 201) {
        navigate("/signin");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/signin");
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

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
