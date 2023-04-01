import React from 'react'
import { BsCardImage, BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineFileGif, AiOutlineSend } from 'react-icons/ai'
import { sendMessage } from '../../api/chat';
import { useState } from 'react';
import socket from '../../socket';
import Picker from '@emoji-mart/react'

function SendMessage({chatId, sender, receiver, onSentMessage}) {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
        socket.emit('typing_start', { chatId, username: sender.username });
    };
      
    const handleTypingStop = () => {
        console.log('blur');
        socket.emit('typing_stop', { chatId, username: sender.username });
    };

    const addEmoji = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji.native);
    };

  return (
        <div className='flex justify-center items-center'>
            <div className='flex w-[98%] p-3 justify-between items-center rounded-3xl bg-[#16181c]'>
                <div className='flex flex-grow gap-3'>
                    <div className='flex gap-2 items-center'>
                            <BsCardImage size={'1.3em'} className='text-gray-500' />
                            <AiOutlineFileGif size={'1.3em'} className='text-gray-500'/>
                        <div className='relative'>
                            <BsFillEmojiSmileFill size={'1.2em'} className='hover:cursor-pointer hover:text-blue-500'
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                            {showEmojiPicker && (
                                <div className='absolute max-sm:-left-16 bottom-10 z-30'>
                                    <Picker
                                        onEmojiSelect={addEmoji}
                                        theme='dark'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <input 
                        placeholder='Start a new message' 
                        className='flex-grow bg-[#16181c] w-1/2'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onInput={handleTypingStart}
                        onBlur={handleTypingStop}
                    ></input>
                </div>
                <AiOutlineSend onClick={handleClick} className='hover:cursor-pointer hover:text-blue-500'/>
            </div>
        </div>
  )
}

export default SendMessage
