import { jwtDecode as decode } from "jwt-decode";

export const extractUserDetails = () => {
  const token = localStorage.getItem("token");
  const user = token ? decode(token as string) : null;

  return user;
};
