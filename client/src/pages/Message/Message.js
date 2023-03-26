import React from 'react'
import { useState, useEffect } from 'react';
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { BiMessageAdd } from 'react-icons/bi';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import SearchBar from '../../components/More/SearchBar';
import Contact from '../../components/Chat/Contact';
import Conversation from '../../components/Chat/Conversation';
import EmptyConversation from '../../components/Chat/EmptyConversation';
import AddDM from '../../components/Chat/AddDM';
import { createChat, getChats } from '../../api/chat';
import { getUser } from '../../api/auth';

// Message page, fetch user conversations and display them
function Message() {
    const [openNav, setOpenNav] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [updateMessagePage, setUpdateMessagePage] = useState(false);
    const [user, setUser] = useState({});
    const [chats, setChats] = useState([]);
    const [actualChatId, setActualChatId] = useState('');

    useEffect(() => {
        getUser()
        .then((res) => setUser(res))
        .catch((err) => console.log(err));
    }, [updateMessagePage])

    useEffect(() => {
        getChats(user._id)
        .then((chatsIds) => { 
            setChats(chatsIds);
        })
        .catch((err) => console.log(err));
    }, [user]);

    function onCreateChat(selectedUser) {
        const participants = [user._id, selectedUser._id];
        createChat(participants)
        .then((chat) => {
            console.log('Chat correctly created');
            setUpdateMessagePage(!updateMessagePage);
        })
        .catch((err) => console.log(err));
      }

      return (
        <div className='flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
            {openNav ? 
            <div>
                <Navbar openNav={openNav} setOpenNav={setOpenNav}/> 
            </div>
            : 
            <div className='max-sm:hidden'>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} />
            </div>
            }
            <div className='max-sm:flex-grow relative sm:w-[388px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton/>
                </div>
                <div>
                    <div className='flex justify-end sm:justify-between p-3'>
                        <h1 className='max-sm:hidden text-xl font-bold'>Messages</h1>
                        {/* onClick display the user's follow to dm */}
                        <BiMessageAdd  size={'1.5em'} className='hover:cursor-pointer'
                            onClick={() => setOpenSearch(true)} />
                            {
                                openSearch ?
                                <AddDM 
                                    openSearch={openSearch} 
                                    setOpenSearch={setOpenSearch} 
                                    onCreateChat={onCreateChat}
                                    user={user}
                                    />
                                : null
                            }
                    </div>
                    <div className='flex justify-center items-center'>
                            <SearchBar SearchPage={true} placeHolder='Search Direct Messages'  />
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>
                {
                    chats ? chats.map((chatId) => {
                        return (
                            <Contact 
                                chatId={chatId}
                                setActualChatId={setActualChatId}/>
                        )
                    })
                    : 'Loading...'
                }
            </div>
            <div className='max-lg:hidden'>
                {
                    actualChatId ? 
                    <Conversation actualChatId={actualChatId} currentUser={user}/>
                    : <EmptyConversation />
                }
            </div>

            <div className='sm:hidden'>
                <hr className='border-t-[#2f3336]'/>
                <div className='flex justify-around items-center p-3'>
                    <BsFillHouseFill size={'1.5em'} className='hover:text-slate-500' />
                    <ImSearch size={'1.5em'} className='hover:text-slate-500'/>
                    <BsFillBellFill size={'1.5em'} className='hover:text-slate-500'/>
                    <FaEnvelope size={'1.5em'} className='hover:text-slate-500'/>
                </div>
            </div>
        </div>
  )
}

export default Message
