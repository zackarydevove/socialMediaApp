import React from 'react'
import { AiFillEdit, AiOutlineArrowLeft } from 'react-icons/ai'

function AccountInfo() {
  return (
    <div className='w-[600px] h-full flex flex-col border-r border-r-[#2f3336]'>
      {/* Up: Profile information */}
      <div className='flex justify-between p-2 items-center'>
        <div className='p-2 flex items-center gap-2 hover:cursor-pointer'>
            <div className='w-10'>
                <AiOutlineArrowLeft size={'1.3em'} />
            </div>
            <p className='text-xl font-bold'> Account Information</p>
        </div>
      </div>
      <hr className='border-t-[#2f3336]'/>
        <div className='p-3 flex flex-col gap-3'>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p>Username</p>
                    <p className='text-sm text-gray-500'>@zackarydevove</p>
                </div>
                <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' />
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p>Phone</p>
                    <p className='text-sm text-gray-500'>123-456-789</p>
                </div>
                <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' />
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                <p>Email</p>
                    <p className='text-sm text-gray-500'>zackarydevove@hotmail.com</p>
                </div>
                <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' />
            </div>

        </div>

        <hr className='border-t-[#2f3336]'/>

        <div className='p-3 flex flex-col gap-3'>
            
            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p>Country</p>
                    <p className='text-sm text-gray-500'>France</p>
                </div>
                <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' />
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p>Birth Date</p>
                    <p className='text-sm text-gray-500'>Nov 26, 2001</p>
                </div>
                <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' />
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex flex-col'>
                    <p>Age</p>
                    <p className='text-sm text-gray-500'>21</p>
                </div>
                <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' />
            </div>
        </div>
    </div>
  )
}

export default AccountInfo

