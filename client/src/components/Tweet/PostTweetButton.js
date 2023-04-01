import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'
import Tweet from './Tweet';

function PostTweetButton({setUpdate}) {
  const [openTweet, setOpenTweet] = useState(false);

    return (
      <div className='z-40 sm:w-full max-sm:absolute max-sm:bottom-10 max-sm:right-0 max-sm:p-6'>
        {
          openTweet ?
            <Tweet setOpenTweet={setOpenTweet} setUpdate={setUpdate}/>
          : null
        }
          <div className='xl:w-full xl:h-12 w-14 h-14 bg-blue-500 rounded-full flex justify-center items-center hover:bg-blue-600'
            onClick={() => setOpenTweet(true)}>
              <AiOutlinePlus size={'2.3em'} className='xl:hidden'/>
              <p className='max-xl:hidden text-lg w-[230px] text-center'>Tweet</p>
          </div>
        
      </div>
    )
}

export default PostTweetButton
