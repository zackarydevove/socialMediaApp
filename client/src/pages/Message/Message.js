import React from 'react'
import { useState, useEffect } from 'react';
import { BiMessageAdd } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import Contact from '../../components/Chat/Contact';
import Conversation from '../../components/Chat/Conversation';
import EmptyConversation from '../../components/Chat/EmptyConversation';
import AddDM from '../../components/Chat/AddDM';
import { createChat, getChats } from '../../api/chat';
import { getUser } from '../../api/auth';
import AddMember from '../../components/Chat/AddMember';
import { useNavigate } from 'react-router-dom';
import Navbarsm from '../../components/More/Navbarsm';


// Message page, fetch user conversations and display them
function Message() {
    const [openNav, setOpenNav] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openAddMember, setOpenAddMember] = useState(false);
    const [updateMessagePage, setUpdateMessagePage] = useState(false);
    const [user, setUser] = useState({});
    const [chats, setChats] = useState([]);
    const [actualChatId, setActualChatId] = useState('');
    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUser()
        .then((res) => setUser(res))
        .catch((err) => console.log(err));
    }, [updateMessagePage, actualChatId])
    
    // GetChats sorted in last message
    useEffect(() => {
        getChats(user._id)
        .then((chatsIds) => { 
            setChats(chatsIds);
            console.log('chats in message:', chats);
        })
        .catch((err) => console.log(err));
    }, [user, actualChatId]);


    function onCreateChat(selectedUsers) {
        const participants = [user._id, ...selectedUsers.map(user => user._id)];
        createChat(participants)
        .then((chat) => {
            setParticipants([]);
            setMessages([]);
            setActualChatId(chat._id);
        })
        .catch((err) => console.log(err));
      }


      return (
        <div className='font-opensans flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
            {
                actualChatId ? null 
                : <Navbarsm />
             }
            {
                openAddMember ?
                < AddMember 
                setOpenAddMember={setOpenAddMember}
                user={user}
                participants={participants}
                actualChatId={actualChatId}/>
                : null
            }
            {openNav ? 
            <div>
                <Navbar openNav={openNav} setOpenNav={setOpenNav}/> 
            </div>
            : 
            <div className='max-sm:hidden'>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} />
            </div>
            }

            <div className='sm:hidden'>
                <PostTweetButton/>
            </div>
            
            <div className='flex flex-col max-sm:flex-grow relative lg:min-w-[388px] sm:min-w-[590px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                {
                    window.innerWidth <= 1024 && actualChatId ?
                    <div className='h-screen'>
                        <Conversation 
                            actualChatId={actualChatId}
                            setActualChatId={setActualChatId} 
                            currentUser={user}
                            messages={messages}
                            setMessages={setMessages} 
                            setUpdateMessagePage={setUpdateMessagePage}
                            setOpenAddMember={setOpenAddMember}
                            participants={participants}
                            setParticipants={setParticipants}/>
                    </div>
                    :
                <div>
                    <div>
                        <div className='flex justify-between  p-3 pb-0'>
                            <div className='flex gap-2'>
                                <AiOutlineArrowLeft size={'1.5em'} className='sm:hidden'
                                    onClick={() => navigate(-1)}/>
                                <h1 className='text-xl font-bold'>Messages</h1>
                            </div>
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
                        <hr className='mt-2 border-t-[#2f3336]'/>
                    </div>
                    <div className='overflow-y-scroll scrollbar-hide max-sm:h-[80vh]'>
                    {
                        chats ? chats.map((chatId) => {
                            return (
                                <Contact 
                                    chatId={chatId}
                                    setActualChatId={setActualChatId}
                                    actualChatId={actualChatId}
                                    setMessages={setMessages}/>
                            )
                        })
                        : 'Loading...'
                    }
                    </div>
                </div>
                }
            </div>
            <div className='max-lg:hidden'>
                {
                    window.innerWidth > 1024 && actualChatId ? 
                    <Conversation 
                        actualChatId={actualChatId}
                        setActualChatId={setActualChatId} 
                        currentUser={user}
                        messages={messages}
                        setMessages={setMessages} 
                        setUpdateMessagePage={setUpdateMessagePage}
                        setOpenAddMember={setOpenAddMember}
                        participants={participants}
                        setParticipants={setParticipants}/>
                    : <EmptyConversation />
                }              
            </div>



        </div>
  )
}

export default Message
