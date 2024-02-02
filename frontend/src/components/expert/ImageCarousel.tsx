import React from 'react'
import { IoMdClose } from 'react-icons/io';

interface ImageCarouselProops {
    image?: File;
    isOpen : boolean;
    onClose : () => void;
}

const ImageCarousel:React.FC<ImageCarouselProops> = ({image, isOpen, onClose}) => {
    if(!isOpen) return null
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg relative z-50 space-y-8 w-4/5 h-4/5 overflow-auto'>
            <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 text-black-500 cursor-pointer bg-gray-200 rounded-full shadow-xl hover:bg-blue-300"
            >
                <IoMdClose
                    className="p-2 text-4xl font-bold"
                />
            </button>
            <div className="flex justify-center">{image && <img src={URL.createObjectURL(image)} className='w-fit p-5 h-fit border-2 border-gray-200' alt='Preview'/>}</div>
        </div>
    </div>
  )
}

export default ImageCarousel