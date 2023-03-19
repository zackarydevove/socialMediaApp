import React from 'react';
import { BsCardImage, BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineFileGif } from 'react-icons/ai'


function PostTweet() {
  return (
    <div>
        <div className='flex p-2'>
            {/* left */}
            <div className='mr-2'>
                    <div className='w-12 h-12 bg-blue-800 rounded-full'/>
            </div>

            {/* right */}
            <div className='flex flex-col p-1 w-full'>
                {/* up */}
                <div>
                    <textarea placeholder="What's happening?" className='w-full text-white bg-black'></textarea>
                </div>
                {/* down */}
                <div className='flex justify-between items-center'>
                    <div className='flex gap-5'>
                        <BsCardImage size={'1.3em'} className='hover:cursor-pointer' />
                        <AiOutlineFileGif size={'1.3em'} className='hover:cursor-pointer'/>
                        <BsFillEmojiSmileFill size={'1.3em'} className='hover:cursor-pointer'/>
                    </div>
                    <button className='xl:pl-5 xl:pr-5 p-2 pl-3 pr-3 bg-blue-500 rounded-3xl'>Tweet</button>
                </div>

            </div>
        </div>
        <hr className='border-t-[#2f3336]'/>
    </div>
  )
}

export default PostTweet
