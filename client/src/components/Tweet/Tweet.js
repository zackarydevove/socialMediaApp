import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsCardImage, BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineFileGif } from 'react-icons/ai';
import { useState } from 'react';
import { postTweet } from '../../api/post';

function Tweet(props) {
    const [content, setContent] = useState('');

    const handleClick = () => {
        postTweet(content);
        props.setUpdate(!props.update);
        props.setOpenTweet(false);
    }

  return (
    <div className='z-40 fixed left-0 top-0 md:w-screen md:h-screen bg-blue-300 bg-opacity-20'>
        <div className='w-screen h-screen md:w-[600px] md:h-[314px] md:fixed md:left-[50%] md:translate-x-[-50%] md:top-16 z-30 bg-black opacity- md:rounded-2xl'>
            <div className='md:w-full md:h-full p-3 z-40'>
                {/* Up */}
                <div className='flex pl-1'>
                    <RxCross1 size={'1.3em'} className='text-white hover:cursor-pointer'
                        onClick={() => props.setOpenTweet(false)}/>
                </div>
                {/* Bottom */}
                <div className='flex h-full py-3'>
                    {/* Left */}
                    <div>
                        <div className='h-12 w-12 bg-blue-500 rounded-full'/>
                    </div>
                    {/* Right */}
                    <div className='w-full h-full flex flex-col p-3'>
                        {/* Top */}
                        <div className='flex-grow'>
                            <textarea placeholder="What's happening?" className='text-xl h-full w-full text-white bg-black'value={content}
                        onChange={e => setContent(e.target.value)}></textarea>
                        </div>
                        {/* Down */}
                        <hr />
                        <div className='flex justify-between items-center pt-3'>
                            <div className='flex gap-5'>
                                <BsCardImage size={'1.3em'} className='hover:cursor-pointer' />
                                <AiOutlineFileGif size={'1.3em'} className='hover:cursor-pointer'/>
                                <BsFillEmojiSmileFill size={'1.3em'} className='hover:cursor-pointer'/>
                            </div>
                            <button className='xl:pl-5 xl:pr-5 p-2 pl-3 pr-3 bg-blue-500 rounded-3xl'
                                onClick={handleClick}>Tweet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweet
