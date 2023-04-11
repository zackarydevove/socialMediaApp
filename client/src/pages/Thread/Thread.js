import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineTwitter, AiOutlineArrowLeft } from 'react-icons/ai'
import TweetBlock from '../../components/Tweet/TweetBlock'
import MainThreadTweet from '../../components/Tweet/MainThreadTweet';
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import SearchBar from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import { getPost } from '../../api/post';
import Navbarsm from '../../components/More/Navbarsm';

function Thread() {
    const [post, setPost] = useState({});
    const [openNav, setOpenNav] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [update, setUpdate ] = useState(false);
    const { postId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
      console.log('postId in Thread:', postId);
      getPost(postId)
      .then((res) => {
        setPost(res);
        console.log('res in Thread:', res);
        console.log('post in Thread:', post);
      })
      .catch((err) => console.log(err));
    }, [postId, refresh, update]);

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
                <div className='flex items-center pl-3'>
                    <AiOutlineArrowLeft size={'1.5em'} className='hover:cursor-pointer' onClick={() => navigate(-1)}/>
                    <h1 className='max-sm:hidden text-xl font-bold p-3'>Tweet</h1>
                    <div className='sm:hidden w-screen flex justify-center items-center relative p-3'>
                        <AiOutlineTwitter size={'1.8em'} className='text-blue-500'/>
                    </div>
                </div>
                <div className='flex flex-col'>
                {post?._id ? (
                    <>
                        <MainThreadTweet post={post} setPost={setPost} setRefresh={setRefresh}/>

                        {post.replies?.reply?.map((postId, index) => (
                            <TweetBlock key={index} postId={postId} setUpdate={setUpdate} />
                        ))}
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                </div>
                <hr className='border-t-[#2f3336]'/>
                <div  className='bg-black h-12' />
            </div>
            
            <div className='max-lg:hidden p-3 ml-4'>
                <SearchBar />
                <Recommend />
                <Terms />
            </div>
    </div>
  )
}

export default Thread
