import React from 'react'
import { ImSearch } from 'react-icons/im';

function SearchBar({SearchPage = false, placeHolder='Search Twitter'}) {
  return (
    <div className={`${SearchPage ? 'w-[90%] mt-3' : 'w-[290px] min-[1076px]:w-[348px] '} h-[53px] flex justify-center items-center bg-[#16181c] rounded-3xl`}>
      <div className='w-[90%] flex items-center overflow-hidden'>
        <div className='w-[10%]'>
            <ImSearch size={'1.3em'} />
        </div>
        <input placeholder={placeHolder} className='bg-[#16181c] w-[90%]'></input>
      </div>
    </div>
  )
}

export default SearchBar
