import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { follow } from '../../api/follow';

function ProfileToFollow({ user, currentUser, setUpdateUser, setUserProfile }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleFollow = () => {
    follow(user._id)
    .then((res) => {
        setUpdateUser(prev => !prev);
        console.log(res);
    })
    .catch((err) => console.log(err));
}

  return (
    <div className='hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-20'>
      <div className='flex items-center gap-2 hover:cursor-pointer px-4 p-1'>
          {/* left (profile picture) */}
        <div>
          <div className='w-12 h-12 bg-pp bg-cover rounded-full'
            onClick={() => navigate(`/profile/${user.username}`)}/>
        </div>

        {/* right (name and follow button) */}
        <div className='flex-grow flex items-center'>
          {/* Name */}
          <div className='flex flex-col flex-grow'
            onClick={() => navigate(`/profile/${user.username}`)}>
              <h1 >{user.twittername}</h1>
              <p className='text-gray-600'>@{user.username}</p>
          </div>
          {/* Follow button */}
          <div className='z-30'>
          {
              currentUser?.follow?.users?.some((userId) => userId?.toString() === user._id?.toString())
            ? 
              <button className={`h-[36px] pl-4 pr-4 rounded-full border ${isHovered ? 'border-red-500 bg-red-500 bg-opacity-5 text-red-500 bg-' : ' border-[#666666]'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleFollow}>{isHovered ? 'Unfollow' : 'Following'}</button>
            :
              <button className="h-[36px] pl-4 pr-4 rounded-full border bg-white text-black"
                onClick={handleFollow}>Follow</button>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileToFollow
