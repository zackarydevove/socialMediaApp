import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useState } from 'react';
import { updateUser } from '../../api/user';

function UpdateProfile({user, setEditOpen, setUpdate}) {
    const [twitterName, setTwitterName] = useState(user.twittername || '')
    const [description, setDescription] = useState(user.description || '')
    const [link, setLink] = useState(user.link || '')

    const handleEdit = () => {
        console.log('twitterName, description, link', twitterName, description, link);
        setEditOpen(false)
        updateUser(user._id, twitterName, description, link)
        .then((res) => {
            console.log(res);
            setUpdate((prev) => !prev);
        })
        .catch((err) => console.log(err));
    }

  return (
    <div className='z-50 fixed left-0 top-0 md:w-screen md:h-screen bg-blue-300 bg-opacity-20 max-sm:max-h-screen max-sm:overflow-y-scroll max-sm:scrollbar-hide'>
        <div className='w-screen h-screen md:w-[600px] md:min-h-[600px] md:h-auto md:fixed md:left-[50%] md:translate-x-[-50%] md:top-16 z-30 bg-black md:rounded-2xl max-sm:max-h-screen max-sm:overflow-y-scroll max-sm:scrollbar-hide'>
           {/* Top */}
           <div className='flex p-4 justify-between items-center'>
                <div className='flex items-center justify-center'>
                    <RxCross1 size={'1.3em'} onClick={() => setEditOpen(false)} className='hover:cursor-pointer'/>
                    <h1 className='pl-10 text-xl font-bold'>Edit Profile</h1>
                </div>
                <button className='bg-white px-5 py-2 rounded-3xl text-black'
                    onClick={handleEdit}>Save</button>
           </div>
           {/* PP and banner */}
           <div className='relative'>
                <div className='h-[200px] bg-banner bg-cover bg-center'>
                    <div className='h-full w-full bg-black bg-opacity-25'/>
                </div>
                <div className='h-32 w-32 rounded-full border-4 border-black bg-pp bg-cover absolute bottom-0 left-5 translate-y-[50%]'>
                    <div className='h-full w-full rounded-full bg-black bg-opacity-25'/>
                </div>
           </div>
           {/* TwitterName, description, link */}
           <div className='pt-20 p-3 flex flex-col gap-5'>
            <div className='border rounded-md p-1 border-gray-500'>
                <p className='pl-1 text-xs text-gray-500'>Name</p>
                <textarea className='bg-black pl-1 w-full outline-none h-7 ' maxlength="15"
                    onChange={(e) => setTwitterName(e.target.value)}>{twitterName}</textarea>
            </div>

            <div className='border rounded-md p-1 border-gray-500'>
                <p className='pl-1 text-xs text-gray-500'>Description</p>
                <textarea className='bg-black pl-1 w-full outline-none' maxlength="140"
                    onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
            </div>
            
            <div className='border rounded-md p-1 border-gray-500'>
                <p className='pl-1 text-xs text-gray-500'>Link</p>
                <textarea className='bg-black pl-1 w-full outline-none h-7' maxlength="30"
                    onChange={(e) => setLink(e.target.value)}>{link}</textarea>
            </div>
           </div>
        </div>
    </div>
  )
}

export default UpdateProfile
