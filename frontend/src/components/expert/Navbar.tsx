import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center shadow-xl'>
        <div className='w-14 mx-12 py-6'><img src="/assets/logo.png" alt="logo" /></div>
        <div className='mr-20 flex items-center'>
            <Link to="/expertdashboard" className='font-bold text-lg text-blue-500 mr-10'>Dashboard</Link>
            <h2 className='font-bold text-lg text-blue-500 mr-10'>Profile</h2>
            {/* <CgProfile className='text-2xl'/> */}
        </div>
    </div>
  )
}

export default Navbar