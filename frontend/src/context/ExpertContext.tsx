import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ExpertProviderProps {
    children: ReactNode;
  }

// interface website {
//     websiteId : string
// }

interface ExpertContextProps {
    websiteId : string | null;
    setWebsiteId : (websiteId : string | null)=> void;
}

const ExpertContext = createContext<ExpertContextProps | undefined>(undefined);

export const ExpertProvider: React.FC<ExpertProviderProps> = ({ children }) => {
    const [websiteId, setWebsiteId] = useState<string | null>(null);

    const contextData: ExpertContextProps = {
        websiteId,
        setWebsiteId
    };

    return(
        <ExpertContext.Provider value={contextData}>{children}</ExpertContext.Provider>
    )
}
export const useExpertContext = () => {
    const context = useContext(ExpertContext);
    if (!context) {
      throw new Error("useExpertContext must be used within an ExpertProvider");
    }
    return context;
};