import React from 'react'
import { AiFillEdit, AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { updateSettings } from '../../api/user';

function AccountInfo({user, setUpdateUser, setUser, setShow}) {
    const [username, setUsername] = useState(user.username || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [email, setEmail] = useState(user.email || '');
    const [country, setCountry] = useState(user.country || '');
    const [age, setAge] = useState(user.age || '');
    const [editUsername, setEditUsername] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editCountry, setEditCountry] = useState(false);
    const [editAge, setEditAge] = useState(false);
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [createdAt, setCreatedAt] = useState('');


    useEffect(() => {
        setUsername(user.username || '');
        setPhone(user.phone || '');
        setEmail(user.email || '');
        setCountry(user.country || '');
        setAge(user.age || '');
    }, [user]);

    const handleEdit = () => {
        console.log('allo')
        setUpdateUser((prev) => !prev);
        setUser({});
        updateSettings(username, phone, email, country, age)
        .then((res) => {
            if (res === 'username taken') {
                setUsernameTaken(true);
            } else if (res === 'email taken') {
                setEmailTaken(true);
            } else {
                setUsernameTaken(false);
                setEmailTaken(false);
            }
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        const date = new Date(user.createdAt);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true 
        };
    
        setCreatedAt(date.toLocaleDateString('en-US', options));
    }, [user])

  return (
    <div className='w-screen max-w-[600px] h-full flex flex-col border-r border-r-[#2f3336]'>
      {/* Up: Profile information */}
      <div className='flex justify-between p-2 items-center'>
        <div className='p-2 flex items-center gap-2 hover:cursor-pointer'>
            <div className='w-10 lg:hidden'>
                <AiOutlineArrowLeft size={'1.3em'} onClick={() => setShow('')}/>
            </div>
            <p className='text-xl font-bold'> Account Information</p>
        </div>
      </div>
      <hr className='border-t-[#2f3336]'/>
        <div className='p-3 flex flex-col gap-3'>

            <div className={`flex justify-between items-center p-1 px-2 ${editUsername ? 'border border-blue-500' : ''}`}>
                <div className='flex flex-col w-full'>
                    <p className={`${editUsername ? 'text-blue-500' : ''}`}>Username</p>
                    <input className={`text-sm ${editUsername ? 'text-white' : 'text-gray-500'} bg-black outline-none w-full`}
                            readOnly={!editUsername}
                            value={username}
                            onChange={e => setUsername(e.target.value)}></input>
                    {
                        usernameTaken ?
                            <p className='text-xs text-red-500'>Username already taken</p> 
                        : null
                    }
                </div>
                {
                    editUsername ?
                    <AiOutlineCheck size={'1.3em'} className='hover:cursor-pointer' 
                    onClick={() =>  {
                        handleEdit();
                        setEditUsername(false)
                    }}/>
                    :
                    <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' 
                        onClick={() => setEditUsername(true)}/>
                }
            </div>

            <div className={`flex justify-between items-center p-1 px-2 ${editPhone ? 'border border-blue-500' : ''}`}>
                <div className='flex flex-col w-full'>
                    <p className={`${editPhone ? 'text-blue-500' : ''}`}>Phone</p>
                    <input className={`text-sm ${editPhone ? 'text-white' : 'text-gray-500'} outline-none bg-black w-full`}
                            readOnly={!editPhone}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}></input>
                </div>
                {
                    editPhone ?
                    <AiOutlineCheck size={'1.3em'} className='hover:cursor-pointer' 
                    onClick={() => {
                        handleEdit();
                        setEditPhone(false)
                    }}/>
                    :
                    <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' 
                        onClick={() => setEditPhone(true)}/>
                }
            </div>

            <div className={`flex justify-between items-center p-1 px-2 ${editEmail ? 'border border-blue-500' : ''}`}>
                <div className='flex flex-col w-full'>
                    <p className={`${editEmail ? 'text-blue-500' : ''}`}>Email</p>
                    <input className={`text-sm ${editEmail ? 'text-white' : 'text-gray-500'} outline-none bg-black w-full`}
                            readOnly={!editEmail}
                            value={email}
                            onChange={e => setEmail(e.target.value)}></input>
                    {
                        emailTaken ?
                        <p className='text-xs text-red-500'>Email already taken</p> 
                        : null
                    }
                </div>
                {
                    user.email === 'demo' ?
                    null
                    :
                    (
                        editEmail ?
                        <AiOutlineCheck size={'1.3em'} className='hover:cursor-pointer' 
                        onClick={() => {
                            handleEdit();
                            setEditEmail(false)
                        }}/>
                        :
                        <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' 
                            onClick={() => setEditEmail(true)}/>
                    )
                }
            </div>

                {
                    user.email === 'demo' ? 
                    <div className='pl-2 text-blue-500'>
                        <p className='text-xs'>Can't update demo email</p>
                    </div>
                    : null
                }

        </div>

        <hr className='border-t-[#2f3336]'/>

        <div className='p-3 flex flex-col gap-3'>
            
        <div className={`flex justify-between items-center p-1 px-2 ${editCountry ? 'border border-blue-500' : ''}`}>
                <div className='flex flex-col w-full'>
                    <p className={`${editCountry ? 'text-blue-500' : ''}`}>Country</p>
                    <input className={`text-sm ${editCountry ? 'text-white' : 'text-gray-500'} outline-none bg-black w-full`}
                            readOnly={!editCountry}
                            value={country}
                            onChange={e => setCountry(e.target.value)}></input>
                </div>
                {
                    editCountry ?
                    <AiOutlineCheck size={'1.3em'} className='hover:cursor-pointer' 
                    onClick={() => {
                        handleEdit();
                        setEditCountry(false)
                    }}/>
                    :
                    <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' 
                        onClick={() =>setEditCountry(true)}/>
                }
            </div>

            <div className={`flex justify-between items-center p-1 px-2 `}>
                <div className='flex flex-col'>
                    <p>Birthdate</p>
                    <p className='text-sm text-gray-500 outline-none bg-black'>{createdAt}</p>
                </div>
            </div>

            <div className={`flex justify-between items-center p-1 px-2 ${editAge ? 'border border-blue-500' : ''}`}>
                <div className='flex flex-col w-full'>
                    <p className={`${editAge ? 'text-blue-500' : ''}`}>Age</p>
                    <input className={`text-sm ${editAge ? 'text-white' : 'text-gray-500'} outline-none bg-black w-full`}
                            readOnly={!editAge}
                            value={age}
                            onChange={e => setAge(e.target.value)}></input>
                </div>
                {
                    editAge ?
                    <AiOutlineCheck size={'1.3em'} className='hover:cursor-pointer' 
                    onClick={() => {
                        handleEdit();
                        setEditAge(false);
                    }}/>
                    :
                    <AiFillEdit size={'1.3em'} className='hover:cursor-pointer' 
                        onClick={() => setEditAge(true)}/>
                }
            </div>
        </div>
    </div>
  )
}

export default AccountInfo

