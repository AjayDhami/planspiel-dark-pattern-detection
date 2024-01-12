import { createContext, useState, ReactNode, useContext } from "react"
import { PatternData, WebsiteData } from "../types"

interface ExpertProviderProps {
    children: ReactNode,
  }


interface ExpertContextProps {
    patternData : PatternData,
    setPatternData : (patternObject : PatternData)=> void,
    websiteData : WebsiteData,
    setWebsiteData : (websiteObject : WebsiteData)=> void,
    websiteId :  | null,
    setWebsiteId : (websiteId :  | null)=> void,
    websiteName :  | null,
    setWebsiteName : (websiteName :  | null)=> void,
}

const ExpertContext = createContext<ExpertContextProps | undefined>(undefined)

export const ExpertProvider: React.FC<ExpertProviderProps> = ({ children }) => {
    const [websiteId, setWebsiteId] = useState< | null>(null);
    const [websiteName, setWebsiteName] = useState< | null>(null);
    const [patternData, setPatternData] = useState<PatternData>({
        comments : [],
        createdAt : "",
        createdByExpertId : "",
        description : "",
        detectedUrl : "",
        expertName: "",
        expertVerifications : [],
        id : "",
        isAutoGenerated : true,
        patternType: "",
        patternPhase: "",
        websiteId : "",
        phaseColor : "",
        phaseText : "",
        hoverText : "",
        isPatternExists : false
    });
    const [websiteData, setWebsiteData] = useState<WebsiteData>({
        baseUrl: "",
        description : "",
        websiteName: "",
        phase : "",
        websiteId : "",
        isCompleted : false,
        expertIds : [],
        userId : "",
        additionalUrls : [],
        primaryExpertId : ""
    })
    const contextData: ExpertContextProps = {
        websiteId,
        setWebsiteId,
        websiteName,
        setWebsiteName,
        patternData,
        setPatternData,
        websiteData,
        setWebsiteData
    }

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
}