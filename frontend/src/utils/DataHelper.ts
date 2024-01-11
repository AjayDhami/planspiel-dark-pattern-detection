import { jwtDecode as decode } from "jwt-decode";

export const extractUserDetails = () => {
  const token = localStorage.getItem("authToken");

  return token ? decode(token as string) : null;
};

export const sanitizeStringArray = (arr: string[]) => {
  return arr.filter(function (value) {
    return value.trim() !== "";
  });
};
