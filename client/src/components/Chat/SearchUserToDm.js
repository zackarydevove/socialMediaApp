import React from 'react'
import { ImSearch } from 'react-icons/im';

function SearchUserToDm({handleSearch}) {

    return (
        <div className=' relative w-full flex justify-center items-center'>
          <div className='z-30 w-full h-[53px] flex justify-center items-center bg-[#16181c] rounded-3xl'>
            <div className='w-[90%] flex items-center overflow-hidden'>
              <div className='w-[10%]'>
                  <ImSearch size={'1.3em'} />
              </div>
              <input placeholder='Search for friends' className='bg-[#16181c] w-[90%] text-white'
                onChange={handleSearch}></input>
            </div>
            </div>
        </div>
    )
}

export default SearchUserToDm
