import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useState } from 'react'
import { updatePassword } from '../../api/user';

function PasswordInfo({user, setShow}) {
    const [pw, setPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmNewPw, setConfirmNewPw] = useState('');
    const [wrongPw, setWrongPw] = useState(false);
    const [pwUpdated, setPwUpdated] = useState(false);

    const handleSave = () => {
        if (user.email === 'demo') {
            return ;
        }
        setPwUpdated(false);
        updatePassword(pw, newPw)
        .then((res) => {
            if (res === 'Incorrect current password') {
                setWrongPw(true);
            } else {
                setWrongPw(false);
                setPwUpdated(true);
            }
        })
        .catch((err) => console.log(err));
    }

  return (
    <div className='w-screen max-w-[600px] h-full flex flex-col border-r border-r-[#2f3336]'>
        {/* Up: Profile information */}
        <div className='flex justify-between p-2 items-center'>
            <div className='p-2 flex items-center gap-2 hover:cursor-pointer'>
                <div className='w-10'>
                    <AiOutlineArrowLeft size={'1.3em'} onClick={() => setShow('')} />
                </div>
                <p className='text-xl font-bold'> Change your password</p>
            </div>
        </div>
        {/* Current password */}
        <div className='p-3'>
            <div className={`h-14 border border-[#2f3336] flex items-center p-3 ${pw ? (wrongPw ? 'border-red-500'  : 'border-blue-500') : ''}`}>
                <input  placeholder='Current password' className='w-full bg-black outline-none'
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}></input>
            </div>
            {
                wrongPw ?
                <p className='text-red-500 text-sm'>Wrong password</p>
                : null
            }
            {/* <p className='text-sm text-blue-500 ml-3 hover:cursor-pointer'>Forgot password?</p> */}
        </div>
        <hr className='border-t-[#2f3336]'/>

        {/* New password */}
        <div className='p-3'>
            <div className={`h-14 border border-[#2f3336] flex items-center p-3 ${newPw ? (newPw !== confirmNewPw ? 'border-red-500' : 'border-blue-500') : ''}`}>
                <input placeholder='New password' className='w-full bg-black outline-none'
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}></input>
            </div>
        </div>
        {/* Confirm password */}
        <div className='p-3'>
            <div className={`h-14 border border-[#2f3336] flex items-center p-3 ${confirmNewPw ? (newPw !== confirmNewPw ? 'border-red-500' : 'border-blue-500') : ''}`}>
                <input placeholder='Confirm password' className='w-full bg-black outline-none'
                    value={confirmNewPw}
                    onChange={(e) => setConfirmNewPw(e.target.value)}></input>
            </div>
            {
                newPw && confirmNewPw && newPw !== confirmNewPw ?
                <p className='text-red-500 text-sm'>Passwords doesnt match</p>
                : null
            }
        </div>
        <hr className='border-t-[#2f3336]'/>
        <div className='flex justify-end p-3'>
            {
                pw && newPw && confirmNewPw && newPw === confirmNewPw ?

                <div className='p-2 pl-5 pr-5 bg-blue-500 rounded-3xl hover:cursor-pointer' 
                    onClick={handleSave}>Save</div>
                : 
                <div className='p-2 pl-5 pr-5 border border-[#2f3336] rounded-3xl' >Save</div>
            }
        </div>
        {
            pwUpdated ?
            <div className='flex justify-center items-center'>
                <p className='text-blue-500'>Password updated</p>
            </div>
            : null
        }
        {
            user.email === 'demo' ?
            <div className='flex justify-center items-center'>
                <p className='text-blue-500'>Can't update demo</p>
            </div>
            : null
        }

    </div>
  )
}

export default PasswordInfo

