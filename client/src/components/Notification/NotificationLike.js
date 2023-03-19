import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

function NotificationLike() {
  return (
    <div>
      <div className='flex p-3'>
        {/* Left: Emoji of action */}
        <div className='text-red-600 ml-5'>
          <AiFillHeart size={'2.2em'}/>
        </div>
        {/* Right: Information of action */}
        <div className='flex flex-col gap-3 pl-3'>
          {/* First row: Profile picture */}
          <div className='flex'>
            <div className='w-8 h-8 rounded-full bg-blue-600'/>
          </div>
          {/* Second row: Name and action */}
          <div className='flex gap-1'>
            <p className='font-bold'>Vitamin</p>
            <p>liked your Tweet</p>
          </div>
          {/* Third Row: Tweet */}
          <div>
            <p className='text-gray-500'>Hello Twitter and LinkedIn this is my first post! But I need a text longer to see okok let's go</p>
          </div>

        </div>
      </div>
      <hr className='border-t-[#2f3336]' />
    </div>
  )
}

export default NotificationLike
