import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import Chat from './Chat';
import SendMessage from './SendMessage';
import { getMessages, getParticipant } from '../../api/chat';
import { useEffect, useState } from 'react';
import socket from '../../socket';

// One conversation/chat, fetch the messages and show them in Chat, send Messages aswell
function Conversation({actualChatId, currentUser}) {
  const [messages, setMessages] = useState([]);
  const [participant, setParticipant] = useState({});
  const [updateMessage, setUpdateMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  console.log('istyping: ', isTyping)
  // Fetch the messages of the chat
  useEffect(() => {
    if (actualChatId) {
      getMessages(actualChatId)
        .then((msgs) => setMessages(msgs))
        .catch((err) => console.log(err));
    }
  }, [actualChatId, updateMessage]);

  useEffect(() => {
    console.log('User socket ID:', socket.id);
    console.log('Actual chat ID:', actualChatId);
  }, []);

  useEffect(() => {
    if (actualChatId) {
      // Set up socket listeners
      socket.emit('join_room', actualChatId);
  
      socket.on('receive_message', (message) => {
        console.log('Message received:', message);
        setMessages((prevMessages) => [message, ...prevMessages]);
      });
    
      socket.on('typing_start', () => {
        setIsTyping(true);
      });
  
      socket.on('typing_stop', () => {
        setIsTyping(false);
      });
  
      return () => {
        socket.off('receive_message');
        socket.emit('leave_room', actualChatId);
        socket.off('typing_start');
        socket.off('typing_stop');
      };
    }
  }, [actualChatId]);

  useEffect(() => {
    console.log('Messages state:', messages);
  }, [messages]);

    // Function to get the other participant information
    useEffect(() => {
      getParticipant(actualChatId)
      .then((otherUser) => {
        setParticipant(otherUser)
      })
      .catch((err) => console.log(err))
    }, [actualChatId]);

    const handleSentMessage = (sentMessage) => {
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
    };

  return (
    <div className='w-[600px] h-full flex flex-col border-r border-r-[#2f3336]'>
      {/* Up: Profile information */}
      <div className='flex justify-between p-2 items-center'>
        <div className='flex items-center gap-2 hover:cursor-pointer'>
            {/* Profile Picture */}
            <div className='w-8 h-8 bg-blue-600 rounded-full'/>
            {/* Name */}
            <p>{participant && participant.username ? participant.username : 'Loading...'}</p>
        </div>
        {/* Information */}
        <div>
            <AiOutlineInfoCircle size={'1.2em'} className='hover:cursor-pointer'/>
        </div>
      </div>
      <hr />
      {/* Down: Chat */}
      <div className='h-[94.5%] flex flex-col justify-between '>
        <div className='flex-grow overflow-y-scroll'>
            <Chat messages={messages} 
                  currentUser={currentUser}/>
            {isTyping && (
                        <div className='flex flex-col items-start p-2'>
                        <div className='w-fit p-3 bg-gray-700 rounded-[30px] rounded-bl-sm'>
                              <p className='text-white'><BsThreeDots /></p>
                        </div>
                        <div>
                          <p className='text-xs pt-1 text-gray-500'>{participant.username} is typing...</p>
                        </div>
                      </div>
            )}

        </div>
        <hr />
        <div className='mt-2 mb-1'>
            <SendMessage 
              chatId={actualChatId}
              sender={currentUser}
              receiver={participant}
              onSentMessage={handleSentMessage}/>
        </div>
      </div>
    </div>
  )
}

export default Conversation
