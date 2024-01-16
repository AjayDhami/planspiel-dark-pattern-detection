import React from "react";

export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export interface UserCredentials extends Pick<User, "email" | "role"> {
  password: string;
}

export interface AuthContextProps {
  user: User;
  authTokens: string | null;
  setAuthTokens: (tokens: string | null) => void;
  setUser: (user: User) => void;
  signUpUser: (e: React.FormEvent) => Promise<void>;
  loginUser: (user: UserCredentials) => Promise<boolean>;
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

export interface DashboardKPI {
  totalWebsites: string;
  websitesCertified: string;
  websitesInProgress: string;
  websitesRejected: string;
}

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

export interface Reply {
  expertId: string;
  expertName: string;
  content: string;
  createdAt: string;
}
export interface Comment {
  id: string;
  websiteId: string;
  patternId: string;
  expertId: string;
  expertName: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}

export interface verification {
  expertId: string;
  expertVerificationPhase: string;
}
export interface PatternData {
  comments: Comment[];
  createdAt: string;
  createdByExpertId: string;
  description: string;
  detectedUrl: string;
  expertName: string;
  expertVerifications: verification[];
  id: string;
  isAutoGenerated: boolean;
  patternType: string;
  patternPhase: string;
  websiteId: string;
}
export interface PatternDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  expertId: string;
  token: string;
}

export interface ServiceResponse {
  status: number;
  patterns: PatternData[];
}

export interface AccountMenuProps {
  onProfile: () => void;
  onLogout: () => void;
}

export interface KpiCardProps {
  color: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}
