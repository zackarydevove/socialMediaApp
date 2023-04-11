import React from 'react'
import { useState, useEffect } from 'react';
import { AiOutlineTwitter } from 'react-icons/ai'
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import PostTweet from '../../components/Tweet/PostTweet';
import SearchBar from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import TweetBlock from '../../components/Tweet/TweetBlock';
import { getUser } from '../../api/auth';
import { getFeed } from '../../api/feed';
import Navbarsm from '../../components/More/Navbarsm';

function Feed() {
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState({});
    const [update, setUpdate] = useState(false);
    const [feedPosts, setFeedPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setFeedPosts([]);
        if (user._id) {
            getFeed(user._id, page)
            .then((newPosts) => {
                setFeedPosts((prevPosts) => [...prevPosts, ...newPosts]);
            })
            .catch((err) => console.log(err));
        }
    }, [user, page, update]);

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
        <div onScroll={handleScroll} className='font-opensans flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
            <Navbarsm />
            {openNav ? 
            <div>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} setUpdate={setUpdate}/> 
            </div>
            : 
            <div className='max-sm:hidden'>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} setUpdate={setUpdate} />
            </div>
            }
            <div className='flex flex-col h-screen max-sm:flex-grow relative sm:w-[600px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton setUpdate={setUpdate}/>
                </div>
                <div>
                    <h1 className='max-sm:hidden text-xl font-bold p-3'>Home</h1>
                    <div className='sm:hidden w-screen flex justify-center items-center relative p-3'>
                        <div className='h-8 w-8 bg-pp bg-cover bg-center rounded-full absolute top-3 left-3' onClick={() => setOpenNav(!openNav)} />
                        <AiOutlineTwitter size={'1.8em'} className='text-blue-500'/>
                    </div>
                    <div className='flex justify-center items-center'>
                            <h1 className='h-7 border-b-4 border-blue-500 font-bold'>Following</h1>
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>
                <div className='max-sm:hidden'>
                    <PostTweet setUpdate={setUpdate}/>
                </div>
                <div className='flex-grow overflow-y-scroll scrollbar-hide'>
                    {
                    feedPosts ?
                        feedPosts.map((post, index) => (
                            <TweetBlock key={index} postId={post._id} setUpdate={setUpdate}/>
                        ))
                    : null
                }
                </div>
                <hr className='sm:hidden border-t-[#2f3336]'/>
                <div  className='sm:hidden bg-black h-12' />
            </div>
            
            <div className='max-lg:hidden p-3 ml-4'>
                <SearchBar />
                <Recommend />
                <Terms />
            </div>
    </div>
  )
}

export default Feed
