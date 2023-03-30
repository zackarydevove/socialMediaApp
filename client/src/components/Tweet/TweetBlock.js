import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BsThreeDots, BsChat, BsBookmark } from 'react-icons/bs';
import { IoMdRepeat } from 'react-icons/io';
import { AiOutlineHeart, AiOutlineUpload } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Reply from './Reply';
import { getUser, getCreator } from '../../api/auth';
import { getPost, likeTweet, deleteTweet, retweet, bookmark } from '../../api/post';
import { tweetCreatedDate } from '../../utils/tweetCreatedDate';

function TweetBlock({postId, setUpdate}) {
    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [creator, setCreator] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [openReply, setOpenReply] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();

    // Get the post
    useEffect(() => {
        console.log('postId in tweetblock:', postId);
        if (postId) {
            getPost(postId)
            .then((res) => setPost(res))
            .catch((err) => console.log('Error while getting tweet', err));
        } else {
            setPost({});
        }
    }, [postId, refresh]);

    // Get the creator of the post
    useEffect(() => {
        getCreator(post.creator)
        .then((res) => setCreator(res))
        .catch((err) => console.log(err));
    }, [post]);

    // Get the current user logged in
    useEffect(() => {
        getUser()
        .then((res) => setUser(res))
        .catch((err) => console.log('Error during fetching user', err));
    }, [post]);

    // Like
    const handleLikeTweet = () => {
        likeTweet(postId)
        .then((res) => {
            setRefresh((prev) => !prev);
        })
        .catch((err) => console.log('Error during like', err));
    }

    // Delete
    const handleDeleteTweet = () => {
        deleteTweet(postId)
        .then((res) => {
            if (res === 'Post deleted') {
                setPost({});
                setUpdate((prev) => !prev); 
            }
            setOpenDelete(false);
        })
        .catch((err) => console.log('Error during delete', err));
    }

    // Retweet
    const handleRetweet = () => {
        retweet(postId)
        .then((res) => {
            setRefresh((prev) => !prev);
        })
        .catch((err) => console.log('Error during retweet', err));
    }

    const handleBookmark = () => {
        bookmark(postId)
        .then((res) => {
            setRefresh((prev) => !prev);
            setOpenOptions(false);
            console.log('Bookmark successful');
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className='font-opensans hover:cursor-pointer relative'>
    
            { openReply ? <Reply user={user} post={post} setOpenReply={setOpenReply} setRefresh={setRefresh}/> : null }
    
            <div className='absolute h-full w-full'
                onClick={() => navigate(`/tweet/${post._id}`)}>
            </div>

            <div className='max-w-screen flex p-2'>
                {/* Left */}
                <div className='p-1 pr-2 z-10'>
                    <div className='w-12 h-12 bg-pp bg-cover rounded-full hover:cursor-pointer'
                        onClick={() => navigate(`/profile/${creator.username}`)}/>
                </div>
    
                {/* Right */}
                <div className='w-full flex flex-col'>
                    {/* up */}
                    <div className='w-full flex justify-between items-center'>
                        {/* left */}
                        <div className='flex'>
                            <p className='text-ellipsis overflow-hidden hover:cursor-pointer z-10'
                                onClick={() => navigate(`/profile/${creator.username}`)}>{creator.twittername}</p>
                            <p className='ml-1 text-gray-500 text-ellipsis overflow-hidden z-10'
                                onClick={() => navigate(`/profile/${creator.username}`)}>@{creator.username}</p>
                            <p className='ml-1 text-gray-500 z-10'>· {tweetCreatedDate((new Date(post.createdAt)))}</p>
                        </div>
    
                        {/* right */}
                        <div className='relative'>
                            <div className='z-20 hover:shadow-[0px_0px_1px_7px_rgba(29,155,240,0.2)] hover:bg-[#1d9bf0] hover:bg-opacity-20 rounded-full'>
                                <BsThreeDots className='hover:cursor-pointer hover:text-[#1d9bf0] z-10' 
                                    onClick={() => {
                                        setOpenDelete(!openDelete);
                                        setOpenOptions(false);
                                    }}/>
                            </div>
                            {
                                openDelete ?
                                <div className='w-[150px] flex justify-center items-center p-3 bg-black border border-[#2f3336] shadow-[0px_0px_5px_-1px_rgba(0,0,0,0.3)] shadow-white rounded-lg hover:cursor-pointer z-20 hover:bg-gray-700 transition absolute top-0 translate-x-[-110%] text-red-700' 
                                  onClick={handleDeleteTweet}>
                                    <FiTrash2 className='flex-shrink'/>
                                    <p className='flex-grow pl-3'>Delete</p>
                                </div>
                                
                                : null
                            }
                        </div>
                    </div>
    
                    {/* middle */}
                    <div className='w-4/5 z-10'>
                        <p className='break-words z-10'
                            onClick={() => navigate(`/tweet/${post._id}`)}>{post.content ? post.content : post.content}</p>
                    </div>
    
                    {/* bottom */}
                    <div className='flex justify-between mt-2'>
                        <div className='w-1/2 flex justify-between text-gray-500'>
                            <div className='flex items-center gap-2'>
                                <div className='z-20 hover:shadow-[0px_0px_1px_7px_rgba(29,155,240,0.2)] hover:bg-[#1d9bf0] hover:bg-opacity-20 rounded-full'>
                                    <BsChat size={'1.2em'} className='hover:cursor-pointer hover:text-[#1d9bf0] z-20' 
                                        onClick={() => setOpenReply(true)}/>
                                </div>
                                <div>
                                    <p>{post && post.replies && post.replies.count && post.replies.count > 0 ? post.replies.count : null}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 '>
                                <div className='z-20 hover:shadow-[0px_0px_1px_7px_rgba(0,186,124,0.20)] hover:bg-[#00ba7c] hover:bg-opacity-20 rounded-full'>
                                    <IoMdRepeat size={'1.2em'} className={`hover:cursor-pointer hover:text-[#00ba7c] z-20 ${post && post.retweet && post.retweet.users && post.retweet.users.includes(user._id) ? 'text-green-700' : 'text-gray-500'}`}
                                        onClick={handleRetweet}/>
                                </div>
                                <div>
                                    <p className={`${post && post.retweet && post.retweet.users && post.retweet.users.includes(user._id) ? 'text-green-700' : 'text-gray-500'}`}>{post && post.retweet && post.retweet.count && post.retweet.count > 0 ? post.retweet.count : null}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='z-20 hover:shadow-[0px_0px_1px_7px_rgba(249,24,128,0.2)] hover:bg-[#f91880]  hover:bg-opacity-20 rounded-full'>
                                    <AiOutlineHeart size={'1.2em'} className={`hover:cursor-pointer hover:text-[#f91880] z-20 transition ${post && post.likes && post.likes.users && post.likes.users.includes(user._id) ? 'text-red-700' : 'text-gray-500'}`}  
                                    onClick={handleLikeTweet}/>
                                </div>
                                    <div>
                                        <p className={`${post && post.likes && post.likes.users && post.likes.users.includes(user._id) ? 'text-red-700' : 'text-gray-500'}`}>{post && post.likes && post.likes.count && post.likes.count > 0 ? post.likes.count : null}</p>
                                    </div>
                            </div>
                        </div>
                        <div className='z-20 hover:shadow-[0px_0px_1px_7px_rgba(29,155,240,0.2)] hover:bg-[#1d9bf0] hover:bg-opacity-20 rounded-full'>
                            <AiOutlineUpload size={'1.2em'} className='hover:cursor-pointer hover:text-[#1d9bf0] z-20'  
                                onClick={() => {
                                    setOpenDelete(false);
                                    setOpenOptions(!openOptions);
                                }}/>

                            {
                                openOptions ?
                                <div className='flex justify-center items-center p-3 bg-black border border-[#2f3336] shadow-[0px_0px_5px_-1px_rgba(0,0,0,0.3)] shadow-white rounded-lg hover:cursor-pointer z-20 hover:bg-gray-700 transition absolute bottom-4 translate-x-[-110%] text-white' 
                                  onClick={handleBookmark}>
                                    <BsBookmark className='flex-shrink' />
                                    <p className='flex-grow pl-3 whitespace-nowrap max-w-screen'>{user.bookmarks.includes(post._id) ? "Remove Tweet from Bookmarks" : "Bookmark"}</p>
                                </div>
                                
                                : null
                            }
                        </div>
                    </div>
    
                </div>
            </div>
            <hr className='mt-2 border-t-[#2f3336]'/>
        </div>
      )
    }

export default TweetBlock
