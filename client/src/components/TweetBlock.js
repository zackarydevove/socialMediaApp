import React from 'react'
import { BsThreeDots, BsChat } from 'react-icons/bs';
import { IoMdRepeat } from 'react-icons/io';
import { AiOutlineHeart, AiOutlineUpload } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import { useState, useEffect } from 'react';

function TweetBlock(props) {
    const [user, setUser] = useState({});
    const [post, setPost] = useState(props.post);
    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:5000/user',
        }).then((res) => {
            console.log(res.data);
            setUser(res.data);
        })
        .catch((err) => console.log(err));
    }, [post]);

    const likeTweet = () => {
        axios({
            method: 'POST',
            data: {
                postId: post._id,
            },
            withCredentials: true,
            url: 'http://localhost:5000/post/like',
        }).then((res) => {
            console.log(res);
            setPost(res.data);
        })
        .catch((err) => console.log(err));
    }

    const deleteTweet = () => {
        console.log(post);
        axios({
            method: 'DELETE',
            data: {
                post: post
            },
            withCredentials: true,
            url: 'http://localhost:5000/post',
        }).then((res) => {
            console.log(res);
            if (res.data === 'Post deleted') {
                setPost({});
                props.setUpdate(!props.update);
            }
        })
        .catch((err) => console.log); 
    }

  return (
    <div>
        <div className='max-w-screen flex p-2'>
            {/* Left */}
            <div className='p-1 pr-2'>
                <div className='w-12 h-12 bg-blue-500 rounded-full'/>
            </div>

            {/* Right */}
            <div className='w-full flex flex-col'>
                {/* up */}
                <div className='w-full flex justify-between items-center'>
                    {/* left */}
                    <div className='flex'>
                        <p className='text-ellipsis overflow-hidden'>{props.username}</p>
                        <p className='ml-1 text-gray-500 text-ellipsis overflow-hidden'>@zackarydevove</p>
                        <p className='ml-1 text-gray-500'>· 36m</p>
                    </div>

                    {/* right */}
                    <div className='relative'>
                        <BsThreeDots className='hover:cursor-pointer' 
                            onClick={() => setOpenDelete(!openDelete)} />
                        {
                            openDelete ?
                            <div className='w-[150px] flex justify-center items-center p-3 bg-black border border-[#2f3336] shadow-[0px_0px_5px_-1px_rgba(0,0,0,0.3)] shadow-white rounded-lg hover:cursor-pointer hover:bg-gray-700 transition absolute top-0 translate-x-[-110%] text-red-700' 
                              onClick={deleteTweet}>
                                <FiTrash2 className='flex-shrink'/>
                                <p className='flex-grow pl-3'>Delete</p>
                            </div>
                            
                            : null
                        }
                    </div>
                </div>

                {/* middle */}
                <div className='w-4/5'>
                    <p className='break-words'>{post.content}</p>
                </div>

                {/* bottom */}
                <div className='flex justify-between mt-2'>
                    <div className='w-1/2 flex justify-between'>
                        <BsChat size={'1.2em'} className='hover:cursor-pointer' />
                        <IoMdRepeat size={'1.2em'} className='hover:cursor-pointer' />
                        <div className='flex items-center gap-2'>
                            <AiOutlineHeart size={'1.2em'} className={`hover:cursor-pointer transition ${post && post.likes && post.likes.users && post.likes.users.includes(user._id) ? 'text-red-700' : 'text-white'}`}  
                                onClick={likeTweet}/>
                                <div>
                                    <p className='text-red-700'>{post && post.likes && post.likes.count && post.likes.count !== 0 ? post.likes.count : null}</p>
                                </div>
                        </div>
                    </div>
                    <AiOutlineUpload size={'1.2em'} className='hover:cursor-pointer'  />
                </div>

            </div>
        </div>
        <hr className='mt-2 border-t-[#2f3336]'/>
    </div>
  )
}

export default TweetBlock
