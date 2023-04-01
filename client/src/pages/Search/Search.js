import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import SearchBar from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import Navbarsm from '../../components/More/Navbarsm';

function Search() {
    const [openNav, setOpenNav] = useState(false);

    const navigate = useNavigate();

    return (
        <div className='font-opensans flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
            <Navbarsm />
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
                    <div className='sm:hidden pl-3'>
                        <AiOutlineArrowLeft size={'1.5em'} className='sm:hidden'
                                    onClick={() => navigate(-1)}/>
                    </div>
                    <SearchBar SearchPage={true}/>
                </div>
            </div>
            
            
            <div className='max-lg:hidden p-3 ml-4'>
                <Recommend SearchPage={true} />
                <Terms />
            </div>
    </div>
  )
}

export default Search
