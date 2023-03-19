import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import TweetBlock from '../../components/TweetBlock'
import PostTweetButton from '../../components/PostTweetButton'
import Navbar from '../../components/Navbar'
import { useState } from 'react';
import PostTweet from '../../components/PostTweet';
import Search from '../../components/SearchBar';
import Recommend from '../../components/Recommend';
import Terms from '../../components/Terms';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../../components/ProfileInfo';

function Profile() {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate();

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
            <div className='max-sm:flex-grow relative sm:w-[600px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton/>
                </div>
                <div>
                    <h1 className='max-sm:hidden text-xl font-bold p-3'>Home</h1>
                    <div className='sm:hidden w-screen flex items-center relative p-3'>
                        <div className='w-14 h-9'>
                            <AiOutlineArrowLeft size={'1.5em'} onClick={() => navigate('/home')}/>
                        </div>
                            
                        <div>
                            <h1>Zackary Devove</h1>
                            <p className='text-sm text-gray-500'>25 Tweets</p>
                        </div>
                    </div>
                    <div>
                        <ProfileInfo />
                    </div>
                    <div className='flex justify-around items-center'>
                            <h1 className='h-7 border-b-4 border-blue-500 font-bold'>Tweets</h1>
                            <h1 className='h-7 font-bold'>Replies</h1>
                            <h1 className='h-7 font-bold'>Media</h1>
                            <h1 className='h-7 font-bold'>Likes</h1>
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>
                <TweetBlock />
            </div>
            
            <div className='max-lg:hidden p-3 ml-4'>
                <Search />
                <Recommend />
                <Terms />
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

export default Profile
