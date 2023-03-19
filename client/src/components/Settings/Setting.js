import React from 'react'
import { BsChevronRight } from 'react-icons/bs'

function Setting(props) {
  return (
    <div className='flex p-3 hover:bg-[#16181c] hover:cursor-pointer'
      onClick={() => props.setShow(props.name)}>
      <div className='w-full flex justify-between ml-3'>
        <p>{props.name}</p>
        < BsChevronRight size={'1.3em'}/>
      </div>
    </div>
  )
}

export default Setting
