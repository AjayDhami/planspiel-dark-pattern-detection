import React , {useEffect, useState}from 'react'
import Comments from './Comments';
import { CommentPost } from '../../services/expertServices';
import { IoMdClose } from "react-icons/io";
import { PatternData, PatternDetailsProps } from '../../types';
import { getSpecificPattern } from '../../services/expertServices';
import { useExpertContext } from '../../context/ExpertContext'


const PatternDetailsComponent: React.FC<PatternDetailsProps> = ({isOpen, onClose, expertId, token}) => {
  const [commentText,  setCommentText] = useState("")
  // const [patternObject, setPatternObject] = useState<PatternData>();
  const [editing, setEditing] = useState(false);
  const { patternData, setPatternData } = useExpertContext()
  // const getPatternsData = async () =>{
  //   const response = await getSpecificPattern(patternData.id , patternData.websiteId, token);
  //   console.log(response);
  // }

  const handleCommentSubmit = async() => {
    const commentObj = await CommentPost(patternData.id, patternData.websiteId, expertId, commentText, token);
    if(commentObj === 201){
      const response = await getSpecificPattern(patternData.id , patternData.websiteId, token);
      setCommentText("");
      if(response){
        setPatternData(response) 
        console.log(patternData);
      }
    }   
  }

    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white px-4 py-2 rounded-lg relative z-30 w-3/5 h-4/5 overflow-y-scroll'>
            {patternData.createdByExpertId === expertId ? (
              <>
              <div className='flex justify-end'>
                  <IoMdClose onClick={onClose} className='hover:bg-blue-200 rounded-lg p-2 text-4xl'/>
              </div>
              {editing ? (
                <>
                <div className='space-y-4 px-4'>
                  <div>
                    <label htmlFor="patterntype" className='mb-2 block text-md font-medium'>Pattern Type</label>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-300'>
                      <input 
                        value={patternData.patternType}
                        type='text' 
                        name='patterntype' 
                        id='patterntype' 
                        //onChange={handleChange}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Pattern Type"/>
                    </div>
                  </div>
                  <div className='col-span-half'>
                    <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Link</label>
                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                      <input 
                        value={patternData.detectedUrl}
                        type='text' 
                        name='patternlink' 
                        id='patternlink'
                        //onChange={handleChange} 
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Link where pattern is detected"/>
                    </div>
                  </div>
                  <div className='col-span-full'>
                    <label htmlFor="patterndescription" className='mb-2 block text-md font-medium'>Description</label>
                    <textarea 
                      value={patternData.description}
                      name="description" 
                      id="patterndescription"
                      //onChange={handleChange}
                      className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-green-300' placeholder='Short description for pattern detection and review'></textarea>
                  </div>
                  <div className='space-x-7 border-b-2 pb-4 flex justify-start'>
                    <button className='bg-blue-300 p-2 rounded-lg' type='submit'>Save Changes</button>
                    <button className='bg-blue-300 p-2 rounded-lg' type='submit' onClick={()=>setEditing(false)}>Cancel</button>
                  </div>
                  </div>
                </>
              ) : (
                <div className='space-y-4 px-4 pt-2'>
                  <div className='flex justify-between items-center'>
                    <div className='font-bold text-2xl text-blue-500'>{patternData.patternType} </div>
                    <div className='flex items-center text-md '>
                      <h2 className='text-gray-500 italic font-serif text-gray-400 mr-2'>Added By - you</h2>
                      <div><button className='bg-blue-300 p-2 w-20 rounded-lg' onClick={()=>setEditing(true)}>Edit</button></div>
                    </div>
                  </div>
                  <div>detected at : {patternData.detectedUrl}</div>
                  <div className='border-b-2 pb-4'>{patternData.description}</div>
                </div>
              )}
              <div className='px-4 py-2'>
                <h2 className='font-bold text-xl text-blue-500'>Comments</h2>
                <div>
                {patternData.comments.length === 0 ? (
                  <div className='bg-gray-100 p-4 my-3 rounded-lg'>
                    <p className='text-gray-400'>No feedbacks added yet</p>
                  </div>
                ) :
                  (patternData.comments.map((comment)=>(
                    <Comments review={comment} token={token} expertId={expertId}/> 
                  )))
                } 
                  <div>
                  <h2 className='font-bold text-xl text-blue-500'>Add Comments</h2>
                  <div className='col-span-full mt-2'>
                    <textarea 
                      name="description" 
                      id="patterndescription"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-green-300' 
                      placeholder='Add a comment'>
                    </textarea>
                  </div>
                  <button className='col-span-1 bg-blue-300 p-2 rounded-lg hover:bg-blue-500 mt-2' onClick={handleCommentSubmit}>Add Comment</button>
                </div>
                </div>
              </div>
              </>
            ) : (
              <>
                <div className='flex justify-end'>
                  <IoMdClose onClick={onClose} className='hover:bg-blue-200 rounded-lg p-2 text-4xl'/>
                </div>
                <div className='space-y-1 p-4'>
                  <div className='flex justify-between'>
                    <div className='font-bold text-2xl text-blue-500'>{patternData.patternType}</div>
                    <div className='text-md text-gray-500 italic font-serif text-gray-400'><h2>Added By - {patternData.expertName}</h2></div>
                  </div>
                  <div>detected at : {patternData.detectedUrl}</div>
                  <div className='border-b-2 pb-4'>{patternData.description}</div>
                  <div>
                    <h2 className='font-bold text-xl text-blue-500'>Comments</h2>
                  </div>
                <div>
                {patternData.comments.length === 0 ? (
                  <div className='bg-gray-100 p-4 my-3 rounded-lg'>
                    <p className='text-gray-400'>No feedbacks added yet</p>
                  </div>
                ) :
                  (patternData.comments.map((comment)=>(
                    <Comments review={comment} token={token} expertId={expertId}/> 
                  )))
                } 
                </div>
                <div>
                  <h2 className='font-bold text-xl text-blue-500'>Add Comments</h2>
                  <div className='col-span-full mt-2'>
                    <textarea 
                      name="description" 
                      id="patterndescription"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-green-300' 
                      placeholder='Add a feedback for the dark pattern'>
                    </textarea>
                  </div>
                  <button className='col-span-1 bg-blue-300 p-2 rounded-lg hover:bg-blue-500 mt-2' onClick={handleCommentSubmit}>Submit</button>
                </div>
                <div className="flex justify-end" >
                  <button className='col-span-1 bg-blue-300 p-2 rounded-lg hover:bg-blue-500 mt-2'>Complete Verification</button>
                </div>
                </div>
              </>
            )}
        </div>
    </div>
  )
}

export default PatternDetailsComponent