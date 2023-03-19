import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Chat from './Chat';
import SendMessage from './SendMessage';

function Conversation() {
  return (
    <div className='w-[600px] h-full flex flex-col border-r border-r-[#2f3336]'>
      {/* Up: Profile information */}
      <div className='flex justify-between p-2 items-center'>
        <div className='flex items-center gap-2 hover:cursor-pointer'>
            {/* Profile Picture */}
            <div className='w-8 h-8 bg-blue-600 rounded-full'/>
            {/* Name */}
            <p>Vi Phan</p>
        </div>
        {/* Information */}
        <div>
            <AiOutlineInfoCircle size={'1.2em'} className='hover:cursor-pointer'/>
        </div>
      </div>
      <hr />
      {/* Down: Chat */}
      <div className='h-full flex flex-col justify-between'>
        <div className='flex-grow'>
            <Chat />
        </div>
        <hr />
        <div className='mt-2 mb-1'>
            <SendMessage />
        </div>
      </div>
    </div>
  )
}

export default Conversation
