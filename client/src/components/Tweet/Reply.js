import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsCardImage, BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineFileGif } from 'react-icons/ai';
import { useState } from 'react';
import { replyTweet } from '../../api/post';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import socket from '../../socket';

function Reply(props) {
    const [content, setContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const addEmoji = (emoji) => {
        setContent((prevContent) => prevContent + emoji.native);
    };

    const handleReply = () => {
        replyTweet(props.post._id, content)
        .then((reply) => {
            socket.emit('reply', { fromUser: props.user._id, postId: reply._id });
        })
        .catch((err) => console.log(err));
        props.setOpenReply(false);
    }

  return (
    <div className='z-40 fixed left-0 top-0 md:w-screen md:h-screen bg-blue-300 bg-opacity-20'>
        <div className='w-screen h-screen md:w-[600px] md:h-auto md:fixed md:left-[50%] md:translate-x-[-50%] md:top-16 z-30 bg-black opacity- md:rounded-2xl'>
            <div className='md:w-full md:h-full p-3 z-40'>
                {/* Up (cross) */}
                <div className='flex pl-1 pb-3'>
                    <RxCross1 size={'1.3em'} className='text-white hover:cursor-pointer'
                        onClick={() => props.setOpenReply(false)}/>
                </div>

                {/* Middle (post replied to) */}
                <div className='flex'>
                    {/* Left (logo) */}
                    <div className='p-1 pr-3 flex-col justify-center items-center'>
                        <div className='w-12 h-12 bg-blue-500 rounded-full'/>
                        <div className='h-full w-full flex items-center justify-center'>
                            <hr className='h-full w-[1px] border-l border-[#2f3336]' />
                        </div>
                    </div>

                    {/* Right (tweet) */}
                    <div className='w-full flex flex-col'>
                        {/* up */}
                        <div className='w-full flex justify-between items-center'>
                            <div className='flex'>
                                <p className='text-ellipsis overflow-hidden'>{props.post.username}</p>
                                <p className='ml-1 text-gray-500 text-ellipsis overflow-hidden'>@{props.post.username}</p>
                                <p className='ml-1 text-gray-500'>· 36m</p>
                            </div>
                        </div>

                        {/* middle */}
                        <div className='w-4/5'>
                            <p className='break-words'>{props.post.content}</p>
                        </div>

                        {/* bottom */}
                        <div className='flex gap-1 mt-2'>
                            <p className='text-gray-500'>Replying to {props.post.username}</p>
                            <p className='text-blue-600'>@{props.post.username}</p>
                        </div>
                    </div>
                </div>



                {/* Bottom (reply) */}
                <div className='flex h-full py-3'>
                    {/* Left */}
                    <div className='p-1'>
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
                                <BsCardImage size={'1.3em'} className='text-gray-500' />
                                <AiOutlineFileGif size={'1.3em'} className='text-gray-500'/>
                                <div className='relative'>
                                    <BsFillEmojiSmileFill size={'1.3em'} className='hover:cursor-pointer hover:text-blue-500'
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
                                    {showEmojiPicker && (
                                        <div className='absolute z-30'>
                                            <Picker
                                                onEmojiSelect={addEmoji}
                                                theme='dark'
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className='xl:pl-5 xl:pr-5 p-2 pl-3 pr-3 bg-blue-500 rounded-3xl'
                                onClick={handleReply}>Tweet</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reply
