import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useExpertContext } from '../../context/ExpertContext'
import { getPatternsData, getSpecificPattern, getSpecificWebsite, stringAvatar , publishWebsite} from '../../services/expertServices';
import Navbar from '../../components/expert/Navbar';
import PatternCard from '../../components/expert/PatternCard';
import PatternAdditionForm from '../../components/expert/PatternAdditionForm';
import PatternDetailsComponent from '../../components/expert/PatternDetailsComponent';
import { PatternData, publishObj } from '../../types';
import { setRedirectCallback } from "../../utils/AxiosHelper";
import AuthContext from "../../context/AuthContext1";
import withExpertAuth from '../../hoc/withExpertAuth';
import { toast } from "react-toastify";
import { Avatar} from '@mui/material';
import LoadingPatternCard from '../../components/expert/LoadingPatternCard';
import LoadingCards from '../../components/expert/LoadingCards';


const WebsiteDashboard = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        setRedirectCallback(() => {
          authContext?.logoutUser();
        });
        return () => {
          setRedirectCallback(null);
        };
    }, [authContext]);
    const websiteId = sessionStorage.getItem("websiteId")
    const websiteName = sessionStorage.getItem("websiteName");
    const { websiteData, setWebsiteData } = useExpertContext();
    const [patterns, setPatterns] = useState<any[]>([]);
    const [filteredArray, setFilteredArray] = useState<any[]>([]);
    const experId = localStorage.getItem("userId");
    const expertName = localStorage.getItem("userName");
    const token = localStorage.getItem("authToken");
    const [patternTypes, setPatternTypes] = useState<any[]>([])
    const [experts, setExperts] = useState<any[]>([])
    const [phases, setPhases] = useState<any[]>([])
    const [filters, setFilters] = useState({
        patternType: '',
        expertName: '',
        phase: ''
    });
    const [isPublishBtnDisabled, setIsPublishBtnDisabled] = useState<boolean>(false);
    const [isPatternformOpen, setIsPatternformOpen] = useState(false);
    const [isPatternModalOpen, setIsPatternModalOpen] = useState(false)
    const {  setPatternData } = useExpertContext();
    const [zindex, setZindex ] = useState(false)
    const z_index = zindex ? "z-[-10]" : "z-[0]"
    const bgForPublishBtn = isPublishBtnDisabled ? "bg-gray-300" : "bg-green-500";
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCardLoading, setIsCardLoading] = useState<boolean>(false);

    const getWebsiteData = useCallback(async ()=> {
      if(websiteId){
        try {
          const webData = await getSpecificWebsite(websiteId)
          if(webData){
            setWebsiteData(webData)
          }
        } catch (error) {
          if (error instanceof Error) {
            toast.error(`Error: ${error.message}`);
          } else {
            toast.error("An unknown error occurred.");
          }
        }
      }
      // eslint-disable-next-line
    },[websiteId]) 

    const getPatterns = useCallback( async () => {
        setPatterns([]);
        let data : any = [];
        if(websiteId && token){
            try {
              data = await getPatternsData(websiteId);
              setPatterns(data);
              const patternPhases = data.map((item : PatternData)=>item.patternPhase);
              !patternPhases.includes("InProgress") ? setIsPublishBtnDisabled(false) : setIsPublishBtnDisabled(true);
              const uniquePatternTypes = data
                .map((item : PatternData) => item.patternType)
                .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

              const uniqueExperts = data
                .map((item : PatternData) => item.expertName)
                .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

              const uniquePhases = data
                .map((item : PatternData) => item.patternPhase)
                .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
              setPatternTypes(uniquePatternTypes);
              setExperts(uniqueExperts);
              setPhases(uniquePhases);
              setIsLoading(false);
              setIsCardLoading(false);
            } catch (error) {
              if (error instanceof Error) {
                toast.error(`Error: ${error.message}`);
              } else {
                toast.error("An unknown error occurred.");
              }
            }
        }
    },[websiteId, token])

    useEffect(()=>{
        getPatterns();
        getWebsiteData();
    },[getPatterns, getWebsiteData]);

    const filterArray = useCallback(() => {
      setFilteredArray([]);
      const filtered = patterns.filter((item) => {
        return (
            (!filters.patternType || item.patternType === filters.patternType) &&
            (!filters.expertName || item.expertName.includes(filters.expertName)) &&
            (!filters.phase || item.patternPhase === filters.phase)
        );
      });
      setFilteredArray(filtered);
    },[filters, patterns])

    useEffect(() => {
        filterArray();
    }, [filterArray]);

    const handleSelectOption = (filterType : string,option: string) => {
      setFilteredArray([]);
      setFilters(prevFilters => ({
        ...prevFilters,
        [filterType]: option
      }));
    };
    const openForm = () =>{
      setIsPatternformOpen(true);
      setZindex(true)
    }
    const closeFrom = () =>{
      setIsPatternformOpen(false);
      setIsCardLoading(true);
      getPatterns();
      setZindex(false)
    };
    const openPatternModal = async (id:String) => {
      setZindex(true)
      try {
        if(websiteId && token){
          const patternObj  = await getSpecificPattern(id , websiteId);
          setPatternData(patternObj);
          setIsPatternModalOpen(true)
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("An unknown error occurred.");
        }
      }  
    }
    const closePatternModal = () => {
      setZindex(false)
      setIsPatternModalOpen(false);
      setIsCardLoading(true);
      getPatterns();
    }

    const handlePublish = async() => {
      console.log("btn clicked");
      
      const contsinsDarkPattern = patterns.some((pattern:PatternData)=>
        pattern.isPatternExists
      )
      const publishObj:publishObj = {
        expertId: experId?experId:"",
        isCertified: !contsinsDarkPattern,
        expertFeedback : "Expert Feedback"
      }
      try {
        const resp = await publishWebsite(websiteId?websiteId:"", publishObj )
        console.log(resp);
        
      } catch (error) {
        
      }
    }

  return (
    <>
        <Navbar/>
        {isLoading ? <LoadingPatternCard/> :
        <>
        <PatternAdditionForm isOpen={isPatternformOpen} onClose={closeFrom}/>
        <PatternDetailsComponent isOpen={isPatternModalOpen} onClose={closePatternModal} expertId={experId ? experId : ""}/>
        <div className='mx-24 h-screen grid md:grid-cols-3 gap-4 mt-8'>
          <div className={`md:col-span-1 shadow-xl rounded-2xl bg-white h-fit py-6 px-4 ${z_index}`}>
            <div className='flex justify-between items-center'>
              <h2 className='text-3xl font-bold text-blue-500'>{websiteName}</h2>
              {websiteData.primaryExpertId === experId && websiteData.phase==="InProgress" ? 
                (!isPublishBtnDisabled ? <button className={`${bgForPublishBtn} px-3 py-2 rounded-lg text-white`} onClick={handlePublish}>Publish</button> : <button className={`${bgForPublishBtn} px-3 py-2 rounded-lg text-white`} >Publish</button> )  
              : <p>{websiteData.phaseText}</p>}
            </div>
            <div className='text-lg px-2'>{websiteData.baseUrl}</div>
            <div className='mt-3'>
              <div className='w-full bg-gray-200 py-2 px-2 mt-2 rounded-lg'>
                <h2 className='font-bold'>Description</h2>
                <p>{websiteData.description}</p>
              </div>
              <div className='w-full rounded-lg mt-2 p-2'>
                <h2 className='font-bold'>Experts</h2>
                {websiteData.expertDetails.map((expert)=>(
                  expert.id === websiteData.primaryExpertId ? <div className='flex items-center my-2'><Avatar {...stringAvatar(expert.name)} className='mx-2'/>{expert.name}<span className='text-gray-400 italic'> - Primary</span></div> : <div className='flex items-center my-2'><Avatar {...stringAvatar(expert.name)} className='mx-2'/>{expert.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className='md:col-span-2 h-full px-12 py-4 shadow-xl rounded-2xl bg-white'>
              <div className='flex justify-between items-center mt-2'>
                <div className='flex items-center'>
                <div className='mx-2'>
                  <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Created By</label>
                  <select id="orient" 
                    className='p-2 bg-transparent border-2 rounded-md w-40'
                    onChange={(e) => handleSelectOption('expertName', e.target.value)}
                    >
                    <option value="">All</option>
                    {experts.map((expert)=>(
                        expert === expertName ? <option value={expert}>You</option> : <option value={expert}>{expert}</option>
                    ))}
                  </select>
                </div>
                <div className='mx-2'>
                  <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Pattern Type</label>
                  <select id="orient" 
                    className='p-2 bg-transparent border-2 rounded-md w-40'
                    onChange={(e) => handleSelectOption('patternType', e.target.value)}
                    >
                    <option value="">All</option>
                    {patternTypes.map((type)=>(
                        <option value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className='mx-2'>
                  <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Status</label>
                  <select id="orient" 
                    className='p-2 bg-transparent border-2 rounded-md w-40'
                    onChange={(e) => handleSelectOption('phase', e.target.value)}
                    >
                    <option value="">All</option>
                    {phases.map((phase)=>(
                        <option value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>  
              </div>
              <div className='mx-2'>
                {websiteData.phase === "InProgress" ? <button onClick={openForm} className='px-8 py-2 rounded-md bg-blue-500 text-white'>Add a Pattern</button> : null}
              </div>
              </div>
            {!isCardLoading ? 
            filteredArray.map((pattern : PatternData,index)=>(
              <PatternCard patternData={pattern} loggedInExpert = {experId ? experId : ""} openModal = {()=> openPatternModal(pattern.id)}/>
            )) : <LoadingCards/>
            }
          </div>
        </div>
        </>}
    </>
  )
}

export default withExpertAuth(WebsiteDashboard)