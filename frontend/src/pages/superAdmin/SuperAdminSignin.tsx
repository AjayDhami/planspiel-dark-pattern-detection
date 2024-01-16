import React, { useState } from 'react';
import { UserCredentials } from '../../types';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext1';
import { useNavigate } from 'react-router-dom';


const SuperAdminSignin = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<UserCredentials>({
        email: "",
        password: "",
        role: "SuperAdmin"
    })

    const authContext = useContext(AuthContext)
    if(!authContext) {
        return null
    };

    const {loginUser} = authContext

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails(prevCredentials => ({
            ...prevCredentials,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: React.FormEvent)  => {
        try {
            e.preventDefault();
            const loginSuccess = await loginUser(userDetails);
            if (loginSuccess) {
                navigate('/superAdmin');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">
            Enter Email:
        </label>
        <input name="email" type="email" placeholder='Enter Email' onChange={handleChange}/> 
        <label htmlFor="password">
            Enter Password:
        </label>
        <input name="password" type="password" placeholder='Enter Password' onChange={handleChange}/>
        <button type='submit'>Submit</button>
        </form> 
    </div>
  )
}

export default SuperAdminSignin