import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Search, Settings, LogOut, User } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState('');

  const filteredUsers = input 
    ? users.filter((user) => 
        user.fullName.toLowerCase().includes(input.toLowerCase())
      ) 
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className={`
      h-full p-4 lg:p-6 overflow-y-auto text-white
      dark-glass border-r border-white/10
      ${selectedUser ? "hidden lg:block" : "block"}
      min-w-0 flex-shrink-0
    `}>
      <div className="h-full flex flex-col space-y-6">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl float-animation">
              <span className="text-white font-bold text-lg lg:text-xl">💬</span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold gradient-text">QuickChat</h1>
              <p className="text-xs text-gray-400">Stay connected</p>
            </div>
          </div>
          
          {/* Enhanced Dropdown menu */}
          <div className="relative group">
            <button className="p-3 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 card-premium">
              <Settings className="w-5 h-5 text-gray-300" />
            </button>
            
            <div className="
              absolute right-0 top-full mt-2 z-20
              w-48 py-3 px-2
              glass-effect border border-white/20
              rounded-2xl shadow-2xl
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 transform scale-95 group-hover:scale-100
            ">
              <button
                onClick={() => navigate('/profile')}
                className="
                  w-full text-left py-3 px-4 flex items-center gap-3
                  text-sm text-gray-200 hover:text-white
                  hover:bg-white/10 rounded-xl
                  transition-all duration-200
                "
              >
                <User className="w-4 h-4" />
                Edit Profile
              </button>
              
              <hr className="my-2 border-white/10" />
              
              <button
                onClick={() => logout()}
                className="
                  w-full text-left py-3 px-4 flex items-center gap-3
                  text-sm text-gray-200 hover:text-red-300
                  hover:bg-red-500/10 rounded-xl
                  transition-all duration-200
                "
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Search bar */}
        <div className="glass-effect rounded-2xl flex items-center gap-4 py-4 px-5 flex-shrink-0 border border-white/20 card-premium">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            onChange={(e) => setInput(e.target.value)}
            type="text" 
            className="bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 flex-1 w-full" 
            placeholder="Search conversations..."
          />
        </div>

        {/* Enhanced User list */}
        <div className='flex flex-col space-y-2 flex-1 overflow-y-auto'>
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
                sidebar-item p-4 cursor-pointer
                ${selectedUser?._id === user._id ? 'active' : ''}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={user?.profilePic || assets.avatar_icon} 
                    alt={`${user.fullName}'s profile`} 
                    className='w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0 avatar-premium'
                  />
                  {onlineUsers.includes(user._id) && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 online-indicator"></div>
                  )}
                </div>
                
                <div className='flex flex-col flex-1 min-w-0'>
                  <p className="text-base lg:text-lg font-semibold text-white truncate text-premium">
                    {user.fullName}
                  </p>
                  {onlineUsers.includes(user._id) ? (
                    <span className='text-green-400 text-sm flex items-center gap-2'>
                      <span className="w-2 h-2 rounded-full bg-green-400 online-indicator"></span>
                      Online
                    </span>
                  ) : (
                    <span className='text-gray-400 text-sm'>Last seen recently</span>
                  )}
                </div>

                {unseenMessages[user._id] > 0 && (
                  <div className='flex-shrink-0 text-xs h-6 w-6 lg:h-7 lg:w-7 flex justify-center items-center rounded-full notification-badge text-white font-bold'>
                    {unseenMessages[user._id]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;