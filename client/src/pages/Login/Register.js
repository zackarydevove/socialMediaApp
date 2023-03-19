import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { BsTwitter, BsMeta } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

function Register(props) {
  return (
    <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
        <div className='w-screen h-screen absolute top-0 left-0 bg-black opacity-30'/>
        <div className='z-10 w-[600px] h-[650px] bg-white rounded-xl opacity-100'>
            <div className='p-3 w-full flex justify-center items-center relative'>
                <div className='absolute top-3 left-3'>
                    <RxCross2 size={'1.5em'} className='hover:cursor-pointer' onClick={() => props.setRegisterClick(false)}/>
                </div>
                    <BsTwitter size={'2em'}/>
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
                <h1 className='text-3xl font-bold'>Create your account</h1>

                    {/* Credentials */}
                    <div className='flex flex-col gap-3'>
                        {/* Username */}
                        <div className='h-14 w-[300px] border flex p-3'>
                            <input type='username' placeholder='Username'></input>
                        </div>
                        {/* Email */}
                        <div className='h-14 w-[300px] border flex p-3'>
                            <input type='email' placeholder='Email'></input>
                        </div>
                        {/* Password */}
                        <div className='h-14 w-[300px] border flex p-3'>
                            <input type='password' placeholder='Password'></input>
                        </div>
                        {/* Confirm Password */}
                        <div className='h-14 w-[300px] border flex p-3'>
                            <input type='password' placeholder='Confirm password'></input>
                        </div>
                    </div>

                    {/* Register button */}
                    <div className='w-[300px] h-9 bg-black flex justify-center items-center rounded-3xl hover:cursor-pointer'>
                        <p className='text-white'>Register</p>
                    </div>

                    {/* Sign in*/}
                    <div className='flex gap-1'>
                        <p>Already have an account?</p>
                        <button className='text-blue-500' onClick={() => {
                            props.setRegisterClick(false);
                            props.setLoginClick(true);
                        }}>Sign in</button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Register