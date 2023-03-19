import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'


function PasswordInfo() {
  return (
    <div className='w-[600px] h-full flex flex-col border-r border-r-[#2f3336]'>
        {/* Up: Profile information */}
        <div className='flex justify-between p-2 items-center'>
            <div className='p-2 flex items-center gap-2 hover:cursor-pointer'>
                <div className='w-10'>
                    <AiOutlineArrowLeft size={'1.3em'} />
                </div>
                <p className='text-xl font-bold'> Change your password</p>
            </div>
        </div>
        {/* Current password */}
        <div className='p-3'>
            <div className='h-14 border border-[#2f3336] flex items-center p-3'>
                <input placeholder='Current password' className='w-full bg-black'></input>
            </div>
            <p className='text-sm text-blue-500 ml-3 hover:cursor-pointer'>Forgot password?</p>
        </div>
        <hr className='border-t-[#2f3336]'/>

        {/* New password */}
        <div className='p-3'>
            <div className='h-14 border border-[#2f3336] flex items-center p-3'>
                <input placeholder='New password' className='w-full bg-black'></input>
            </div>
        </div>
        {/* Confirm password */}
        <div className='p-3'>
            <div className='h-14 border border-[#2f3336] flex items-center p-3'>
                <input placeholder='Confirm password' className='w-full bg-black'></input>
            </div>
        </div>
        <hr className='border-t-[#2f3336]'/>
        <div className='flex justify-end p-3'>
            <button className='p-2 pl-5 pr-5 bg-blue-500 rounded-3xl'>Save</button>
        </div>

    </div>
  )
}

export default PasswordInfo

