import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import Chat from './Chat';
import SendMessage from './SendMessage';
import { getMessages, getParticipants } from '../../api/chat';
import { useEffect, useState } from 'react';
import socket from '../../socket';
import ChatInfo from './ChatInfo';
import { useNavigate } from 'react-router-dom';

// One conversation/chat, fetch the messages and show them in Chat, send Messages aswell
function Conversation({actualChatId, setActualChatId, currentUser, messages, setMessages, setUpdateMessagePage, setOpenAddMember, participants, setParticipants}) {
  const [typingUsers, setTypingUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [openChatInfo, setOpenChatInfo] = useState(false);

  const navigate = useNavigate();

  // Fetch the messages of the chat
  useEffect(() => {
    if (actualChatId) {
      getMessages(actualChatId, page)
        .then((msgs) => {
          if (msgs.length > 0) {
            setMessages((prevMsgs) => [...prevMsgs, ...msgs])
          }
        })
        .catch((err) => console.log(err));
    }
  }, [actualChatId, page]);

  // Socket
  useEffect(() => {
    if (actualChatId) {
      // Set up socket listeners
      socket.emit('join_room', actualChatId);
  
      socket.on('receive_message', (message) => { 
        console.log('Message received:', message);
        setMessages((prevMessages) => [message, ...prevMessages]);
      });

      socket.on('message_deleted', (deletedMessageId) => {
        console.log('Message deleted:', deletedMessageId);
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== deletedMessageId));
      });

      socket.on('quit_chat', (chatId, userId) => {
        console.log('User', userId, 'left chat', chatId);
        if (userId === currentUser._id) {
          setParticipants([]);
          setActualChatId('');
          setMessages([]);
          setUpdateMessagePage((prev) => !prev);
        } else {
          setParticipants((prevParticipants) => prevParticipants.filter((partUser) => partUser !== userId))
        }
      })

      socket.on('chat_deleted', (chatId) => {
        console.log('Chat deleted', chatId);
        setParticipants([]);
        setActualChatId('');
        setMessages([]);
        setUpdateMessagePage((prev) => !prev);
      })

      socket.on('joined_chat', (chatId, userIds) => {
        setParticipants((prev) => [...prev, ...userIds])
        setUpdateMessagePage((prev) => !prev);
      })
    
      socket.on('typing_start', (typingUserUsername) => {
        setTypingUsers((prevTypingUsers) => {
          console.log('user typing:', typingUserUsername);
          console.log('typing users:', typingUsers)
          // If the typing user is not in the array yet, add him
          if (!prevTypingUsers.includes(typingUserUsername)) {
            console.log('test');
            return [...prevTypingUsers, typingUserUsername];
          }
          return prevTypingUsers;
        });  
      });
       
      socket.on('typing_stop', (typingUserUsername) => {
        setTypingUsers((prevTypingUsers) => {
          return prevTypingUsers.filter((username) => username !== typingUserUsername);
        });
      });
  
      return () => {
        socket.off('receive_message');
        socket.emit('leave_room', actualChatId);
        socket.off('typing_start');
        socket.off('typing_stop');
        socket.off('message_deleted'); // Clean up the listener
      };
    }
  }, [actualChatId]);

  // Function to get the other participants information
  useEffect(() => {
    getParticipants(actualChatId)
    .then((otherUsers) => {
      setParticipants(otherUsers)
    })
    .catch((err) => console.log(err))
  }, [actualChatId]);

  const handleSentMessage = (sentMessage) => {
    setMessages((prevMessages) => [...prevMessages, sentMessage]);
  };
 
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
  
    // If we are at the top of the page and we have a multiplication of 20,
    // Then add 1 to the page and fetch the next 20 messages
    // If the last fetch we had less than 20 messages then we fetch the last message
    if ((scrollTop * -1) + clientHeight + 10 >= scrollHeight && messages.length % 20 === 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  console.log(openChatInfo)

  return (
    <div className='w-[600px] h-full flex flex-col border-r border-r-[#2f3336]'>
            {
              openChatInfo ? (
                <ChatInfo  
                  openChatInfo={openChatInfo} 
                  setOpenChatInfo={setOpenChatInfo}
                  participants={participants}
                  currentUser={currentUser}
                  actualChatId={actualChatId}
                  setOpenAddMember={setOpenAddMember}/>
                ) : (
                  <>
                  {/* Up: Profile information */}
                  <div className='flex justify-between p-2 items-center'>
                    <div className='flex items-center gap-2'>
                        {/* Profile Picture */}
                        {/* Name */}
                        {
                          participants && participants.length > 0 &&
                          participants.map((participant, index) => (
                            <div className='flex items-center gap-2 hover:cursor-pointer'
                              onClick={() => navigate(`/profile/${participant.username}`)}>
                              <div className='w-8 h-8 bg-blue-600 rounded-full'/>
                              <p key={index}>{participant.username} {participants.length > 1 && index < participants.length - 1 ? ',' : ''}</p>
                            </div>
                          ))
                        }
                    </div>
                    {/* Information */}
            
                    <div className='hover:bg-gray-300 hover:bg-opacity-40 rounded-full'
                      onClick={() => setOpenChatInfo(true)}>
                        <AiOutlineInfoCircle size={'1.2em'} className='hover:cursor-pointer'/>
                    </div>
                  </div>
                  <hr className='border-t-[#2f3336]'/> 
                {/* Down: Chat */}
                <div className='h-[94.5%] flex flex-col justify-between '>
                  <div  className='flex-grow overflow-y-scroll scrollbar-hide'>
                      <Chat messages={messages} 
                            currentUser={currentUser}
                            handleScroll={handleScroll}/>
                      {typingUsers.length > 0 &&  (
                                  <div className='flex flex-col items-start p-2'>
                                    <div className='w-fit p-3 bg-gray-700 rounded-[30px] rounded-bl-sm'>
                                          <BsThreeDots />
                                    </div>
                                    <div>
                                      {typingUsers.map((typingUserId) => {
                                        const typingUser = participants.find(
                                          (participant) => participant._id === typingUserId
                                        );
                                        return (
                                          typingUser && (
                                            <p key={typingUserId} className="text-xs pt-1 text-gray-500">
                                              {typingUser.username} is typing...
                                            </p>
                                          )
                                        );
                                      })}
                                    </div>
                                  </div>
                      )}
                  </div>
                  <hr className='border-t-[#2f3336]'/>
                  <div className='mt-2 mb-1'>
                      <SendMessage 
                        chatId={actualChatId}
                        sender={currentUser}
                        receiver={participants} 
                        onSentMessage={handleSentMessage}/>
                  </div>
                </div>
                </>
              )
            }
    </div>
  )
}

export default Conversation
