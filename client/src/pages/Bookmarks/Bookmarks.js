import React from 'react'
import { useState, useEffect } from 'react';
import { BsFillHouseFill, BsFillBellFill, BsThreeDots } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import SearchBar from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import { getUser } from '../../api/auth';
import TweetBlock from '../../components/Tweet/TweetBlock';
import Navbarsm from '../../components/More/Navbarsm';

function Bookmarks() {
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser()
        .then((user) => setUser(user))
        .catch((err) => console.log(err));
    }, [])

    console.log('user in bookmark:', user);

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
            <div className='max-sm:flex-grow relative sm:w-[600px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton/>
                </div>
                <div>
                    {/* left */}
                    <div className='flex justify-between p-3'>
                        <div className='flex flex-col'>
                            <h1 className='text-xl font-bold'>Bookmarks</h1>
                            <p className='text-sm text-gray-500'>@{user.username}</p>
                        </div>
                        {/* Right */}
                        {/* <BsThreeDots className='hover:cursor-pointer' /> */}
                    </div>
                    <hr className='mt-2 border-t-[#2f3336]' />
                </div>
                <div>
                {
                    user?.bookmarks?.map((postId, index) => {
                        console.log('postid in bookmarks:', postId);
                        return (
                            <TweetBlock 
                            key={index}
                            postId={postId}
                            />
                        )
                    })
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

export default Bookmarks
