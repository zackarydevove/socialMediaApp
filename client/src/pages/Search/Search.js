import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import PostTweetButton from '../../components/PostTweetButton'
import Navbar from '../../components/Navbar'
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Recommend from '../../components/Recommend';
import Terms from '../../components/Terms';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate();
    console.log(openNav);

    return (
        <div className='flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
            {openNav ? 
            <div>
                <Navbar openNav={openNav} setOpenNav={setOpenNav}/> 
            </div>
            : 
            <div className='max-sm:hidden'>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} />
            </div>
            }
            <div className='max-sm:flex-grow relative sm:w-[600px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton/>
                </div>
                <div className='flex justify-around items-center'>
                    <div className='sm:hidden'>
                        <AiOutlineArrowLeft size={'2em'} onClick={() => navigate('/home')}/>
                    </div>
                    <SearchBar SearchPage={true} />
                </div>
            </div>
            
            <div className='max-lg:hidden p-3 ml-4'>
                <Recommend SearchPage={true} />
                <Terms />
            </div>
            <div className='sm:hidden'>
                <hr className='border-t-[#2f3336]'/>
                <div className='flex justify-around items-center p-3'>
                    <BsFillHouseFill size={'1.5em'} className='hover:text-slate-500' />
                    <ImSearch size={'1.5em'} className='hover:text-slate-500'/>
                    <BsFillBellFill size={'1.5em'} className='hover:text-slate-500'/>
                    <FaEnvelope size={'1.5em'} className='hover:text-slate-500'/>
            </div>
        </div>
    </div>
  )
}

export default Search
