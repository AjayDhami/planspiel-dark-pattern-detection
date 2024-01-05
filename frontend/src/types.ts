import React from "react";

export type User = {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
};

export interface UserCredentials extends Pick<User, "email" | "role"> {
  password: string;
}

export interface AuthContextProps {
  user: User | null;
  authTokens: string | null;
  setAuthTokens: (tokens: string | null) => void;
  setUser: (user: User | null) => void;
  signUpUser: (e: React.FormEvent) => Promise<void>;
  loginUser: (e: React.FormEvent) => Promise<void>;
  logoutUser: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export type Website = {
  websiteId: string;
  baseUrl: string;
  websiteName: string;
  additionalUrls?: string[];
  description?: string;
  isCompleted: boolean;
  phase: string; // phase states: "Initial" | "Automation" | "Manual" | "Feedback" | "Finished"
};

export interface WebsiteResponse extends Website {
  userId: string;
}

export interface WebsiteCardProps extends Website {}

export interface WebsiteDetails
  extends Pick<
    Website,
    "websiteName" | "baseUrl" | "description" | "additionalUrls"
  > {}

export interface WebsiteOnboardingFormProps {
  open: boolean;
  onClose: () => void;
  fullScreen?: boolean;
  onSuccess: () => void;
}
