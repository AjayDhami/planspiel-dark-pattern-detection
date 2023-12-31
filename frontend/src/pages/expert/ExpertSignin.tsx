import React, { useState } from 'react'
import './Expertsignin.css'
// import { signIn } from "../services/expertServices"
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

interface Credentials {
    email: string;
    password: string;
    role: string;
}

const ExpertSignin = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
        role: "Expert"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = async () => {
        // const response = await signIn(credentials.email, credentials.password, credentials.role);
        // if(response){
        //     localStorage.setItem("token" , response);
        //     localStorage.setItem("userId", jwtDecode(response).sub || '')
        //     navigate("/maindashboard")
        // }
        // console.log(jwtDecode(response));
    }
  return (
        <div className='grid md:grid-cols-4'>
            <div className='md:col-span-1 items-center justify-center w-full mt-30'>
                <div className='flex justify-center w-full mt-24'><img src='../../../public/assets/logo.png' className='w-24'/></div>
                <form >
                <div className="space-y-4 p-4 m-5">
                    <h2 className='text-base font-bold leading-7 flex text-blue-500 font-bold text-xl justify-center mb-12'>Sign In To the Expert portal</h2>
                    <div className='grid md:grid-cols-1 space-y-4 w-80'>
                        <div className='col-span-1'>
                            <label htmlFor="patterntype" className='mb-2 block text-md font-medium'>Enter Email</label>
                            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                                <input 
                                    type='text' 
                                    name='email' 
                                    id='patterntype' 
                                    onChange={handleChange}
                                    className='block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' 
                                    placeholder="Enter your email"/>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <label htmlFor="patternlink" className='mb-2 block text-md font-medium'>Password</label>
                            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-300'>
                                <input 
                                    type='text' 
                                    name='password' 
                                    id='patternlink'
                                    onChange={handleChange} 
                                    className='block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' 
                                    placeholder="Enter your password"/>
                            </div>
                        </div>
                    </div> 
                </div>
                </form>
                <button className='' onClick={handleSubmit}>Submit</button>
            </div>
            <div className='h-screen md:col-span-3' id='secondarydiv'>
                {/* <div className='w-3/5'><img src='../../public/assets/virtual-5663279.svg'/></div> */}
            </div>
        </div>
  )
}

export default ExpertSignin