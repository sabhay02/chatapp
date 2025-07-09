import React, { useContext, useEffect, useRef, useState } from 'react';
import { Send, Paperclip, MoreVertical, ArrowLeft, Phone, Video, Smile } from 'lucide-react';
import assets, { messagesDummyData } from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import toast from 'react-hot-toast';

const ChatContianer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef(null);
  const [input, setInput] = useState('');

  // Handle sending a message
  const handleSendMessage = async (e) => { 
    e.preventDefault(); 
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='h-full flex flex-col dark-glass overflow-hidden'>
      {/* Enhanced Chat header */}
      <div className='flex items-center justify-between p-4 lg:p-6 border-b border-white/10 glass-effect flex-shrink-0'>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedUser(null)} 
            className='lg:hidden p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 card-premium'
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          
          <div className="relative">
            <img 
              src={selectedUser.profilePic || assets.avatar_icon} 
              alt={selectedUser.fullName || "User"} 
              className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover avatar-premium"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 online-indicator"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-lg lg:text-xl font-bold text-white text-premium">
              {selectedUser.fullName}
            </h2>
            {onlineUsers.includes(selectedUser._id) ? (
              <p className="text-sm text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 online-indicator"></span>
                Online now
              </p>
            ) : (
              <p className="text-sm text-gray-400">Last seen recently</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 card-premium">
            <Phone className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 card-premium">
            <Video className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 card-premium">
            <MoreVertical className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Enhanced Chat messages area */}
      <div className='flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 min-h-0'>
        {messages.map((msg, index) => {
          const isCurrentUser = msg.senderId === authUser._id;
          
          return (
            <div 
              key={index} 
              className={`flex items-end gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar for received messages */}
              {!isCurrentUser && (
                <img 
                  src={msg.senderProfilePic || selectedUser.profilePic || assets.avatar_icon} 
                  alt="User" 
                  className='w-8 h-8 rounded-full object-cover flex-shrink-0 avatar-premium'
                />
              )}
              
              {/* Enhanced Message bubble */}
              <div className={`flex flex-col max-w-xs lg:max-w-md message-bubble ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                {msg.image ? (
                  <div className={`relative group card-premium ${isCurrentUser ? 'ml-auto' : 'mr-auto'}`}>
                    <img 
                      src={msg.image} 
                      alt="Message attachment" 
                      className='max-w-[280px] lg:max-w-[320px] rounded-2xl shadow-2xl'
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-all duration-300"></div>
                  </div>
                ) : (
                  <div 
                    className={`
                      px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] text-premium
                      ${isCurrentUser 
                        ? 'message-bubble-sent text-white rounded-br-md' 
                        : 'message-bubble-received text-white rounded-bl-md'
                      }
                    `}
                  >
                    <p className="text-sm lg:text-base leading-relaxed break-words">
                      {msg.text}
                    </p>
                  </div>
                )}
                
                {/* Enhanced Timestamp */}
                <p className={`text-xs text-gray-400 mt-2 px-2 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {/* Avatar for sent messages */}
              {isCurrentUser && (
                <img 
                  src={authUser.profilePic || assets.avatar_icon} 
                  alt="You" 
                  className='w-8 h-8 rounded-full object-cover flex-shrink-0 avatar-premium'
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Enhanced Message input */}
      <div className='p-4 lg:p-6 border-t border-white/10 glass-effect flex-shrink-0'>
        <div className="flex items-center space-x-4">
          <label htmlFor="image-upload" className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 card-premium">
            <Paperclip className="w-5 h-5 text-gray-300" />
          </label>
          <input 
            type="file" 
            id="image-upload"
            accept="image/*"
            onChange={handleSendImage}
            className="hidden"
          />
          
          <div className="flex-1 relative">
            <input 
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
              type="text" 
              placeholder="Type your message..."
              className="w-full input-premium"
            />
          </div>
          
          <button className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 card-premium">
            <Smile className="w-5 h-5 text-gray-300" />
          </button>
          
          <button 
            onClick={handleSendMessage} 
            className="btn-premium p-3 rounded-full"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className='h-full flex flex-col items-center justify-center gap-8 text-gray-300 dark-glass p-8'>
      <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl float-animation">
        <span className="text-white font-bold text-3xl lg:text-4xl">💬</span>
      </div>
      <div className="text-center max-w-md">
        <h3 className="text-2xl lg:text-3xl font-bold gradient-text mb-4">
          Welcome to QuickChat
        </h3>
        <p className="text-base lg:text-lg text-gray-300 leading-relaxed text-premium">
          Select a conversation from the sidebar to start chatting with your friends and colleagues.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-sm lg:text-base text-gray-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Instant messaging
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          File sharing
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Secure & private
        </span>
      </div>
    </div>
  );
};

export default ChatContianer;