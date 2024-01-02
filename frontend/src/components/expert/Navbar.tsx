import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center shadow-xl'>
        <div className='w-14 mx-12 py-6'><img src="../../../public/assets/bgimage.svg" alt="logo" /></div>
        <div className='mr-20 flex items-center'>
            <h2 className='font-bold text-lg text-blue-500 mr-10'>Dashboard</h2>
            <h2 className='font-bold text-lg text-blue-500 mr-10'>Profile</h2>
            {/* <CgProfile className='text-2xl'/> */}
        </div>
    </div>
  )
}

export default Navbar