import React from 'react'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Navbarsm() {

    const navigate = useNavigate();

  return (
    <div className='sm:hidden w-screen absolute bottom-0 bg-black z-40'>
        <hr className='border-t-[#2f3336]'/>
        <div className='flex justify-around items-center p-3'>
            <BsFillHouseFill size={'1.5em'} className='hover:text-slate-500' 
                onClick={() => navigate('/home')}/>
            <ImSearch size={'1.5em'} className='hover:text-slate-500'
                onClick={() => navigate('/explore')}/>
            <BsFillBellFill size={'1.5em'} className='hover:text-slate-500'
                onClick={() => navigate('/notification')}/>
            <FaEnvelope size={'1.5em'} className='hover:text-slate-500'
                onClick={() => navigate('/message')}/>
        </div>
    </div>
  )
}

export default Navbarsm
