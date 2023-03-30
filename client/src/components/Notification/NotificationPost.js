import React from 'react'
import { IoMdRepeat } from 'react-icons/io';
import { AiFillHeart } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { getCreator } from '../../api/auth';
import { getPost } from '../../api/post';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotificationPost({notification}) {
    const [fromUser, setFromUser] = useState({});
    const [post, setPost] = useState({});
    const [type, setType] = useState(notification.type);

    const navigate = useNavigate();

    useEffect(() => {
        getCreator(notification.fromUser)
        .then((user) => setFromUser(user))
        .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        getPost(notification.post)
        .then((res) => setPost(res))
        .catch((err) => console.log(err));
    }, [])

    console.log(notification);
    console.log('fromUser', fromUser);

  return (
    <div>
      <div className='flex p-3'>
        {/* Left: Emoji of action */}
        <div className='ml-5'>
            {
                type === 'like' ?
                <AiFillHeart size={'2.2em'} className='text-red-600'/>
                : (
                    type === 'retweet' ? 
                    <IoMdRepeat size={'2.2em'} className='text-green-500'/>
                    : (
                        type === 'reply' ?
                        <BsChat size={'2em'} className='text-blue-500'/>
                        : null
                    )
                )
            }
        </div>
        {/* Right: Information of action */}
        <div className='flex flex-col gap-3 pl-3'>
          {/* First row: Profile picture */}
          <div className='flex hover:cursor-pointer'
            onClick={() => navigate(`/profile/${fromUser.username}`)}>
            <div className='w-8 h-8 rounded-full bg-pp bg-cover'/>
          </div>
          {/* Second row: Name and action */}
          <div className='flex gap-1'>
            <p className='font-bold'>{fromUser.username}</p>
            {
                type === 'like' ?
                <p>liked your Tweet</p>
                : (
                    type === 'retweet' ? 
                    <p>retweeted your Tweet</p>
                    : (
                        type === 'reply' ?
                        <p>replied to your Tweet</p>
                        : null
                    )
                )

            }
          </div>
          {/* Third Row: Tweet */}
          <div onClick={() => navigate(`/tweet/${post._id}`)} className="hover:cursor-pointer">
            <p className='text-gray-500'>{post.content}</p>
          </div>

        </div>
      </div>
      <hr className='border-t-[#2f3336]' />
    </div>
  )
}

export default NotificationPost
