import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

function PostTweetButton() {
  return (
    <div className='sm:w-full max-sm:absolute max-sm:bottom-0 max-sm:right-0 max-sm:p-6'>
        <div className='xl:w-full xl:h-12 w-14 h-14 bg-blue-500 rounded-full flex justify-center items-center hover:bg-blue-600'>
            <AiOutlinePlus size={'2.3em'} className='xl:hidden'/>
            <p className='max-xl:hidden text-lg w-[230px] text-center'>Tweet</p>
        </div>
      
    </div>
  )
}

export default PostTweetButton
