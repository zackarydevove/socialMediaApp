import React from 'react'
import { BsCardImage, BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiOutlineFileGif, AiOutlineSend } from 'react-icons/ai'

function SendMessage() {
  return (
        <div className='flex justify-center items-center'>
            <div className='flex w-[98%] p-3 justify-between items-center rounded-3xl bg-[#16181c]'>
                <div className='flex flex-grow gap-3'>
                    <div className='flex gap-2'>
                        <BsCardImage size={'1.2em'}/>
                        <AiOutlineFileGif size={'1.2em'}/>
                        <BsFillEmojiSmileFill size={'1.2em'}/>
                    </div>
                    <input placeholder='Start a new message' className='flex-grow bg-[#16181c]'></input>
                </div>
                <AiOutlineSend />
            </div>
        </div>
  )
}

export default SendMessage
