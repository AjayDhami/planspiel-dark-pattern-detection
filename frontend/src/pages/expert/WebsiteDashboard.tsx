import React, { useEffect, useState } from 'react'
import { useExpertContext } from '../../context/ExpertContext'
import { getPatternsData } from '../../services/expertServices';
import Navbar from '../../components/expert/Navbar';


const WebsiteDashboard = () => {
    const { websiteId, setWebsiteId } = useExpertContext();
    const [patterns, setPatterns] = useState<any[]>([]);
    const token = localStorage.getItem("authToken");

    const getPatterns = async () => {
        setPatterns([]);
        let data : any = [];
        if(websiteId && token){
            data = await getPatternsData(websiteId, token);
            setPatterns(data);
            console.log(patterns);
        }
    }

    useEffect(()=>{
        getPatterns();
    },[])
  return (
    <>
        <Navbar/>

    </>
  )
}

export default WebsiteDashboard