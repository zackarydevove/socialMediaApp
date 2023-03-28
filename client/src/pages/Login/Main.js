import React from 'react'
import { BsTwitter, BsMeta } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import Login from './Login';
import Register from './Register';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/auth';

function Main() {
    const [loginClick, setLoginClick] = useState(false);
    const [registerClick, setRegisterClick] = useState(false);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getUser()
        .then((fetchedUser) => {
            setUser(fetchedUser);
        })
        .catch((err) => console.log('Error fetching user:', err));
    }, [])

    if (user && user._id) {
        navigate('/home');
    } else {
        return (
          <div className='h-screen flex flex-col overflow-hidden'>
              {
                  loginClick ? 
                  <Login setLoginClick={setLoginClick} setRegisterClick={setRegisterClick}/> 
                  : null
      
              }
              {
                  registerClick ? 
                  <Register setLoginClick={setLoginClick} setRegisterClick={setRegisterClick}/> 
                  : null
      
              }
              {/* Main */}
              <div className='font-opensans h-full flex max-lg:flex-col-reverse'>
                  {/* Left */}
                  <div className='max-lg:hidden flex-grow h-full bg-login_bg flex justify-center items-center'>
                      <BsTwitter size={'22.5em'} className='text-white'/>
                  </div>
                  {/* Right */}
                  <div className='lg:w-[800px] h-screen lg:min-w-[437px] p-8 pt-16 pb-16 flex flex-col'>
                      <BsTwitter size={'3em'} className='text-blue-500'/>
                      <div>
                          <h1 className='text-7xl font-bold mt-14'>Happening now</h1>
                      </div>
                      <div>
                          <h2 className='text-3xl font-bold mt-14'>Join Twitter today</h2>
                      </div>
                      {/* Login / Signup */}
                      <div className='flex flex-col gap-3 mt-7'>
                          {/* Google */}
                          <div className='w-[300px] h-[40px] flex justify-center items-center border border-gray-500 rounded-3xl hover:cursor-pointer gap-2'>
                              <FcGoogle size={'1.3em'} />
                              <p>Sign up with Google</p>
                          </div>
                          {/* Meta */}
                          <div className='w-[300px] h-[40px] flex justify-center items-center border border-gray-500 rounded-3xl hover:cursor-pointer gap-2'>
                              <BsMeta size={'1.3em'} />
                              <p>Sign up with Meta</p>
                          </div>
      
                          {/* Or */}
                          <div className='w-[300px] flex items-center gap-3'>
                              <hr className='flex-grow' />
                              <p className='flex-shrink'>or</p>
                              <hr className='flex-grow' />
                          </div>
      
                          {/* Create account */}
                          <div className='w-[300px]'>
                              <div className='w-[300px] h-[40px] flex justify-center items-center rounded-3xl bg-blue-500 hover:cursor-pointer'
                                  onClick={() => setRegisterClick(true)}>
                                  <p className='text-white'>Create an account</p>
                              </div>
                              <p className='text-xs mt-1'>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
                          </div>
      
                          {/* Already have account */}
                          <div>
                              <p className='font-bold text-lg mt-10'>Already have an account?</p>
                              <div className='mt-4 w-[300px] h-[40px] flex justify-center items-center border border-gray-500 rounded-3xl hover:cursor-pointer'
                                  onClick={() => setLoginClick(true)}>
                                  <p className='text-blue-500'>Sign In</p>
                              </div>
      
                          </div>
      
                      </div>
                  </div>
              </div>
      
              {/* Footer */}
              <div className='p-3 flex justify-center items-center flex-wrap gap-4'>
                  {
                  ['About','Help Center','Terms of Service','Privacy Policy','Cookie Policy','Accessibility','Ads info','Blog','Status','Careers','Brand Resources','Advertising','Marketing','Twitter for Business','Developers','Directory','Settings','© 2023 Twitter','Inc.'].map((item) => {
                      return (
                          <p className='text-xs text-gray-500'>{item}</p>
                      )
                  })
                  }
              </div>
          </div>
        )
    }

}

export default Main
