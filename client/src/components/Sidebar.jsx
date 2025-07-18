import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Sidebar = () => {

  const navigate = useNavigate();

const { getUsers, users, selectedUser, setSelectedUser, 
        unseenMessages, setUnseenMessages } = useContext(ChatContext);

const { logout, onlineUsers } = useContext(AuthContext);
const [input,setInput]=useState(false)

const filteredUsers = input 
    ? users.filter((user) => 
        user.fullName.toLowerCase().includes(input.toLowerCase())
      ) 
    : users;

    useEffect(()=>{
      getUsers();
    },[onlineUsers])

  return (
    <div className={`
      h-full p-2 sm:p-3 md:p-4 lg:p-5 overflow-y-auto text-white
      bg-gray-800/10 backdrop-blur-sm
      border-r border-gray-600/30
      ${selectedUser ? "hidden md:block" : "block"}
      min-w-0 flex-shrink-0
    `}>
      <div className="h-full flex flex-col space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Header with logo and menu */}
        <div className="flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm lg:text-base">C</span>
            </div>
            <span className="hidden md:block text-sm lg:text-lg font-semibold text-white">Chat App</span>
          </div>
          
          {/* Dropdown menu */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-700/30 transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {/* Dropdown content */}
            <div className="
              absolute right-0 top-full mt-1 z-20
              w-32 sm:w-36 lg:w-40 py-2 px-3
              bg-gray-900 border border-gray-700
              rounded-lg shadow-xl
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200
            ">
              <button
                onClick={() => navigate('/profile')}
                className="
                  w-full text-left py-2 px-1
                  text-xs sm:text-sm text-gray-200 hover:text-white
                  hover:bg-gray-800 rounded
                  transition-colors
                "
              >
                Edit Profile
              </button>
              
              <hr className="my-1 border-gray-700" />
              
              <button
               onClick={()=>logout()}
                className="
                  w-full text-left py-2 px-1
                  text-xs sm:text-sm text-gray-200 hover:text-white
                  hover:bg-gray-800 rounded
                  transition-colors
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="bg-[#282142] rounded-full flex items-center gap-2 sm:gap-3 py-2 px-3 sm:py-3 sm:px-4 lg:py-4 lg:px-5 flex-shrink-0">
          <img src={assets.search_icon} alt="Search" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          <input 
           onChange={(e)=>setInput(e.target.value)}
            type="text" 
            className="bg-transparent border-none outline-none text-white text-xs sm:text-sm placeholder-[#c8c8c8] flex-1 w-full" 
            placeholder="Search User..."
          />
        </div>

        {/* User list */}
        <div className='flex flex-col space-y-1 flex-1 overflow-y-auto'>
          {filteredUsers.map((user, index) => (
            <div 
              onClick={() => {
    setSelectedUser(user);
    setUnseenMessages(prev => ({
        ...prev,
        [user._id]: 0
    }));
}}
              key={user._id || index} 
              className={`
                relative flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer 
                transition-all duration-200 hover:bg-gray-700/30
                ${selectedUser?._id === user._id ? 'bg-[#282142]/70' : ''}
              `}
            >
              <img 
                src={user?.profilePic || assets.avatar_icon} 
                alt={`${user.fullName}'s profile`} 
                className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover flex-shrink-0'
              />
              
              <div className='flex flex-col flex-1 min-w-0'>
                <p className="text-xs sm:text-sm lg:text-base font-medium text-white truncate">{user.fullName}</p>
                {onlineUsers.includes(user._id)? (
                  <span className='text-green-400 text-xs sm:text-sm'>Online</span>
                ) : (
                  <span className='text-gray-400 text-xs sm:text-sm'>Offline</span>
                )}
              </div>

              {unseenMessages[user._id]>0 && (
                <div className='flex-shrink-0 text-xs h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 flex justify-center items-center rounded-full bg-violet-500 text-white font-medium'>
                  {unseenMessages[user._id]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
