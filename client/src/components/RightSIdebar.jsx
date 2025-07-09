import React, { useContext, useEffect, useState } from 'react';
import { userDummyData, imagesDummyData } from '../assets/assets';
import assets from '../assets/assets';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Phone, Video, Heart, Bell, Shield, LogOut, ExternalLink } from 'lucide-react';

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
    <div className="h-full p-4 lg:p-6 overflow-y-auto text-white dark-glass border-l border-white/10">
      <div className="h-full flex flex-col space-y-6">
        {/* Enhanced User profile section */}
        <div className="flex flex-col items-center text-center space-y-4 pt-4">
          <div className="relative group">
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon} 
              alt="User profile" 
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover avatar-premium"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute -bottom-2 -right-2 w-6 h-6 online-indicator"></div>
            )}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl lg:text-2xl font-bold gradient-text">
              {selectedUser.fullName}
            </h2>
            {onlineUsers.includes(selectedUser._id) ? (
              <p className="text-sm text-green-400 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 online-indicator"></span>
                Online now
              </p>
            ) : (
              <p className="text-sm text-gray-400">Last seen recently</p>
            )}
          </div>
          
          {selectedUser.bio && (
            <p className="text-sm text-gray-300 px-4 leading-relaxed glass-effect p-4 rounded-2xl border border-white/10 text-premium">
              {selectedUser.bio}
            </p>
          )}
        </div>

        <hr className="border-white/20" />

        {/* Enhanced Quick actions */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
            Quick Actions
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center space-y-3 p-4 lg:p-5 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105 card-premium group glass-effect border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white font-medium">Voice Call</span>
            </button>
            
            <button className="flex flex-col items-center space-y-3 p-4 lg:p-5 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:scale-105 card-premium group glass-effect border border-white/10">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all duration-300">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white font-medium">Video Call</span>
            </button>
          </div>
        </div>

        <hr className="border-white/20" />

        {/* Enhanced Shared media section */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></span>
              Shared Media
            </h4>
            <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full font-medium">
              {msgImages.length}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
            {msgImages.map((url, index) => (
              <div 
                key={index} 
                onClick={() => window.open(url, '_blank')}
                className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-square card-premium"
              >
                <img 
                  src={url} 
                  alt={`Media ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 border border-transparent group-hover:border-blue-400/50 rounded-2xl transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {msgImages.length > 0 && (
            <button className="w-full text-center py-3 text-sm text-blue-400 hover:text-blue-300 transition-colors glass-effect rounded-2xl border border-white/10 hover:bg-white/5 card-premium">
              View All Media ({msgImages.length})
            </button>
          )}
        </div>

        <hr className="border-white/20" />

        {/* Enhanced Settings section */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"></span>
            Settings
          </h4>
          
          <button className="w-full flex items-center space-x-4 p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 text-left card-premium glass-effect border border-white/10 group">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-white font-medium">Notifications</span>
          </button>
          
          <button className="w-full flex items-center space-x-4 p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 text-left card-premium glass-effect border border-white/10 group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-white font-medium">Add to Favorites</span>
          </button>
          
          <button className="w-full flex items-center space-x-4 p-4 hover:bg-red-500/20 hover:border-red-500/30 rounded-2xl transition-all duration-300 text-left group glass-effect border border-white/10">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-red-500/30 transition-all duration-300">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-white group-hover:text-red-300 transition-colors font-medium">Block User</span>
          </button>
        </div>

        {/* Enhanced Logout button */}
        <div className="pt-4">
          <button 
            onClick={() => logout()} 
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-red-500/30 hover:scale-105 btn-premium"
          >
            <div className="flex items-center justify-center gap-3">
              <LogOut className="w-5 h-5" />
              Logout
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSIdebar;