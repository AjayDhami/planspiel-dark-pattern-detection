import React , { useState}from 'react'
import Comments from './Comments';
import { CommentPost } from '../../services/expertServices';
import { IoMdClose } from "react-icons/io";
import {  PatternDetailsProps } from '../../types';
import { getSpecificPattern } from '../../services/expertServices';
import { useExpertContext } from '../../context/ExpertContext';
import { LiaEdit } from "react-icons/lia";
import PatternUpdateForm from './PatternUpdateForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PatternDetailsComponent: React.FC<PatternDetailsProps> = ({isOpen, onClose, expertId, token}) => {
  const [commentText,  setCommentText] = useState("")
  const [commentTextClicked,  setCommentTextClicked] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [editing, setEditing] = useState(false);
  const { patternData, setPatternData } = useExpertContext()
  const handleCommentSubmit = async() => {
    setCommentTextClicked(false);
    const commentObj = await CommentPost(patternData.id, patternData.websiteId, expertId, commentText, token);
    if(commentObj === 201){
      toast.success("Comment added successfully", {
        position: toast.POSITION.TOP_CENTER
      });
      const response = await getSpecificPattern(patternData.id , patternData.websiteId, token);
      setCommentText("");
      if(response){
        setPatternData(response)
      }
    } else{
      toast.error("Error while adding comment, please try again", {
        position: toast.POSITION.TOP_CENTER
      });
    }  
  }
  const handleClose = () =>{
    setEditing(false);
    setCommentTextClicked(false);
    onClose();
  }
  const onCloseEdit = () => {
    setEditing(false)
  }

    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white px-4 py-2 rounded-lg relative z-30 w-3/5 h-4/5 overflow-y-scroll'>
              <>
              <div className='flex justify-end'>
                  <IoMdClose onClick={handleClose} className='hover:bg-blue-200 rounded-lg p-2 text-4xl'/>
              </div>
              {editing ? (
                <>
                  <PatternUpdateForm isOpen= {editing} onClose={onCloseEdit}/>
                </>
              ) : (
                <div className='space-y-4 px-4 pt-2'>
                  <div className='flex justify-between items-center'>
                    <div className='font-bold text-2xl text-blue-500'>{patternData.patternType} </div>
                      {patternData.createdByExpertId===expertId ? 
                        <div className='flex items-center text-md '>
                          <h2 className='text-gray-500 italic font-serif text-gray-400 mr-2'>Added By - you</h2>
                          <div><LiaEdit className='hover:bg-blue-200 rounded-lg p-2 text-4xl' onClick={()=>setEditing(true)}/></div>
                        </div> : 
                        <div className='flex items-center text-md '>
                          <h2 className='text-gray-500 italic font-serif text-gray-400 mr-2'>Added By - {patternData.expertName}</h2>
                        </div>
                      }
                  </div>
                  <div>detected at : {patternData.detectedUrl}</div>
                  <div className='border-b-2 pb-4'>{patternData.description}</div>
                </div>
              )}
                <div className='p-4'>
                  <div className='col-span-full mt-2'>
                    <textarea 
                      name="description" 
                      id="patterndescription"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onClick={()=> setCommentTextClicked(true)}
                      className='block w-full rounded-md border-0 h-10 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400' 
                      placeholder='Add a comment'>
                    </textarea>
                  </div>
                  {commentTextClicked ? <div>
                    <button className='col-span-1 bg-blue-300 p-2 rounded-lg hover:bg-blue-400 mt-2' onClick={handleCommentSubmit}>Add Comment</button>
                    <button className='col-span-1 p-2 rounded-lg hover:bg-gray-200 mt-2 mx-2' onClick={()=> setCommentTextClicked(false)}>Cancel</button>
                  </div> : null}
                </div>
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
                </div>
              </div>
              </>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default PatternDetailsComponent