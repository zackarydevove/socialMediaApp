import React from 'react'
import { messageDate } from '../../utils/MessageDate';

function OtherMsg({message}) {
    return (
        <div className='flex flex-col items-start p-2'>
          <div className='w-fit p-3 bg-gray-700 rounded-[30px] rounded-bl-sm'>
                <p className='text-white'>{message.content}</p>
          </div>
          <div>
            <p className='text-xs pt-1 text-gray-500'>{messageDate(message.timestamp)}</p>
          </div>
        </div>
      )
}

export default OtherMsg
