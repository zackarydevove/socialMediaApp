import React from 'react'
import { messageDate } from '../../utils/MessageDate';
import { getCreator } from '../../api/auth';
import { useEffect, useState } from 'react';

function OtherMsg({message}) {
  const [sender, setSender] = useState({});

  useEffect(() => {
    getCreator(message.sender)
    .then((user) => setSender(user))
    .catch((err) => console.log(err));
  }, [])

    return (
        <div className='flex flex-col items-start p-2'>
          <div className='w-fit p-3 bg-gray-700 rounded-[30px] rounded-bl-sm'>
                <p className='text-white'>{message.content}</p>
          </div>
          <div>
            <p className='text-xs pt-1 text-gray-500'>{sender.username} · {messageDate(message.timestamp)}</p>
          </div>
        </div>
      )
}

export default OtherMsg;
