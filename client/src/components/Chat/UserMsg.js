import React from 'react'
import { messageDate } from '../../utils/MessageDate';

function UserMsg({message}) {
  return (
    <div className='flex flex-col items-end p-2'>
      <div className='w-fit p-3 bg-[#1d9bf0] rounded-[30px] rounded-br-sm'>
            <p className='text-white'>{message.content}</p>
      </div>
      <div>
        <p className='text-xs pt-1 text-gray-500'>{messageDate(message.timestamp)}</p>
      </div>
    </div>
  )
}

export default UserMsg
