import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BsThreeDots, BsChat, BsBookmark } from 'react-icons/bs';
import { IoMdRepeat } from 'react-icons/io';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Reply from './Reply';
import { getUser } from '../../api/auth';
import { getPost, likeTweet, deleteTweet, retweet } from '../../api/post';
import { formatDate } from '../../utils/formatDate';

function MainThreadTweet(props) {
    const [user, setUser] = useState({});
    const [post, setPost] = useState(props.post || {}); 
    const [openDelete, setOpenDelete] = useState(false);
    const [openReply, setOpenReply] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (props.postId) {
            getPost(props.postId)
            .then((res) => setPost(res))
            .catch((err) => console.log('Error while getting tweet', err));
        } else {
            setPost(props.post || {});
        }
    }, [])

    useEffect(() => {
        getUser()
        .then((res) => setUser(res))
        .catch((err) => console.log('Error during fetching user', err));
    }, [post]);

    const handleLikeTweet = () => {
        likeTweet(props.postId)
        .then((res) => setPost(res))
        .catch((err) => console.log('Error during like', err));
    }

    const handleDeleteTweet = () => {
        console.log('DELETE THIS ID:', props.postId);
        deleteTweet(props.postId)
        .then((res) => {
            setPost({});
            props.setUpdate(!props.update);
            setOpenDelete(false);
        })
        .catch((err) => console.log('Error during delete', err));
    }
    
    const handleRetweet = () => {
        retweet(props.postId)
        .then((res) => {
            console.log('okay');
        })
        .catch((err) => console.log('Error during retweet', err));
    }

    return (
        <div className='hover:cursor-pointer relative'>
    
            { openReply ? <Reply post={post} openReply={openReply} setOpenReply={setOpenReply}/> : null }
    
            <div className='absolute h-full w-full'
                onClick={() => navigate(`/tweet/${post._id}`)}>
            </div>

            <div className='max-w-screen  flex flex-col p-2 pb-0'>
                {/* Up */}
                <div className='w-full flex'>

                    <div className='p-1 pr-2 z-10 flex flex-grow'>
                        <div className='w-12 h-12 bg-blue-500 rounded-full hover:cursor-pointer'/>

                        <div className='flex flex-col pl-2'>
                            <p className='text-ellipsis overflow-hidden hover:cursor-pointer z-10'>{post.username || 'abc'}</p>
                            <p className='text-gray-500 text-ellipsis overflow-hidden z-10'>{post.username || 'abc'}</p>
                        </div>
                    </div>
                    <div className='h-fit z-20 hover:shadow-[0px_0px_1px_7px_rgba(29,155,240,0.2)] hover:bg-[#1d9bf0] hover:bg-opacity-20 rounded-full'>
                        <BsThreeDots className='hover:cursor-pointer hover:text-[#1d9bf0] z-10 ' 
                            onClick={() => setOpenDelete(!openDelete)} />
                    </div>
                    <div className='relative'>
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
    
                {/* Down */}
                <div className='w-full flex flex-col px-2'>
    
                    {/* up (content) */}
                    <div className='w-4/5 z-10 pt-2'>
                        <p className='break-words z-10'
                            onClick={() => navigate(`/tweet/${post._id}`)}>{post.content ? post.content : post.content}</p>
                    </div>

                    {/* time */}
                    <div>
                        <p className='text-gray-500 pt-2'>{formatDate(post.createdAt)}</p>
                    </div>

                    <hr className='mt-2 border-t-[#2f3336]'/>
                
                    {/* Stats */}
                    <div className='flex py-3 items-center'>
                        <div className='flex gap-1'>
                            <p>{post.replies.count}</p>
                            <p className='text-gray-500'>Replies</p>
                        </div>
                        <div className='flex gap-1 ml-3'>
                            <p>{post.retweet.count}</p>
                            <p className='text-gray-500'>Retweet</p>
                        </div>
                        <div className='flex gap-1 ml-3'>
                            <p>{post.likes.count}</p>
                            <p className='text-gray-500'>Likes</p>
                        </div>
                    </div>
                    <hr className=' border-t-[#2f3336]'/>


    
                    {/* bottom (buttons) */}
                    <div className='flex justify-center mt-2 mb-1'>
                        <div className='w-full flex justify-around text-gray-500'>
                            <div className='flex items-center gap-2 hover:shadow-[0px_0px_1px_7px_rgba(29,155,240,0.2)] hover:bg-[#1d9bf0] hover:bg-opacity-20 rounded-full'>
                            <BsChat size={'1.4em'} className='hover:cursor-pointer z-20 hover:text-[#1d9bf0]' 
                                onClick={() => setOpenReply(true)}/>
                            </div>
                            <div className='flex items-center gap-2 hover:shadow-[0px_0px_1px_7px_rgba(0,186,124,0.20)] hover:bg-[#00ba7c] hover:bg-opacity-20 rounded-full'>
                            <IoMdRepeat size={'1.4em'} className={`hover:cursor-pointer z-20 hover:text-[#00ba7c] transition ${post && post.retweet && post.retweet.users && post.retweet.users.includes(user._id) ? 'text-[#00ba7c]' : 'text-gray-500'}`}
                                onClick={handleRetweet}/>
                            </div>
                            <div className='flex items-center gap-2 hover:shadow-[0px_0px_1px_7px_rgba(249,24,128,0.2)] hover:bg-[#f91880] hover:bg-opacity-20 rounded-full'>
                                <AiOutlineHeart size={'1.4em'} className={`hover:cursor-pointer z-20 hover:text-[#f91880] transition ${post && post.likes && post.likes.users && post.likes.users.includes(user._id) ? 'text-[#f91880]' : 'text-gray-500'}`}  
                                    onClick={handleLikeTweet}/>
                            </div>
                            <div className='flex items-center gap-2 hover:shadow-[0px_0px_1px_7px_rgba(29,155,240,0.2)] hover:bg-[#1d9bf0] hover:bg-opacity-20 rounded-full'>
                                <BsBookmark size={'1.2em'} className={`hover:cursor-pointer z-20 transition hover:text-[#1d9bf0] ${user && user.bookmarks && user.bookmarks.includes(post._id) ? 'text-[#1d9bf0]' : 'text-gray-500'}`}/>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
            <hr className='mt-2 border-t-[#2f3336]'/>
        </div>
      )
    }

export default MainThreadTweet
