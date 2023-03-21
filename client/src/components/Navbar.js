import React from 'react';
import { RxCross1 } from 'react-icons/rx'
import { BsFillHouseFill, BsFillBellFill, BsThreeDots, BsBookmarkFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope, FaUserAlt } from 'react-icons/fa';
import { AiFillSetting, AiOutlineTwitter  } from 'react-icons/ai'
import PostTweetButton from './PostTweetButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Navbar(props) {
  const [openProfile, setOpenProfile] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    axios({
      method: 'POST',
      withCredentials: true,
      url: 'http://localhost:5000/logout'
    }).then((res) => {
      console.log(res.data);
      if (res.data === 'Logout successfully') {
        navigate('/');
      };
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
      <div className='xl:w-[275px] w-[280px] sm:w-[88px] h-screen border-r border-r-[#2f3336] max-sm:absolute max-sm:z-10 bg-black'>
        {/* Account info */}
        <div className='sm:hidden flex justify-between items-center p-3'>
          <h1 className='text-xl'>Account info</h1>
          <RxCross1 size={'1.3em'} onClick={() => props.setOpenNav(!props.openNav)}/>
        </div>

      {/* Profile info */}
        <div className='p-3 sm:hidden'>
          {/* Profile picture */}
          <div className='flex justify-between'>
            <div className='w-12 h-12 bg-blue-800 rounded-full'/>
            <BsThreeDots size={'1.3em'}/>
          </div>
          {/* Profile name */}
          <div className='flex flex-col'>
            <h1 className='text-lg'>Zackary Devove</h1>
            <p className='text-gray-500'>@ZackaryDevove</p>
          </div>

          {/* Profile followers */}
          <div className='flex gap-3 pt-3'>
            <div className='flex'>
              <p>89</p>
              <p className='text-gray-500'>Following</p>
            </div>
            <div className='flex'>
              <p>17</p>
              <p className='text-gray-500'>Followers</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <hr className='sm:hidden border-t-[#2f3336]'/>
        <div className='max-sm:ml-5 sm:h-full  sm:flex sm:flex-col sm:justify-between sm:items-center'>
          <div className='sm:flex sm:flex-col sm:items-center xl:items-start'>
            <div className='max-sm:hidden h-14 flex items-center gap-'>
              <AiOutlineTwitter size={'2em'} className='text-blue-500 hover:cursor-pointer'/>
            </div>
            <div className='h-14 flex items-center gap-5 max-xl:hover:bg-slate-900 hover:cursor-pointer' onClick={() => navigate('/profile')}>
              <FaUserAlt  size={'1.4em'} />
              <h1 className='text-xl sm:hidden xl:block'>Profile</h1>
            </div>
            <div className='h-14 flex items-center gap-5 max-xl:hover:bg-slate-900 hover:cursor-pointer' onClick={() => navigate('/home')}>
              <BsFillHouseFill  size={'1.4em'} />
              <h1 className='text-xl sm:hidden xl:block'>Home</h1>
            </div>
            <div className='h-14 flex items-center gap-5 max-xl:hover:bg-slate-900 hover:cursor-pointer' onClick={() => navigate('/explore')}>
              <ImSearch  size={'1.4em'} />
              <h1 className='text-xl sm:hidden xl:block'>Explore</h1>
            </div>
            <div className='h-14 flex items-center gap-5 max-xl:hover:bg-slate-900 hover:cursor-pointer' onClick={() => navigate('/notification')}>
              <BsFillBellFill  size={'1.4em'} />
              <h1 className='text-xl sm:hidden xl:block'>Notifications</h1>
            </div>
            <div className='h-14 flex items-center gap-5 max-xl:hover:bg-slate-900 hover:cursor-pointer' onClick={() => navigate('/message')}>
              <FaEnvelope  size={'1.4em'} />
              <h1 className='text-xl sm:hidden xl:block'>Messages</h1>
            </div>
            <div className='h-14 flex items-center gap-5 max-xl:hover:bg-slate-900 hover:cursor-pointer' onClick={() => navigate('/bookmarks')}>
              <BsBookmarkFill  size={'1.4em'} />
              <h1 className='text-xl sm:hidden xl:block'>Bookmarks</h1>
            </div>
            <div className='h-14 flex items-center gap-5 max-xl:hover:bg-slate-900 hover:cursor-pointer' onClick={() => navigate('/settings')}>
              <AiFillSetting  size={'1.4em'} />
              <h1 className='text-xl sm:hidden xl:block'>Settings</h1>
            </div>
            <div className='w-full max-sm:hidden h-14 flex items-center gap-5 hover:cursor-pointer'>
              <PostTweetButton />
            </div>
              {/* Add logout option in div below */}
          </div>
            <div className='max-sm:hidden lg:p-5 lg:mb-5 w-full h-14 flex flex-col justify-center lg:justify-between items-center gap-2 hover:cursor-pointer'
              onClick={() => setOpenProfile(!openProfile)}>
                {
                  openProfile ?
                  <div className='px-12 p-3 bg-black border border-[#2f3336] shadow shadow-white rounded-lg hover:cursor-pointer' 
                    onClick={logout}>
                    <p>Log out</p>
                  </div>
                  : null
                }
                <div className='flex'>
                  <div className='flex gap-2 items-center '>
                    {/* Profile Picture */}
                    <div className='h-10 w-10 bg-blue-900 rounded-full' />
                    {/* Profile Name */}
                    <div className='flex flex-col max-xl:hidden'>
                        <h1 >Zack Devove</h1>
                        <p className='text-gray-600'>@zackarydevove</p>
                    </div>
                  </div>
                  <div className='p-3 max-xl:hidden'>
                    <BsThreeDots size={'1.3em'} />
                  </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Navbar
