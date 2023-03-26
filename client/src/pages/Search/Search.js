import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsFillHouseFill, BsFillBellFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { FaEnvelope } from 'react-icons/fa';
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import SearchBar from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import UserCard from '../../components/Search/UserCard';
// import { searchUsers } from '../../api/search';

function Search() {
    const [openNav, setOpenNav] = useState(false);
    // const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();

    // const handleSearch = (e) => {
    //     const query = e.target.value;

    //     // If there is something to search for, searchUsers
    //     if (query.length > 0) {
    //       searchUsers(query)
    //         .then((users) => {
    //           setSearchResults(users);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     // If nothing to search, empty array of users
    //     } else {
    //       setSearchResults([]);
    //     }
    //   };

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
                    <SearchBar SearchPage={true}/>
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
