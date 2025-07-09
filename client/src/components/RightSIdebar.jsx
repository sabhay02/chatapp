import React, { useContext, useEffect, useState } from 'react';
import { userDummyData, imagesDummyData } from '../assets/assets';
import assets from '../assets/assets';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

const RightSIdebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  }, [messages])

  return selectedUser && (
    <div className="h-full p-3 lg:p-4 xl:p-5 overflow-y-auto text-white dark-glass border-l border-white/10">
      <div className="h-full flex flex-col space-y-4 lg:space-y-6">
        {/* User profile section */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative group">
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon} 
              alt="User profile" 
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-3 border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-110"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 online-indicator shadow-lg"></div>
            )}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-base lg:text-lg font-semibold text-white gradient-text">
              {selectedUser.fullName}
            </h2>
            {onlineUsers.includes(selectedUser._id) && (
              <p className="text-xs lg:text-sm text-green-400 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 online-indicator"></span>
                Online
              </p>
            )}
          </div>
          
          {selectedUser.bio && (
            <p className="text-xs lg:text-sm text-gray-300 px-2 leading-relaxed glass-effect p-3 rounded-xl border border-white/10">
              {selectedUser.bio}
            </p>
          )}
        </div>

        <hr className="border-white/20" />

        {/* Quick actions */}
        <div className="space-y-3">
          <h4 className="text-xs lg:text-sm font-medium text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
            Quick Actions
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center space-y-2 p-3 lg:p-4 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 card-hover group glass-effect border border-white/10">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-xs text-white font-medium">Call</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-3 lg:p-4 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 card-hover group glass-effect border border-white/10">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs text-white font-medium">Video</span>
            </button>
          </div>
        </div>

        <hr className="border-white/20" />

        {/* Shared media section */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs lg:text-sm font-medium text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></span>
              Shared Media
            </h4>
            <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">{msgImages.length}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {msgImages.map((url, index) => (
              <div 
                key={index} 
                onClick={() => window.open(url, '_blank')}
                className="group cursor-pointer relative overflow-hidden rounded-xl aspect-square card-hover"
              >
                <img 
                  src={url} 
                  alt={`Media ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 border border-transparent group-hover:border-blue-400/50 rounded-xl transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {msgImages.length > 0 && (
            <button className="w-full text-center py-2 text-xs lg:text-sm text-blue-400 hover:text-blue-300 transition-colors glass-effect rounded-lg border border-white/10 hover:bg-white/5">
              View All Media
            </button>
          )}
        </div>

        <hr className="border-white/20" />

        {/* Settings section */}
        <div className="space-y-3">
          <h4 className="text-xs lg:text-sm font-medium text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"></span>
            Settings
          </h4>
          
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/10 rounded-xl transition-all duration-300 text-left card-hover glass-effect border border-white/10 group">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xs lg:text-sm text-white font-medium">Notifications</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/10 rounded-xl transition-all duration-300 text-left card-hover glass-effect border border-white/10 group">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xs lg:text-sm text-white font-medium">Add to Favorites</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-red-500/20 hover:border-red-500/30 rounded-xl transition-all duration-300 text-left group glass-effect border border-white/10">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-red-500/30 transition-all duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </div>
            <span className="text-xs lg:text-sm text-white group-hover:text-red-300 transition-colors font-medium">Block User</span>
          </button>
        </div>

        {/* Logout button */}
        <div className="pt-2">
          <button 
            onClick={() => logout()} 
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs lg:text-sm font-medium py-3 lg:py-4 px-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-red-500/30 hover:scale-105 btn-hover-effect"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSIdebar;