import React, { useEffect, useState, useContext, useCallback } from 'react'
import { getWebsites } from '../../services/expertServices'
import Navbar from '../../components/expert/Navbar';
import { useNavigate } from 'react-router-dom';
import { setRedirectCallback } from "../../utils/AxiosHelper";
import AuthContext from "../../context/AuthContext1";
import withExpertAuth from '../../hoc/withExpertAuth';
interface WebsiteData {
    baseUrl: string;
    description : string;
    websiteName: string;
    phase : string;
    websiteId : string;
    isCompleted : boolean;
    expertIds : [string];
}

const ExpertDashboard : React.FC = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        setRedirectCallback(() => {
          authContext?.logoutUser();
        });
    
        return () => {
          setRedirectCallback(null);
        };
    }, [authContext]);
    const [websiteData, setWebsiteData] = useState<WebsiteData[]>([])
    const navigate = useNavigate();

    const id  = localStorage.getItem("userId")
    const authToken = localStorage.getItem("authToken")
    const getWebsiteData = useCallback( async () => {
        setWebsiteData([]);
        if(id && authToken){
            let websites : any = []
            websites = await getWebsites(id);
            setWebsiteData(websites) 
        }
    },[id,authToken])

    useEffect(()=>{
        getWebsiteData();
    },[getWebsiteData])

    const handleClick = (id:string, websiteName: string) => {
        sessionStorage.setItem("websiteId", id);
        sessionStorage.setItem("websiteName", websiteName);
        navigate('/expert/website')
    }

  return (
    <>
        <Navbar/>
        <div className='grid md:grid-cols-4 mx-8 my-12 bg:white'>
            {websiteData.map((website, index)=>(
                <div key={website.websiteId} 
                    className='p-3 my-3 mx-4 shadow-md bg-white rounded-xl hover:border-2 border-blue-300 hover:bg-blue-100 cursor-pointer'
                    onClick={() => handleClick(website.websiteId, website.websiteName)}  
                >
                    <div><h2 className='font-bold text-lg'>{website.websiteName}</h2></div>
                </div>
            ))}
        </div>
    </>
  )
}

export default withExpertAuth(ExpertDashboard)