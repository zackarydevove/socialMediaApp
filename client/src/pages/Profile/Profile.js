import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import TweetBlock from '../../components/Tweet/TweetBlock'
import PostTweetButton from '../../components/Tweet/PostTweetButton'
import Navbar from '../../components/More/Navbar'
import Search from '../../components/More/SearchBar';
import Recommend from '../../components/More/Recommend';
import Terms from '../../components/More/Terms';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import { getUser, getProfile } from '../../api/auth';
import Navbarsm from '../../components/More/Navbarsm';

function Profile() {
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState({});
    const [userProfile, setUserProfile] = useState({});
    const [update, setUpdate] = useState(false);
    const [selected, setSelected] = useState('Tweets');
    const [loading, setLoading] = useState(true);

    let { username } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getUser()
        .then((res) => setUser(res))
        .catch((err) => console.log('Error during fetching user', err))
        .finally(() => {
          if (user && userProfile) setLoading(false);
        });
    }, [update])

    useEffect(() => {
        getProfile(username)
        .then((res) => {
            if (res === 'user not found') {
                return navigate('/home');
            }
            setUserProfile(res);
        })
        .catch((err) => console.log('Error during fetching profile', err))
        .finally(() => {
          if (user && userProfile) setLoading(false);
        });
    }, [username, update]);

    console.log('In profile, currentUser:', user);
    console.log('In profile, userProfile:', userProfile);

    return (
        <div className='font-opensans flex max-sm:flex-col h-screen w-screen bg-black text-white overflow-x-hidden sm:justify-center'>
            <Navbarsm />
            {openNav ? 
            <div>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} update={update} setUpdate={setUpdate}/> 
            </div>
            : 
            <div className='max-sm:hidden'>
                <Navbar openNav={openNav} setOpenNav={setOpenNav} update={update} setUpdate={setUpdate}/>
            </div>
            }
            <div className='flex flex-col max-sm:flex-grow relative sm:w-[600px] sm:max-w-screen sm:border-r border-r-[#2f3336]'>
                
                <div className='sm:hidden'>
                    <PostTweetButton update={update} setUpdate={setUpdate}/>
                </div>
                <div>
                    <h1 className='max-sm:hidden text-xl font-bold p-3'>Profile</h1>
                    <div className='sm:hidden w-screen flex items-center relative p-3'>
                        <div className='w-14 h-9'>
                            <AiOutlineArrowLeft size={'1.5em'} onClick={() => navigate('/home')}/>
                        </div>
                            
                        <div>
                            <h1>{userProfile.twittername}</h1>
                            <p className='text-sm text-gray-500'></p>
                        </div>
                    </div>
                    <div>
                    {
                      !loading && (
                        <ProfileInfo
                          currentUser={user}
                          userProfile={userProfile}
                          update={update}
                          setUpdate={setUpdate}
                        />
                      )
                    }
                    </div>
                    <div className='flex justify-around items-center'>
                            <h1 className={`h-7 border-b-4 ${selected === 'Tweets' ? 'border-blue-500 text-white' : 'border-none text-gray-500'} font-bold hover:cursor-pointer`}
                                onClick={() => setSelected('Tweets')}>Tweets</h1>
                            <h1 className={`h-7 border-b-4 ${selected === 'Replies' ? 'border-blue-500 text-white' : 'border-none text-gray-500'} font-bold hover:cursor-pointer`}
                                onClick={() => setSelected('Replies')}>Replies</h1>
                            <h1 className={`h-7 border-b-4 ${selected === 'Retweet' ? 'border-blue-500 text-white' : 'border-none text-gray-500'} font-bold hover:cursor-pointer`}
                                onClick={() => setSelected('Retweet')}>Retweet</h1>
                            <h1 className={`h-7 border-b-4 ${selected === 'Likes' ? 'border-blue-500 text-white' : 'border-none text-gray-500'} font-bold hover:cursor-pointer`}
                                onClick={() => setSelected('Likes')}>Likes</h1>
                    </div>
                        <hr className='mt-2 border-t-[#2f3336] ' />
                </div>

                {/* Post */}
                <div className='flex-grow overflow-y-scroll scrollbar-hide'>
                    {userProfile && selected === "Tweets" && userProfile.post && (
                      userProfile.post.map((postId, index) => (
                        <TweetBlock
                          key={index}
                          postId={postId}
                          setUpdate={setUpdate}
                        />
                      ))
                    )}
                    
                    {/* Replies */}
                    {userProfile && selected === "Replies" && userProfile.replies && (
                          userProfile.replies.map((postId, index) => (
                            <TweetBlock
                              key={index}
                              // username={userProfile.username}
                              postId={postId}
                              update={update}
                              setUpdate={setUpdate}
                            />
                          ))
                    )}

                    {/* Likes */}
                    {userProfile && selected === "Likes" && userProfile.likes && (
                      userProfile.likes.map((postId, index) => (
                        <TweetBlock
                          key={index}
                          username={userProfile.username}
                          postId={postId}
                          update={update}
                          setUpdate={setUpdate}
                        />
                      ))
                    )}

                    {/* Retweet */}
                    {userProfile && selected === "Retweet" && userProfile.retweet && (
                      userProfile.retweet.map((postId, index) => (
                        <TweetBlock
                          key={index}
                          postId={postId}
                          setUpdate={setUpdate}
                        />
                      ))
                    )}
                </div>



            </div>
            
            <div className='max-lg:hidden p-3 ml-4'>
                <Search />
                <Recommend setUserProfile={setUserProfile}/>
                <Terms />
            </div>
    </div>
  )
}

export default Profile
