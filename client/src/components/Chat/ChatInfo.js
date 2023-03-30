import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';

function ChatInfo(
  {openChatInfo,
     setOpenChatInfo,
     participants,
     currentUser,
     actualChatId,
     setOpenAddMember,
     setActualChatId,
     setMessages}
  ) {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    socket.emit('quit_chat', { chatId: actualChatId, userId: currentUser._id });
    setOpenChatInfo(false);
    setActualChatId('');
    setMessages([]);
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Up */}
      <div className='p-3 flex items-center'>
        <AiOutlineArrowLeft size={'1.5em'} className='hover:cursor-pointer'
          onClick={() => setOpenChatInfo(false)}/>
        <h1 className='text-2xl pl-8'>Group informations</h1>
      </div>

      {/* Middle */}
      <div className='py-3 flex flex-col flex-grow'>

        {/* Group Name */}
        <div className='flex px-3 pb-5'>
          <div className='flex items-center flex-grow'>
            <div className='w-12 h-12 bg-pp bg-cover rounded-full'/>
            <p className='pl-3 font-bold text-lg'>Group name</p>
          </div>
          <div className='flex items-center'>
            <button className='text-blue-600 hover:underline'>Edit</button>
          </div>
        </div>

        {/* Members */}
        <hr className='border-t-[#2f3336]'/>
        <div className='overflow-y-scroll scrollbar-hide'>
          <h1 className='font-bold text-2xl p-3'>Members</h1>

          {/* Current User */}
          <div className='flex p-3 items-center hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-20'>
                {/* Name */}
                <div className='flex flex-grow'
                    onClick={() => navigate(`/profile/${currentUser.username}`)}>
                  <div className='w-12 h-12 bg-pp bg-cover rounded-full'/>
                  <div className='pl-3'>
                    <p>{currentUser.twittername}</p>
                    <p className='text-gray-500'>@{currentUser.username}</p>
                  </div>
                </div>
              </div>

          {/* One member */}
          {
            participants.map((member) => (
              <div className='flex p-3 items-center hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-20'>
                {/* Name */}
                <div className='flex flex-grow'
                  onClick={() => navigate(`/profile/${member.username}`)}>
                  <div className='w-12 h-12 bg-pp bg-cover rounded-full'/>
                  <div className='pl-3'>
                    <p>{member.twittername}</p>
                    <p className='text-gray-500'>@{member.username}</p>
                  </div>
                </div>
                <button className='py-1 px-5 bg-white text-black rounded-3xl'>Follow</button>
              </div>
            ))
          }

        </div>

      </div>
        {/* Bottom */}
          <hr className='border-t-[#2f3336]'/>
        <div className='w-full flex flex-col items-center'>
          <div className='w-full py-5 flex justify-center items-center hover:bg-blue-500 hover:bg-opacity-20'>
            <p className='text-blue-500 hover:cursor-pointer hover:underline'
              onClick={() => setOpenAddMember(true)}>Add people in the chat</p>
          </div>
          <div className='w-full py-5 flex justify-center items-center hover:bg-red-500 hover:bg-opacity-20'>
            <p className='text-red-500 hover:cursor-pointer hover:underline'
              onClick={handleLeaveChat}>Leave the chat</p>
          </div>
        </div>

    </div>
  )
}

export default ChatInfo
