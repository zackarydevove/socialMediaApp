import React from 'react'

function ProfileToFollow() {
  return (
    <div className='flex items-center mt-3 gap-2 hover:cursor-pointer'>
        {/* left (profile picture) */}
      <div>
        <div className='w-12 h-12 bg-blue-700 rounded-full'/>
      </div>

      {/* right (name and follow button) */}
      <div className='flex-grow flex justify-between items-center'>
        {/* Name */}
        <div className='flex flex-col'>
            <h1 >Zack Devove</h1>
            <p className='text-gray-600'>@zackarydevove</p>
        </div>
        {/* Follow button */}
        <button className='z-10 h-[32px] pl-4 pr-4 text-black bg-white rounded-3xl'>Follow</button>
      </div>
    </div>
  )
}

export default ProfileToFollow
