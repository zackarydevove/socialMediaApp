import React from 'react'
import ProfileToFollow from './ProfileToFollow'

function Recommend({SearchPage = false}) {
  return (
    <div className={`${SearchPage ? 'mt-0' : 'mt-3'}`}>
        <div className='w-[290px] min-[1076px]:w-[348px] h-[922px] bg-[#16181c] rounded-xl p-4 overflow-scroll no-scrollbar'>
            <h1 className='text-xl font-bold'>Who to follow</h1>
            <div className='flex flex-col gap-3'>
                <ProfileToFollow />
            </div>
        </div>
    </div>
  )
}

export default Recommend
