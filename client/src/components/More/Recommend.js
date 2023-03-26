import React from 'react';
import ProfileToFollow from '../Profile/ProfileToFollow';
import { getRandomUsers } from '../../api/auth';
import { useEffect, useState } from 'react';

function Recommend({SearchPage = false}) {
  const [randomUsers, setRandomUsers] = useState([]);
  
  useEffect(() => {
    getRandomUsers()
    .then((res) => setRandomUsers(res))
    .catch((err) => console.log('Error during fetching random users', err));
  }, []);

  return (
    <div className={`${SearchPage ? 'mt-0' : 'mt-3'}`}>
        <div className='w-[290px] min-[1076px]:w-[348px] bg-[#16181c] pb-4 rounded-xl overflow-scroll scrollbar-hide'>
            <h1 className='text-xl font-bold p-4'>Who to follow</h1>
            <div className='flex flex-col gap-3'>
              {
                randomUsers.map((user, index) => ( (
                  <ProfileToFollow key={index} user={user}/>
                )))
              }
            </div>
        </div>
    </div>
  )
}

export default Recommend
