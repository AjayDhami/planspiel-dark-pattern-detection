import React, {useState} from 'react'
import { patternPost } from '../../services/expertServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PatternAdditionFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const PatternAdditionForm: React.FC<PatternAdditionFormProps> = ({isOpen, onClose}) => {
    const websiteId = sessionStorage.getItem("websiteId");
    const experId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");
    const [formData, setFormData]  = useState({
        patterntype : "",
        description : "",
        patternlink : ""
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData(p=>({...p,[e.target.name] : e.target.value}))
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        if(websiteId && experId && token){
            const response = await patternPost(websiteId,experId,formData.patterntype, formData.description, formData.patternlink,token );
            console.log(response);  
            if(response === 201){
                onClose();
                toast.success("Pattern added successfully", {
                    position: toast.POSITION.TOP_CENTER
                });
                setFormData({
                    patterntype : "",
                    description : "",
                    patternlink : ""
                })
            }  else{
                toast.error("Error while adding pattern, try again", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    }
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg relative z-10 space-y-8 w-3/5'>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <h2 className='text-base font-bold leading-7'>Add a Pattern</h2>
                    <div className='grid md:grid-cols-3 space-x-4'>
                        <div className='col-span-1'>
                            <label htmlFor="patterntype" className='mb-2 block text-md font-medium'>Pattern Type *</label>
                            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                                <input 
                                    type='text' 
                                    name='patterntype'
                                    required 
                                    id='patterntype' 
                                    value={formData.patterntype}
                                    onChange={handleChange}
                                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Pattern Type"/>
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Link *</label>
                            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                                <input 
                                    type='text' 
                                    name='patternlink' 
                                    id='patternlink'
                                    required
                                    value={formData.patternlink}
                                    onChange={handleChange} 
                                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' placeholder="Enter Link where pattern is detected"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-full'>
                        <label htmlFor="patterndescription" className='mb-2 block text-md font-medium'>Description *</label>
                        <textarea 
                            name="description" 
                            id="patterndescription"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className='block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset focus:ring-green-300' placeholder='Short description for pattern detection and review'></textarea>
                    </div>
                    <div className='grid md:grid-cols-3 space-x-7'>
                        <button className='col-span-2 bg-blue-300 p-3 rounded-lg' type='submit'>Add pattern for review</button>
                        <button className='col-span-1 bg-blue-300 p-3 rounded-lg' onClick={onClose}>Close</button>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </div>
    </div>
    
  )
}

export default PatternAdditionForm