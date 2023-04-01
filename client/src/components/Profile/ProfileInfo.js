import React from 'react';
import { BsCalendar2Week } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { follow } from '../../api/follow';
import { joinedDate } from '../../utils/joinedDate';
import UpdateProfile from './UpdateProfile';

function ProfileInfo({
    currentUser = null, 
    userProfile = null, 
    update = null, 
    setUpdate = null
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (userProfile === null) {
            console.log("user doesn't exist");
            navigate('/home');
        } else if (currentUser === null) {
            console.log('user not logged in');
            navigate('/');
        }
    }, [currentUser, userProfile]);
    
    const handleFollow = () => {
        follow(userProfile._id)
        .then((res) => {
            setUpdate(!update);
            console.log(res);
        })
        .catch((err) => console.log(err));
    }

  return (
    <div>
        {
            editOpen ?
            <UpdateProfile user={currentUser} setEditOpen={setEditOpen} setUpdate={setUpdate}/>
            : null
        }
        {/* Banner */}
        <div className='pb-[150px] sm:pb-[120px]'>
            <div className='w-full h-[200px] absolute bg-banner bg-cover bg-center' />
        </div> 

        {/* Info */}
        <div className='p-3'>
            {/* PP and Edit */}
            <div className='flex justify-between items-center'>
                <div className='w-20 h-20 sm:w-[134px] sm:h-[134px] border-4 border-black bg-pp bg-cover rounded-full z-10'/>
                <div className='pt-12 sm:pt-16'>
                {
                    currentUser.username === userProfile.username 
                    ? 
                        <button className="h-[36px] pl-4 pr-4 rounded-full border border-[#666666]"
                            onClick={() => setEditOpen(true)}>Edit Profile</button>
                    : 
                        currentUser?.follow?.users?.some((userId) => userId?.toString() === userProfile._id?.toString())
                            ? 
                            <button className={`h-[36px] pl-4 pr-4 rounded-full border ${isHovered ? 'border-red-500 bg-red-500 bg-opacity-5 text-red-500 bg-' : ' border-[#666666]'}`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={handleFollow}>{isHovered ? 'Unfollow' : 'Following'}</button>
                            :
                            <button className="h-[36px] pl-4 pr-4 rounded-full border bg-white text-black"
                                onClick={handleFollow}>Follow</button>
                }
                </div>
            </div>
            {/* Name */}
            <div>
                <p className='outline-none bg-black text-xl pt-3'>{userProfile.twittername}</p>
                <p className='text-gray-500'>@{userProfile.username}</p>
            </div>
            {/* Bio */}
            <div className='pt-3'>
                <p className='outline-none bg-black'>{userProfile.description}</p>
            </div>
            {/* Links */}
            <div className='flex items-center gap-3 pt-3'>
                <div className='text-gray-500 flex items-center gap-1'>
                    <AiOutlineLink size={'1.3em'}/>
                    <p className=' outline-none text-blue-400 hover:cursor-pointer bg-black'>{userProfile.link}</p>
                </div>
                <div className='text-gray-500 flex items-center gap-2'>
                    <BsCalendar2Week />
                    <p>Joined {userProfile?.createdAt ? joinedDate(userProfile.createdAt) : ''}</p>
                </div>
            </div>
            {/* Numbers */}
            <div className='flex gap-3 pt-3 pb-3'>
                <div className='flex gap-1'> 
                    <p>{userProfile.follow?.count}</p>
                    <p className='text-gray-500'>Following</p>
                </div>
                <div className='flex gap-1'>
                    <p>{userProfile.followedBy?.count}</p>
                    <p className='text-gray-500'>Followers</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ProfileInfo
