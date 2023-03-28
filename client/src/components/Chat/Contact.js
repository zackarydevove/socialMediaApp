import React from 'react'
import { getParticipants, getLastMessage } from '../../api/chat';
import { useEffect, useState } from 'react';
import { lastMsgDate } from '../../utils/lastMsgDate';

function Contact({chatId, setActualChatId, actualChatId, setMessages}) {
  const [participants, setParticipants] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  // Function to get the other participants information
  useEffect(() => {
    getParticipants(chatId)
    .then((otherUsers) => {
      setParticipants(otherUsers)
    })
    .catch((err) => console.log(err));

    getLastMessage(chatId)
    .then((message) => {
      setLastMessage(message);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`flex p-3 ${chatId === actualChatId ? 'border-r-2 border-r-blue-600' : null} hover:bg-[#16181c] hover:cursor-pointer`}
      onClick={() => {
        setActualChatId(chatId);
        setMessages([]);
      }}>
        {/* Left: Profile picture */}
      <div>
        <div className='h-12 w-12 bg-blue-500 rounded-full'/>
      </div>
      {/* Right: Name and options */}
        {/* Up */}
        <div className='w-full'>
          <div className='w-full flex  px-3'>
            
              <div className='flex gap-1'>
              {
                participants ?
                participants.map((participant, index) => {
                  return (
                  <div key={index} className='flex gap-1 '>
                      <p>{participant.username} 
                      {participants.length > 1 && index < participants.length - 1 ? ',' : ''} </p>
                      {
                        participants.length === 1 ? <p className='text-gray-500 text-ellipsis'>@{participant.username} </p> : null
                      }
                  </div>
                )})
                : null
              }
              </div>
              <p className='text-gray-500 px-1'> · {lastMessage ? lastMsgDate(lastMessage.timestamp) : ''} </p>
          </div>
          {/* Down */}
          <div className='px-3'>
            <p className='text-gray-500'>{lastMessage?.content}</p>
          </div>
        </div>
    </div>
  )
}

export default Contact
