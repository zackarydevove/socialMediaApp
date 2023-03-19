import React from 'react'
import { BsThreeDots } from 'react-icons/bs';

function Contact() {
  return (
    <div className='flex p-3 border-r-2 border-r-blue-600 hover:bg-[#16181c] hover:cursor-pointer'>
        {/* Left: Profile picture */}
      <div>
        <div className='h-12 w-12 bg-blue-500 rounded-full'/>
      </div>
      {/* Right: Name and options */}
      <div className='w-full flex justify-between ml-3'>
        <div className='flex gap-1'>
            <p>Vi Phan</p>
            <p className='text-gray-500'>@ViPhaneditor</p>
        </div>
        < BsThreeDots className='z-10 hover:cursor-pointer' />
      </div>
    </div>
  )
}

export default Contact
