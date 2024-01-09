import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useExpertContext } from '../../context/ExpertContext'
import { getPatternsData, getSpecificPattern } from '../../services/expertServices';
import Navbar from '../../components/expert/Navbar';
import PatternCard from '../../components/expert/PatternCard';
import PatternAdditionForm from '../../components/expert/PatternAdditionForm';
import PatternDetailsComponent from '../../components/expert/PatternDetailsComponent';
import { PatternData } from '../../types';
import { setRedirectCallback } from "../../utils/AxiosHelper";
import AuthContext from "../../context/AuthContext1";
import withExpertAuth from '../../hoc/withExpertAuth';


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
    const websiteName = sessionStorage.getItem("websiteName")
    const [patterns, setPatterns] = useState<any[]>([]);
    const [filteredArray, setFilteredArray] = useState<any[]>([]);
    const experId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const [patternTypes, setPatternTypes] = useState([])
    const [experts, setExperts] = useState([])
    const [phases, setPhases] = useState([])
    const [filters, setFilters] = useState({
        patternType: '',
        expertName: '',
        phase: ''
    });
    const [isPatternformOpen, setIsPatternformOpen] = useState(false);
    const [isPatternModalOpen, setIsPatternModalOpen] = useState(false)
    const { setPatternData } = useExpertContext()

    const getPatterns = useCallback( async () => {
        setPatterns([]);
        let data : any = [];
        if(websiteId && token){
            data = await getPatternsData(websiteId, token);
            setPatterns(data);
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
            setFilteredArray(data)
        }
    },[websiteId, token])

    useEffect(()=>{
        getPatterns();
    },[getPatterns]);
    useEffect(() => {
        const filteredArray = patterns.filter((item) => {
            return (
                (!filters.patternType || item.patternType === filters.patternType) &&
                (!filters.expertName || item.expertName.includes(filters.expertName)) &&
                (!filters.phase || item.patternPhase === filters.phase)
            );
        });
        setFilteredArray(filteredArray);
    }, [filters, patterns]);

    const handleSelectOption = (filterType : string,option: string) => {
        setFilters(prevFilters => ({
          ...prevFilters,
          [filterType]: option
        }));
    };
    const openForm = () =>{setIsPatternformOpen(true)}
    const closeFrom = () =>{
      setIsPatternformOpen(false);
      getPatterns();
    };
    const openPatternModal = async (id:String) => {
      if(websiteId && token){
        const patternObj  = await getSpecificPattern(id , websiteId, token);
        setPatternData(patternObj);
        setIsPatternModalOpen(true)
      }  
    }
    const closePatternModal = () => {setIsPatternModalOpen(false)}

  return (
    <>
        <Navbar/>
        <>
        <div className='flex justify-between py-4 px-24'>
          <div>
            <h2 className='text-3xl font-bold text-blue-500'>{websiteName}</h2>
          </div>
        </div>
        <PatternAdditionForm isOpen={isPatternformOpen} onClose={closeFrom}/>
        <PatternDetailsComponent isOpen={isPatternModalOpen} onClose={closePatternModal} expertId={experId ? experId : ""} token={token ? token : ""}/>
        <div className='mx-24 h-1/4 grid md:grid-cols-4 gap-4'>
          <div className='md:col-span-1 shadow-xl rounded-2xl bg-white h-[30rem]'>
            <div className='mx-4 mt-2 space-x-3 py-6 flex justify-center'>
                <button onClick={openForm} className='px-8 py-2 rounded-md bg-blue-500 text-white'>Add a Pattern</button>
                {/* <button className=' px-8 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white'>Chat</button> */}
            </div>
            <div className='mx-8 mt-4 h-80 flex flex-col'>
                <div className='mx-2'>
                  <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Created By</label>
                  <select id="orient" 
                    className='p-2 bg-transparent border-2 rounded-md w-60'
                    onChange={(e) => handleSelectOption('expertName', e.target.value)}
                    >
                    <option value="">Select</option>
                    {experts.map((expert)=>(
                        <option value={expert}>{expert}</option>
                    ))}
                  </select>
                </div>
                <div className='mx-2 mt-2'>
                  <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Pattern Type</label>
                  <select id="orient" 
                    className='p-2 bg-transparent border-2 rounded-md w-60'
                    onChange={(e) => handleSelectOption('patternType', e.target.value)}
                    >
                    <option value="">Select</option>
                    {patternTypes.map((type)=>(
                        <option value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className='mx-2 mt-2'>
                  <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Status</label>
                  <select id="orient" 
                    className='p-2 bg-transparent border-2 rounded-md w-60'
                    onChange={(e) => handleSelectOption('phase', e.target.value)}
                    >
                    <option value="">Select</option>
                    {phases.map((phase)=>(
                        <option value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>  
            </div>
          </div>
          <div className='md:col-span-3 h-[30rem] overflow-y-scroll px-12 py-4 shadow-xl rounded-2xl bg-white'>
          {filteredArray.map((pattern,index)=>(
            pattern.patternPhase === "InProgress" ? 
              (<PatternCard patternKey={pattern.createdByExpertId} isAutoGenerated = {pattern.isAutoGenerated} loggedInExpert = {experId ? experId : ""} pattern_date={pattern.createdAt} pattern_type={pattern.patternType} expertName={pattern.expertName} color={"#F9C32F"} text={"In Progress"} hoverText = {"Awaiting Verification from experts"} openModal = {()=> openPatternModal(pattern.id)}/>)
              : pattern.patternPhase === "Verified" && pattern.isPatternExists === true ? 
              (<PatternCard patternKey={pattern.createdByExpertId} isAutoGenerated = {pattern.isAutoGenerated} loggedInExpert = {experId ? experId : ""} pattern_date={pattern.createdAt} pattern_type={pattern.patternType} expertName={pattern.expertName} color={"#E6321D"} text={"Verified"} hoverText = {"Verified but dark pattern exists"} openModal = {()=> openPatternModal(pattern.id)}/>)
              : pattern.patternPhase === "Verified" && pattern.isPatternExists === false ? 
              (<PatternCard patternKey={pattern.createdByExpertId} isAutoGenerated = {pattern.isAutoGenerated} loggedInExpert = {experId ? experId : ""} pattern_date={pattern.createdAt} pattern_type={pattern.patternType} expertName={pattern.expertName} color={"#538D3F"} text={"Verified"} hoverText = {"Verified and dark pattern free"} openModal = {()=> openPatternModal(pattern.id)}/>)
              : null
          ))}
          </div>
        </div>
        </>
    </>
  )
}

export default withExpertAuth(WebsiteDashboard)