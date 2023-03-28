import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import socket from '../../socket';

function InfoMsg({message}) {

  const handleDeleteMessage = () => {
    socket.emit('delete_message', { messageId: message._id, chatId: message.conversationId });
    console.log('message deleted for everyone');
  }

  return (
    <div className='w-[150px] flex justify-center items-center p-3 bg-black border border-[#2f3336] shadow-[0px_0px_5px_-1px_rgba(0,0,0,0.3)] shadow-white rounded-lg hover:cursor-pointer z-20 hover:bg-gray-700 transition absolute top-0 translate-y-[-50%] translate-x-[-110%] text-red-700' 
        onClick={handleDeleteMessage}>
      <FiTrash2 className='flex-shrink'/>
      <p className='flex-grow pl-3'>Delete</p>
  </div>
  )
}

export default InfoMsg
