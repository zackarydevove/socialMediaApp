import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { BsTwitter, BsMeta } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login(props) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = () => {
        console.log(id);
        console.log(password);
        axios ({
            method: 'POST',
            data: {
                usernameOrEmail: id,
                password: password
            },
            withCredentials: true,
            url: 'http://localhost:5000/login'
        }).then((res) => {
            console.log(res);
            if (res.data === 'Successfully Authenticated') {
                navigate('/home');
            }
        }).catch((err) => console.log())
    }

  return (
    <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
        <div className='w-screen h-screen absolute top-0 left-0 bg-black opacity-30'/>
        <div className='z-10 w-[600px] h-[650px] bg-white rounded-xl opacity-100'>
            <div className='p-3 w-full flex justify-center items-center relative'>
                <div className='absolute top-3 left-3'>
                    <RxCross2 size={'1.5em'} className='hover:cursor-pointer' onClick={() => props.setLoginClick(false)}/>
                </div>
                    <BsTwitter size={'2em'}/>
            </div>
            <div className='flex flex-col justify-center items-center gap-5'>
                <h1 className='text-3xl font-bold'>Sign in to Twitter</h1>
            
                    {/* Google */}
                    <div className='w-[300px] h-[40px] flex justify-center items-center border border-gray-200 rounded-3xl hover:cursor-pointer gap-2'>
                        <FcGoogle size={'1.3em'} />
                        <p>Sign up with Google</p>
                    </div>
                    {/* Meta */}
                    <div className='w-[300px] h-[40px] flex justify-center items-center border border-gray-200 rounded-3xl hover:cursor-pointer gap-2'>
                        <BsMeta size={'1.3em'} />
                        <p>Sign up with Meta</p>
                    </div>

                    {/* Or */}
                    <div className='w-[300px] flex items-center gap-3'>
                        <hr className='flex-grow' />
                        <p className='flex-shrink'>or</p>
                        <hr className='flex-grow' />
                    </div>

                    {/* Credentials */}
                    <div className='flex flex-col gap-3'>
                        {/* Username */}
                        <div className='h-14 w-[300px] border flex p-3'>
                            <input type='text' placeholder='Email, or username' value={id}
                                onChange={e => setId(e.target.value)}></input>
                        </div>
                        {/* Password */}
                        <div className='h-14 w-[300px] border flex p-3'>
                            <input type='password' placeholder='Password' value={password}
                                onChange={e => setPassword(e.target.value)}></input>
                        </div>
                    </div>

                    {/* Login button */}
                    <div className='w-[300px] h-9 bg-black flex justify-center items-center rounded-3xl hover:cursor-pointer'
                        onClick={login}>
                        <p className='text-white'>Login</p>
                    </div>

                    {/* Forgot password */}
                    <div className='w-[300px] h-9 border border-gray-200 flex justify-center items-center rounded-3xl hover:cursor-pointer'>
                        <p className='font-bold'>Forgot password?</p>
                    </div>

                    {/* Sign up */}
                    <div className='flex gap-1'>
                        <p>Don't have an account?</p>
                        <button className='text-blue-500' onClick={() => {
                            props.setRegisterClick(true);
                            props.setLoginClick(false);
                        }}>Sign up</button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Login
