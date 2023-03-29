import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineCheck } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import SearchUserToDm from './SearchUserToDm';
import { getFollowedUsers } from '../../api/follow';
import { getParticipants } from '../../api/chat';
import socket from '../../socket';

function AddMember({
    setOpenAddMember, 
    user, 
    participants, 
    actualChatId,
}) {
    const [followedUsers, setFollowedUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]); // Change to array for groups chat

    
    useEffect(() => {
        if (user._id) {
          getFollowedUsers(user._id)
            .then((users) => {
              setFollowedUsers(users);
              setFilteredUsers(users);
            })
            .catch((err) => console.log('Error fetching followed users', err));
        }

      }, []);

    const handleSearch = e => {
        const trimmedQuery = e.target.value.trim().toLowerCase();
        if (trimmedQuery) {
          const filtered = followedUsers.filter(user =>
            user.username.toLowerCase().includes(trimmedQuery)
          );
          setFilteredUsers(filtered);
        } else {
          setFilteredUsers(followedUsers);
        }
    };
    const handleSelectUser = (user) => {
        // If user is already selected, remove them from the array
    if (selectedUsers.some((selected) => selected._id === user._id)) {
        setSelectedUsers((prevSelected) =>
          prevSelected.filter((selected) => selected._id !== user._id)
        );
      } else {
        // User is not selected, add them to the array
        setSelectedUsers((prevSelected) => [...prevSelected, user]);
      }
    };

  const handleDeleteSelectedUsers = (deletedUser) => {
      setSelectedUsers((prevSelected) =>
          prevSelected.filter((selected) => selected._id !== deletedUser._id)
      );
  };

    const handleAddNewMembers = () => {
        if (selectedUsers.length > 0) {
            const userIds = selectedUsers.map((user) => user._id);
            socket.emit('invite_users', { chatId: actualChatId, userIds });
            setOpenAddMember(false);
        }
  } ;

  return (
    <div className='z-40 fixed left-0 top-0 md:w-screen md:h-screen bg-blue-300 bg-opacity-20'>
        <div className='w-screen h-screen md:w-[600px] md:h-[650px] md:fixed md:left-[50%] md:translate-x-[-50%] md:top-16 z-30 bg-black opacity- md:rounded-2xl'>
            <div className='md:w-full md:h-full p-3 z-40' >
                {/* Up */}
                <div className='flex pl-1'>
                    <div className='flex flex-grow items-center'>
                        <RxCross1 size={'1.3em'} className='text-white hover:cursor-pointer'
                            onClick={() => setOpenAddMember(false)}/>
                        <p className='pl-5 text-xl'>Add new members</p>
                    </div>
                    <div className={`w-[85px] text-center p-2 rounded-3xl  ${selectedUsers.length > 0 ? 'bg-blue-500 hover:cursor-pointer' : 'bg-gray-500'} `} 
                        onClick={handleAddNewMembers}>Add</div>
                </div>
                {/* Mid: Search users to Dm */}
                <div>
                    {/* SearchBar */}
                    <div className='mt-3'>
                        <SearchUserToDm handleSearch={handleSearch}/>
                    </div>
                </div>
                <div className='p-1 flex'>
                    {
                        selectedUsers ?
                            selectedUsers.map((user) => (
                                <div className=' w-fit p-[0.15rem] flex items-center border border-[#2f3336] rounded-[20px] '>
                                    <div className='h-6 w-6 bg-blue-500 rounded-full'/>
                                    <p className='pl-2 pr-2'>{user.username}</p>
                                    <RxCross1 className='text-blue-500 hover:cursor-pointer'
                                        onClick={() =>  handleDeleteSelectedUsers(user)}/>
                                </div>
                            ))
                        : null
                    }

                    
                </div>
                {/* Bottom: Followed Users */}
                <div className='flex-col overflow-y-scroll scrollbar-hide'>
                    {
                        filteredUsers.map((followedUser) => {
                            // if followedUser is already in the chat, cannot add him
                            if (participants.some((participant) => participant._id === followedUser._id))  {
                                return (
                                    <div className='flex mt-3 p-3 items-center relative'
                                    key={followedUser._id}>
                                        <div className='flex flex-grow'>
                                            <div className='z-20 w-full h-full absolute top-0 left-0 bg-black bg-opacity-50'/>
                                            <div className='w-12 h-12 bg-blue-500 rounded-full'/>
                                            <div className='px-3' >
                                                <p>{followedUser.username}</p>
                                                <p className='text-gray-500'>@{followedUser.username}</p>
                                            </div>
                                        </div>
                                        <AiOutlineCheck className='text-blue-500' />
                                    </div>
                                )
                            } else {
                                return (
                                    <div className='flex mt-3 p-3 hover:bg-gray-500 hover:bg-opacity-20 hover:cursor-pointer'
                                    key={followedUser._id}
                                    onClick={() => handleSelectUser(followedUser)}>
                                        <div className='w-12 h-12 bg-blue-500 rounded-full'/>
                                        <div className='px-3'>
                                            <p>{followedUser.username}</p>
                                            <p className='text-gray-500'>@{followedUser.username}</p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddMember
