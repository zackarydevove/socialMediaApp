import React from 'react'
import { messageDate } from '../../utils/MessageDate';
import { BsThreeDots } from 'react-icons/bs';
import InfoMsg from './InfoMsg';
import { useState } from 'react';

function UserMsg({message}) {
  const [openMessageInfo, setOpenMessageInfo] = useState(false);

  return (
    <div className='flex flex-col items-end p-2  group user-msg-container'>
      <div className='flex items-center'>
        <div className='cursor-pointer pr-3 relative opacity-0 group-hover:opacity-100'
          onClick={() => setOpenMessageInfo(!openMessageInfo)}>
          <BsThreeDots className='text-gray-500'/>
            {
              openMessageInfo ?
              <InfoMsg message={message}/>
              : null
            }
        </div>
        <div className='w-fit p-3 bg-[#1d9bf0] rounded-[30px] rounded-br-sm'>
              <p className='text-white'>{message.content}</p>
        </div>
      </div>
      <div>
        <p className='text-xs pt-1 text-gray-500'>{messageDate(message.timestamp)}</p>
      </div>
    </div>
  )
}

export default UserMsg
