import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user.username}`);
  };

  return (
    <div className='flex p-3 hover:bg-gray-500 hover:bg-opacity-20 hover:cursor-pointer' onClick={handleClick}>
      <div className='w-12 h-12 bg-pp bg-cover rounded-full'/>
      <div className='px-3'>
        <h3>{user.twittername}</h3>
        <p>@{user.username}</p>
      </div>
    </div>
  );
}

export default UserCard;