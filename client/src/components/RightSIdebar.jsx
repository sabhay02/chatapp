import React, { useContext, useEffect, useState } from 'react';
import { userDummyData,imagesDummyData } from '../assets/assets';
import assets from '../assets/assets';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import AISettings from './AISettings';

const RightSIdebar = () => {
   const {selectedUser,messages}=useContext(ChatContext);
   const {logout,onlineUsers}=useContext(AuthContext);
   const [msgImages,setMsgImages]=useState([]);
   const [showAISettings, setShowAISettings] = useState(false);


   // Get all the images from the messages and set them to state
useEffect(()=>{
    setMsgImages(
    messages.filter(msg => msg.image).map(msg=>msg.image)
    )
},[messages])

  return selectedUser && (
    <div className="h-full p-3 lg:p-4 xl:p-5 overflow-y-auto text-white bg-gray-800/10 backdrop-blur-sm border-l border-gray-600/30">
      <div className="h-full flex flex-col space-y-4 lg:space-y-6">
        {/* User profile section */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative">
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon} 
              alt="User profile" 
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-gray-600/50 shadow-lg"
            />
              {onlineUsers.includes(selectedUser._id) &&<div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>}
          </div>
          
          <div className="space-y-1">
            <h2 className="text-base lg:text-lg font-semibold text-white">
              {selectedUser.fullName}
            </h2>
           {onlineUsers.includes(selectedUser._id) && <p className="text-xs lg:text-sm text-green-400 flex items-center justify-center gap-1">
              && <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Online
            </p>}
          </div>
          
          {selectedUser.bio && (
            <p className="text-xs lg:text-sm text-gray-300 px-2 leading-relaxed">
              {selectedUser.bio}
            </p>
          )}
        </div>

        <hr className="border-gray-600/30" />

        {/* Quick actions */}
        <div className="space-y-2">
          <h4 className="text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wider">Quick Actions</h4>
          
          <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-center space-y-1 p-2 lg:p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-xs text-white">Call</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-2 lg:p-3 hover:bg-gray-700/30 rounded-lg transition-colors">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-white">Video</span>
            </button>
          </div>
        </div>

        <hr className="border-gray-600/30" />

        {/* Shared media section */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wider">Shared Media</h4>
            <span className="text-xs text-gray-500">{msgImages.length}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {msgImages.map((url, index) => (
              <div 
                key={index} 
                onClick={() => window.open(url, '_blank')}
                className="group cursor-pointer relative overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={url} 
                  alt={`Media ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
                <div className="absolute inset-0 border border-transparent group-hover:border-blue-400/50 rounded-lg transition-colors duration-200"></div>
              </div>
            ))}
          </div>
          
          <button className="w-full text-center py-2 text-xs lg:text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All Media
          </button>
        </div>

        <hr className="border-gray-600/30" />

        {/* Settings section */}
        <div className="space-y-2">
          <h4 className="text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wider">Settings</h4>
          
          <button 
            onClick={() => setShowAISettings(true)}
            className="w-full flex items-center space-x-3 p-2 lg:p-3 hover:bg-gray-700/30 rounded-lg transition-colors text-left"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-xs lg:text-sm text-white">AI Features</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-2 lg:p-3 hover:bg-gray-700/30 rounded-lg transition-colors text-left">
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-xs lg:text-sm text-white">Notifications</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-2 lg:p-3 hover:bg-gray-700/30 rounded-lg transition-colors text-left">
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs lg:text-sm text-white">Add to Favorites</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-2 lg:p-3 hover:bg-red-700/20 hover:text-red-400 rounded-lg transition-colors text-left group">
            <svg className="w-4 h-4 lg:w-5 lg:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
            <span className="text-xs lg:text-sm text-white group-hover:text-red-400 transition-colors">Block User</span>
          </button>
        </div>

        {/* Logout button */}
        <div className="pt-2">
          <button onClick={()=>logout()} className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs lg:text-sm font-medium py-2 lg:py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-red-500/30 active:scale-95">
            Logout
          </button>
        </div>
      </div>
     
     <AISettings 
       isOpen={showAISettings} 
       onClose={() => setShowAISettings(false)} 
     />
    </div>
  );
};

export default RightSIdebar;
