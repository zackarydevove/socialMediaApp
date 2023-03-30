import React from 'react'
import { RxCross1 } from 'react-icons/rx';
import { FaFeatherAlt, FaRegUserCircle } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { useState } from 'react';
import { checkout } from '../../api/stripe';

function TwitterBlue({setOpenTwitterBlue}) {
    const [choosePlan, setChoosePlan] = useState(1);

    const handleCheckout = () => {
        checkout(choosePlan)
        .then((res) => window.open(res.url, '_blank'))
        .catch((err) => console.log (err));
    }

  return (
    <div className='z-50 fixed left-0 top-0 md:w-screen md:h-screen bg-blue-300 bg-opacity-20 max-sm:max-h-screen max-sm:overflow-y-scroll max-sm:scrollbar-hide'>
        <div className='w-screen h-screen md:w-[600px] md:h-[750px] md:fixed md:left-[50%] md:translate-x-[-50%] md:top-16 z-30 bg-black md:rounded-2xl max-sm:max-h-screen max-sm:overflow-y-scroll max-sm:scrollbar-hide'>
            <div className='flex flex-col w-full h-full z-40 relative'>
                {/* Up titre */}
                <div className='w-full p-4 pb-0 max-sm:w-screen'>
                    <div className='flex w-full p-2 items-center relative'>
                        <RxCross1 size={'1.3em'} className='text-white hover:cursor-pointer'
                            onClick={() => setOpenTwitterBlue(false)}/>
                        <p className='font-bold text-2xl absolute left-[50%] translate-x-[-50%]'>Twitter Blue</p>
                    </div>
                </div>
                {/* Mid calls */}
                <div className=' pl-3 sm:pl-20 flex-grow  flex flex-col max-md:gap-5 justify-center items-start max-sm:items-center'>
                    <div className='flex  justify-center sm:justify-start items-center sm:pr-20 gap-5 max-sm:flex-col'>
                        <FaFeatherAlt size={'2.5em'}/>
                        <div className='p-3 flex flex-col max-sm:justify-center max-sm:items-center'>
                            <h1 className='font-bold text-xl'>Longer Tweets</h1>
                            <p className='text-gray-500'>Creates Tweets, replies and Quotes up to 4,000 characters long.</p>
                        </div>
                    </div>
                    <div className='flex justify-start items-center sm:pr-20 gap-5 max-sm:flex-col'>
                        <AiFillEdit size={'2.5em'}/>
                        <div className='p-3  flex flex-col max-sm:justify-center max-sm:items-center'>
                            <h1 className='font-bold text-xl'>Edit Tweet</h1>
                            <p className='text-gray-500'>Edit a Tweet up to 5 times within 30 minutes.</p>
                        </div>
                    </div>
                    <div className='flex justify-start items-center sm:pr-20 gap-5 max-sm:flex-col'>
                        <FaRegUserCircle size={'2.5em'}/>
                        <div className='p-3  flex flex-col max-sm:justify-center max-sm:items-center'>
                            <h1 className='font-bold text-xl'>NFT Profile Picture</h1>
                            <p className='text-gray-500'>Show your personal flair and set your profile picture to an NFT you own.</p>
                        </div>
                    </div>
                    <div className='flex justify-start items-center sm:pr-20 gap-5 max-sm:flex-col'>
                        <BsFillCameraVideoFill size={'2.5em'}/>
                        <div className='p-3  flex flex-col max-sm:justify-center max-sm:items-center'>
                            <h1 className='font-bold text-xl'>1080p video uploads</h1>
                            <p className='text-gray-500'>Share your favorite moments with 1080p (Full HD) video.</p>
                        </div>
                    </div>
                        
                </div>

                {/* Bottom payments */}
                <div className='px-10 py-2 pb-7'>
                    <div className='flex justify-around max-sm:flex-col max-sm:gap-2'>
                        {/* Left option */}
                        <div className={`p-3 bg-[#1b2023] ${choosePlan === 1 ? 'border-2 border-[#1d9bf0]' : ''} rounded-xl cursor-pointer hover:bg-[#16181c]`}
                            onClick={() => setChoosePlan(1)}>
                            <div className='flex gap-2'>
                                <p className='text-sm text-gray-500'>Annual Plan</p>
                                <p className='bg-[#00251a] text-xs'>SAVE 12%</p>
                            </div>
                            <p className='text-lg'>$7.00 / month</p>
                            <p  className='text-sm text-gray-500'>$84.00 per year billed annualy</p>
                        </div>
                        {/* Right option */}
                        <div className={`p-3 bg-[#1b2023]  ${choosePlan === 2 ? 'border-2 border-[#1d9bf0]' : ''} rounded-xl cursor-pointer hover:bg-[#16181c] `}
                            onClick={() => setChoosePlan(2)}>
                            <div className='flex gap-2'>
                                <p className='text-sm text-gray-500'>Monthly Plan</p>
                            </div>
                            <p className='text-lg'>$8.00 / month</p>
                            <p  className='text-sm text-gray-500'>$96.00 per year billed monthly</p>
                        </div>
                    </div>

                    <div className='p-2 pt-5'>
                        <button className='w-full bg-white hover:bg-slate-200 rounded-3xl text-black py-1'
                            onClick={handleCheckout}>Subscribe</button>
                        <p className='text-xs text-gray-500 pt-3'>By clicking Subscribe, you agree to our Purchaser Terms of Service. Subscriptions auto-renew until canceled, as described in the Terms. A verified phone number is required to subscribe. If you've subscribed on another platform, manage your subscription through that platform.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TwitterBlue
