import React from 'react'

interface LandingModalProps {
    isOpen : boolean,
    onClose: () => void
}

const LandingModal:React.FC<LandingModalProps> = ({isOpen, onClose}) => {
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white px-4 py-2 rounded-lg relative z-30 w-3/5 h-4/5'>
            <div><button onClick={onClose}>Close</button></div>
        </div>
    </div>
  )
}

export default LandingModal