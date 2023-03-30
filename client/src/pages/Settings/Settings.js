import React from 'react'
import { useState, useEffect } from 'react';
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import Setting from '../../components/Settings/Setting';
import AccountInfo from '../../components/Settings/AccountInfo';
import PasswordInfo from '../../components/Settings/PasswordInfo';
import { getUser } from '../../api/auth';
import Navbarsm from '../../components/More/Navbarsm';

function Settings() {
    const [updateUser, setUpdateUser] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [show, setShow] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser()
        .then((currUser) => setUser(currUser))
        .catch((err) => console.log(err));
    }, [updateUser])

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


            { window.innerWidth <= 1024 && show ?
                (
                    show === 'Change your password' ? 
                    <PasswordInfo user={user} setShow={setShow}/>  
                    :
                    (
                        user ?
                        <AccountInfo user={user} setUpdateUser={setUpdateUser} setUser={setUser} setShow={setShow}/>
                        : <div>Loading...</div>
                    )
                )
            :
                <div className='max-sm:flex-grow relative lg:min-w-[388px] sm:min-w-[590px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                    
                    <div className='sm:hidden'>
                        <PostTweetButton/>
                    </div>
                    <div>
                        <div className='flex sm:justify-between p-3'>
                            <h1 className='text-xl font-bold'>Settings</h1>
                        </div>
                            <hr className='mt-2 border-t-[#2f3336] ' />
                    </div>
                    <Setting name='Account information' setShow={setShow}/>
                    <Setting name='Change your password' setShow={setShow}/>
                </div>
            }

            <div className='max-lg:hidden'>
                {show === 'Change your password' ? 
                    <PasswordInfo user={user} setShow={setShow}/>  
                    :
                (
                    user ?
                     <AccountInfo user={user} setUpdateUser={setUpdateUser} setUser={setUser} setShow={setShow}/>
                    : <div>Loading...</div>
                )
                }
            </div>
    </div>
  )
}

export default Settings
