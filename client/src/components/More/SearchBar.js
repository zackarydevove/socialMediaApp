import React from 'react'
import UserCard from '../Search/UserCard';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { searchUsers } from '../../api/search';
import { RxCross1 } from 'react-icons/rx';

function SearchBar({SearchPage = false, placeHolder='Search Twitter'}) {
  const [searchResults, setSearchResults] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value;

    // If there is something to search for, searchUsers
    if (query.length > 0) {
      searchUsers(query)
        .then((users) => {
          setSearchResults(users);
        })
        .catch((err) => {
          console.log(err);
        });
    // If nothing to search, empty array of users
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className=' relative w-full flex justify-center items-center'>
      <div className={`${SearchPage ? 'w-[90%] mt-3' : 'w-[290px] min-[1076px]:w-[348px] '} ${openSearch ? 'text-blue-500 border border-blue-500' : 'text-white'}  z-30 h-[53px] flex justify-center items-center bg-[#16181c] rounded-3xl`}>
        <div className='w-[90%] flex items-center overflow-hidden'>
          <div className='w-[10%]'>
              <ImSearch size={'1.3em'} />
          </div>
          <input placeholder={placeHolder} className='bg-[#16181c] w-[90%] text-white'
            onChange={handleSearch}
            onClick={() => setOpenSearch(true)}></input>
        </div>
        {
          openSearch === true ? 
          <div className='z-30 hover:cursor-pointer' onClick={() => setOpenSearch(false)}>
            <RxCross1 />
          </div>
          : null 
        }
      </div>
      {
        openSearch === true ?
        <div className='z-20 w-[90%] max-h-[630px] overflow-y-scroll scrollbar-hide absolute top-[100%] bg-black rounded-xl border border-[#2f3336]'>
          {searchResults?.map((user) => (
            <div className='hover:bg-gray-500 hover:bg-opacity-20'>
              <UserCard key={user._id} user={user} />
            </div>
          ))}
        </div>
        : null
      }
    </div>
  )
}

export default SearchBar
