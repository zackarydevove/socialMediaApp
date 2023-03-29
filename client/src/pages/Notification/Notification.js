import React from 'react'
import { useState, useEffect } from 'react';
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import SearchBar from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import NotificationPost from '../../components/Notification/NotificationPost';
import Navbarsm from '../../components/More/Navbarsm';
import { resetNotificationCount } from '../../api/user';
import { getUser } from '../../api/auth';

function Notification() {
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    // Reset notification count to zero
    useEffect(() => {
        resetNotificationCount()
        .then((res) => {
            setUser(res)
            setLoading(false);
            console.log('notification reset');
        })
        .catch((err) => console.log(err));
    }, [])

    console.log(user);

    return (
        <div className='font-opensans flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
            <Navbarsm />
            {openNav ? 
            <div>
                <Navbar openNav={openNav} setOpenNav={setOpenNav}/> 
            </div>
            : 
            <div className='max-sm:hidden'>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} />
            </div>
            }
            <div className='flex flex-col max-sm:h-[95vh] max-sm:flex-grow relative sm:w-[600px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton/>
                </div>
                <div>
                    <h1 className='max-sm:hidden text-xl font-bold p-3'>Notifications</h1>
                    <div className='sm:hidden w-screen flex justify-center items-center relative p-3'>
                        <div className='h-8 w-8 bg-blue-900 rounded-full absolute top-3 left-3' onClick={() => setOpenNav(!openNav)} />
                        <AiOutlineTwitter size={'1.8em'} className='text-blue-500'/>
                    </div>
                    <div className='flex justify-center items-center'>
                            <h1 className='h-7 border-b-4 border-blue-500 font-bold'>All</h1>
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>
                <div className='max-sm:hidden'>
                </div>
                <div className='flex-grow overflow-y-scroll'>
                    {
                        loading ?
                        <div>loading...</div>
                        :
                        user.notifications.map((notification, index) => (
                            <NotificationPost key={index} notification={notification}/>
                        ))
                    }
                </div>
            </div>
            
            <div className='max-lg:hidden p-3 ml-4'>
                <SearchBar />
                <Recommend />
                <Terms />
            </div>
    </div>
  )
}

export default Notification