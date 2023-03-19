import React from 'react'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { BiMessageAdd } from 'react-icons/bi';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import TweetBlock from '../../components/TweetBlock'
import PostTweetButton from '../../components/PostTweetButton'
import Navbar from '../../components/Navbar'
import { useState } from 'react';
import PostTweet from '../../components/PostTweet';
import SearchBar from '../../components/SearchBar';
import Recommend from '../../components/Recommend';
import Terms from '../../components/Terms';
import Contact from '../../components/Contact';
import Conversation from '../../components/Conversation';

function Message() {
    const [openNav, setOpenNav] = useState(false);

    console.log(openNav);

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
                        <BiMessageAdd  size={'1.5em'} className='hover:cursor-pointer' />
                    </div>
                    <div className='flex justify-center items-center'>
                            <SearchBar SearchPage={true} placeHolder='Search Direct Messages'  />
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>
                <Contact />
            </div>
            <div className='max-lg:hidden'>
                <Conversation />
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
