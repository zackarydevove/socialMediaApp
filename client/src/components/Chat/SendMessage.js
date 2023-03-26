import React from 'react'
import { BsCardImage, BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineFileGif, AiOutlineSend } from 'react-icons/ai'
import { sendMessage } from '../../api/chat';
import { useEffect, useState } from 'react';
import socket from '../../socket';

function SendMessage({chatId, sender, receiver, onSentMessage}) {
    const [message, setMessage] = useState('');

    const handleClick = () => {
        const sentMessage = sendMessage(chatId, message, sender, receiver);
        setMessage('');
        if (sentMessage) {
          // Call the onSentMessage function passed as a prop to update the messages state
          onSentMessage(sentMessage);
        }
      };

    // Typing indicator
    const handleTypingStart = () => {
        socket.emit('typing_start', chatId);
    };
      
    const handleTypingStop = () => {
        socket.emit('typing_stop', chatId);
    };


  return (
        <div className='flex justify-center items-center'>
            <div className='flex w-[98%] p-3 justify-between items-center rounded-3xl bg-[#16181c]'>
                <div className='flex flex-grow gap-3'>
                    <div className='flex gap-2'>
                        <BsCardImage size={'1.2em'}/>
                        <AiOutlineFileGif size={'1.2em'}/>
                        <BsFillEmojiSmileFill size={'1.2em'}/>
                    </div>
                    <input 
                        placeholder='Start a new message' 
                        className='flex-grow bg-[#16181c]'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={handleTypingStart}
                        onBlur={handleTypingStop}
                    ></input>
                </div>
                <AiOutlineSend onClick={handleClick}/>
            </div>
        </div>
  )
}

export default SendMessage
