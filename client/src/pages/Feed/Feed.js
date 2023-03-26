import React from 'react'
import { useState, useEffect } from 'react';
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import PostTweet from '../../components/Tweet/PostTweet';
import SearchBar from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import TweetBlock from '../../components/Tweet/TweetBlock';
import { getUser } from '../../api/auth';
import { getFeed } from '../../api/feed';

function Feed() {
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState({});
    const [feedPosts, setFeedPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log('step1 user._id:', user._id);
        if (user._id) {
            getFeed(user._id, page)
            .then((newPosts) => {
                setFeedPosts((prevPosts) => [...prevPosts, ...newPosts]);
            })
            .catch((err) => console.log(err));
        }
    }, [user, page]);

    useEffect(() => {
        getUser()
        .then((res) => {
            setUser(res);
        })
        .catch((err) => console.log(err));
    }, [])

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div onScroll={handleScroll} className='flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
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
                    <div className='sm:hidden w-screen flex justify-center items-center relative p-3'>
                        <div className='h-8 w-8 bg-blue-900 rounded-full absolute top-3 left-3' onClick={() => setOpenNav(!openNav)} />
                        <AiOutlineTwitter size={'1.8em'} className='text-blue-500'/>
                    </div>
                    <div className='flex justify-center items-center'>
                            <h1 className='h-7 border-b-4 border-blue-500 font-bold'>Following</h1>
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>
                <div className='max-sm:hidden'>
                    <PostTweet />
                </div>
                <div>
                    {
                    feedPosts ?
                        feedPosts.map((post, index) => (
                            <TweetBlock key={index} post={post} />
                        ))
                    : null
                }
                </div>
            </div>
            
            <div className='max-lg:hidden p-3 ml-4'>
                <SearchBar />
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

export default Feed
