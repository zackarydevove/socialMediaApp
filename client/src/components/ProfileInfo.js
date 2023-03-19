import React from 'react';
import { BsCalendar2Week } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';

function ProfileInfo() {
  return (
    <div>
        {/* Banner */}
        <div className='pb-[150px] sm:pb-[120px]'>
            <div className='w-full h-[200px] absolute bg-slate-800' />
        </div>

        {/* Info */}
        <div className='p-3'>
            {/* PP and Edit */}
            <div className='flex justify-between items-center'>
                <div className='w-20 h-20 sm:w-[134px] sm:h-[134px] border-4 border-black bg-blue-500 rounded-full z-10'/>
                <div className='pt-12 sm:pt-16'>
                    <button className='h-[36px] pl-4 pr-4 rounded-full border border-[#666666]'>Edit Profile</button>
                </div>
            </div>
            {/* Name */}
            <div>
                <h1 className='text-xl pt-3'>Zackary Devove</h1>
                <p className='text-gray-500'>@zackarydevove</p>
            </div>
            {/* Bio */}
            <div className='pt-3'>
                <p>Fullstack Software Engineer | React | Redux | Tailwind | Node | Express | MongoDB | PostgreSQL | REST API | GraphQL | Git | Docker | C/C++ | Solidity</p>
            </div>
            {/* Links */}
            <div className='flex items-center gap-3 pt-3'>
                <div className='text-gray-500 flex items-center gap-1'>
                    <AiOutlineLink size={'1.3em'}/>
                    <a className='text-blue-400'>github.com/zackarydevove</a>
                </div>
                <div className='text-gray-500 flex items-center gap-2'>
                    <BsCalendar2Week />
                    <p>Joined January 2023</p>
                </div>
            </div>
            {/* Numbers */}
            <div className='flex gap-3 pt-3 pb-3'>
                <div className='flex gap-1'>
                    <p>89</p>
                    <p className='text-gray-500'>Following</p>
                </div>
                <div className='flex gap-1'>
                    <p>17</p>
                    <p className='text-gray-500'>Followers</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ProfileInfo
