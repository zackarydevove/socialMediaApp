import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileToFollow({ user }) {

  const navigate = useNavigate();

  return (
    <div className='hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-20'>
      <div className='flex items-center gap-2 hover:cursor-pointer px-4 p-1'>
          {/* left (profile picture) */}
        <div>
          <div className='w-12 h-12 bg-blue-700 rounded-full'
            onClick={() => navigate(`/profile/${user.username}`)}/>
        </div>

        {/* right (name and follow button) */}
        <div className='flex-grow flex items-center'>
          {/* Name */}
          <div className='flex flex-col flex-grow'
            onClick={() => navigate(`/profile/${user.username}`)}>
              <h1 >{user.username}</h1>
              <p className='text-gray-600'>@{user.username}</p>
          </div>
          {/* Follow button */}
          <button className='z-10 h-[32px] pl-4 pr-4 text-black bg-white rounded-3xl'>Follow</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileToFollow
