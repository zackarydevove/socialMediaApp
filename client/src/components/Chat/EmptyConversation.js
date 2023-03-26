import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

function EmptyConversation() {
  return (
    <div className='w-[600px] h-full flex flex-col justify-center items-center border-r border-r-[#2f3336]'>
        <div className='p-32 '>
            <h1 className='text-3xl font-bold'>Select a message</h1>
            <p className='text-gray-500 pt-2'>Choose from your existing conversations, start a new one, or just keep swimming.</p>
        </div>
    </div>
  )
}

export default EmptyConversation
