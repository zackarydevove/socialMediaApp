import React from 'react'
import { BsThreeDots, BsChat } from 'react-icons/bs';
import { IoMdRepeat } from 'react-icons/io';
import { AiOutlineHeart, AiOutlineUpload } from 'react-icons/ai';

function TweetBlock() {
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
                        <p className='text-ellipsis overflow-hidden'>Zack Devove</p>
                        <p className='ml-1 text-gray-500 text-ellipsis overflow-hidden'>@zackarydevove</p>
                        <p className='ml-1 text-gray-500'>· 36m</p>
                    </div>

                    {/* right */}
                    <div>
                        <BsThreeDots className='hover:cursor-pointer' />
                    </div>
                </div>

                {/* middle */}
                <div className='w-4/5'>
                    <p className='break-words'>Hello Twitter and LinkedIn this is my first post! </p>
                </div>

                {/* bottom */}
                <div className='flex justify-between mt-2'>
                    <div className='w-1/2 flex justify-between'>
                        <BsChat size={'1.2em'} className='hover:cursor-pointer' />
                        <IoMdRepeat size={'1.2em'} className='hover:cursor-pointer' />
                        <AiOutlineHeart size={'1.2em'} className='hover:cursor-pointer'  />
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
