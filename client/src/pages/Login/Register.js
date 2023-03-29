import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { BsTwitter } from 'react-icons/bs'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';

function Register(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailUsed, setEmailUsed] = useState(false);
    const [usernameUsed, setUsernameUsed] = useState(false);

    const navigate = useNavigate();

    const handleRegister = () => {
        register(username, email, password, confirmPassword)
        .then((res) => {
            if (res === 'User successfully created and authenticated') {
                navigate('/home');
            }
            else if (res === 'Email and username already used') {
                setEmailUsed(true);
                setUsernameUsed(true);
            }
            else if (res === 'Email already used!') {
                setEmailUsed(true);
            }
            else if (res === 'Username already used') {
                setUsernameUsed(true);
            }
        })
        .catch((err) => console.log('Error during sign up', err));
    }

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
                        <div className={`h-14 w-[300px] border ${usernameUsed ? 'border-red-500' : ''} flex p-3`}>
                            <input type='username' placeholder='Username' value={username}
                             onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameUsed(false);
                            }}
                             ></input>
                        </div>
                        {
                            usernameUsed ?
                            <div>
                                <p className='text-red-500'>Username already used</p>
                            </div>
                            : null
                        }
                        {/* Email */}
                        <div className={`h-14 w-[300px] border ${emailUsed ? 'border-red-500' : ''} flex p-3`}>
                            <input type='email' placeholder='Email' value={email}
                             onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailUsed(false);
                             }}></input>
                        </div>
                        {
                            emailUsed ?
                            <div>
                                <p className='text-red-500'>Email already used</p>
                            </div>
                            : null
                        }
                        {/* Password */}
                        <div className={`h-14 w-[300px] border flex p-3 ${password !== confirmPassword ? 'border-red-500' : ''}`} value={password}
                             onChange={(e) => setPassword(e.target.value)}>
                            <input type='password' placeholder='Password'></input>
                        </div>
                        {/* Confirm Password */}
                        <div className={`h-14 w-[300px] border flex p-3 ${password !== confirmPassword ? 'border-red-500' : ''}`} value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}>
                            <input type='password' placeholder='Confirm password'></input>
                        </div>
                        {
                            password !== confirmPassword ?
                            <div>
                                <p className='text-red-500'>Passwords doesnt match</p>
                            </div>
                            : null
                        }
                    </div>

                    {/* Register button */}
                    <div className='w-[300px] h-9 bg-black flex justify-center items-center rounded-3xl hover:cursor-pointer'
                        onClick={handleRegister}>
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
