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
      h-full p-3 lg:p-4 xl:p-5 overflow-y-auto text-white
      dark-glass border-r border-white/10
      ${selectedUser ? "hidden lg:block" : "block"}
      min-w-0 flex-shrink-0
    `}>
      <div className="h-full flex flex-col space-y-4 lg:space-y-6">
        {/* Header with logo and menu */}
        <div className="flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg float-animation">
              <span className="text-white font-bold text-sm lg:text-base gradient-text">💬</span>
            </div>
            <span className="hidden lg:block text-lg font-semibold text-white gradient-text">QuickChat</span>
          </div>
          
          {/* Dropdown menu */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {/* Dropdown content */}
            <div className="
              absolute right-0 top-full mt-1 z-20
              w-36 lg:w-40 py-2 px-3
              glass-effect border border-white/20
              rounded-xl shadow-2xl
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 transform scale-95 group-hover:scale-100
            ">
              <button
                onClick={() => navigate('/profile')}
                className="
                  w-full text-left py-2 px-1
                  text-xs lg:text-sm text-gray-200 hover:text-white
                  hover:bg-white/10 rounded-lg
                  transition-all duration-200
                "
              >
                Edit Profile
              </button>
              
              <hr className="my-1 border-white/10" />
              
              <button
                onClick={() => logout()}
                className="
                  w-full text-left py-2 px-1
                  text-xs lg:text-sm text-gray-200 hover:text-white
                  hover:bg-white/10 rounded-lg
                  transition-all duration-200
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="glass-effect rounded-full flex items-center gap-3 py-3 px-4 lg:py-4 lg:px-5 flex-shrink-0 border border-white/20">
          <img src={assets.search_icon} alt="Search" className="w-5 h-5 lg:w-6 lg:h-6 opacity-70" />
          <input 
            onChange={(e) => setInput(e.target.value)}
            type="text" 
            className="bg-transparent border-none outline-none text-white text-xs lg:text-sm placeholder-gray-300 flex-1 w-full input-focus" 
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
                relative flex items-center gap-3 p-3 rounded-xl cursor-pointer 
                transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]
                card-hover group
                ${selectedUser?._id === user._id ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20' : ''}
              `}
            >
              <img 
                src={user?.profilePic || assets.avatar_icon} 
                alt={`${user.fullName}'s profile`} 
                className='w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover flex-shrink-0 border-2 border-white/20 group-hover:border-white/40 transition-all duration-300'
              />
              
              <div className='flex flex-col flex-1 min-w-0'>
                <p className="text-sm lg:text-base font-medium text-white truncate">{user.fullName}</p>
                {onlineUsers.includes(user._id) ? (
                  <span className='text-green-400 text-xs lg:text-sm flex items-center gap-1'>
                    <span className="w-2 h-2 rounded-full bg-green-400 online-indicator"></span>
                    Online
                  </span>
                ) : (
                  <span className='text-gray-400 text-xs lg:text-sm'>Offline</span>
                )}
              </div>

              {unseenMessages[user._id] > 0 && (
                <div className='flex-shrink-0 text-xs h-5 w-5 lg:h-6 lg:w-6 flex justify-center items-center rounded-full notification-badge text-white font-medium shadow-lg'>
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