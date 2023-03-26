import React from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { getParticipant } from '../../api/chat';
import { useEffect, useState } from 'react';

function Contact({chatId, setActualChatId}) {
  const [participant, setParticipant] = useState({});

  // Function to get the other participant information
  useEffect(() => {
    getParticipant(chatId)
    .then((otherUser) => {
      setParticipant(otherUser)
    })
    .catch((err) => console.log(err))
  }, []);

  return (
    <div className='flex p-3 border-r-2 border-r-blue-600 hover:bg-[#16181c] hover:cursor-pointer'
      onClick={() => setActualChatId(chatId)}>
        {/* Left: Profile picture */}
      <div>
        <div className='h-12 w-12 bg-blue-500 rounded-full'/>
      </div>
      {/* Right: Name and options */}
      <div className='w-full flex justify-between ml-3'>
        <div className='flex gap-1'>
            <p>{participant.username}</p>
            <p className='text-gray-500'>@{participant.username}</p>
        </div>
        <BsThreeDots className='z-10 hover:cursor-pointer' />
      </div>
    </div>
  )
}

export default Contact
