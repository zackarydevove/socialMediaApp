import React from 'react'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import PostTweetButton from '../../components/PostTweetButton'
import Navbar from '../../components/Navbar'
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Setting from '../../components/Settings/Setting';
import AccountInfo from '../../components/Settings/AccountInfo';
import PasswordInfo from '../../components/Settings/PasswordInfo';

function Settings() {
    const [openNav, setOpenNav] = useState(false);
    const [show, setShow] = useState('');

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
            <div className='max-sm:flex-grow relative sm:w-[388px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton/>
                </div>
                <div>
                    <div className='flex justify-end sm:justify-between p-3'>
                        <h1 className='max-sm:hidden text-xl font-bold'>Settings</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                            <SearchBar SearchPage={true} placeHolder='Search Settings' />
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>
                <Setting name='Account information' setShow={setShow}/>
                <Setting name='Change your password' setShow={setShow}/>
            </div>
            <div className='max-lg:hidden'>
                {show === 'Change your password' ? <PasswordInfo/>  : <AccountInfo/> }
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

export default Settings
