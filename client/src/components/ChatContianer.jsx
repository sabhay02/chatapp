import React, { useContext, useEffect, useRef, useState } from 'react';
import { Send, Paperclip, MoreVertical, ArrowLeft, Phone, Video } from 'lucide-react';
import assets, { messagesDummyData } from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import toast from 'react-hot-toast';
import { useAI } from '../hooks/useAI';
import SmartReplies from './SmartReplies';
import SpamWarning from './SpamWarning';

const ChatContianer = () => {

  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);

const { authUser, onlineUsers } = useContext(AuthContext);
const { smartReplies, isLoadingReplies, spamDetection, getSmartReplies, checkSpam, setSmartReplies } = useAI();

  const scrollEnd = useRef(null);
const [input,setInput]=useState('');
const [showSpamWarning, setShowSpamWarning] = useState(false);
const [pendingMessage, setPendingMessage] = useState('');

// Handle sending a message
const handleSendMessage = async (e) => { 
    e.preventDefault(); 
    if (input.trim() === "") return;
    
    const messageText = input.trim();
    
    // Check for spam before sending
    const spamResult = await checkSpam(messageText);
    if (spamResult.isSpam && spamResult.confidence > 0.7) {
        setPendingMessage(messageText);
        setShowSpamWarning(true);
        return;
    }
    
    await sendMessage({ text: messageText });
    setInput("");
    setSmartReplies([]);
};

// Handle sending message anyway despite spam warning
const handleSendAnyway = async () => {
    await sendMessage({ text: pendingMessage });
    setInput("");
    setPendingMessage("");
    setShowSpamWarning(false);
    setSmartReplies([]);
};

// Handle dismissing spam warning
const handleDismissSpamWarning = () => {
    setShowSpamWarning(false);
    setPendingMessage("");
};

// Handle selecting a smart reply
const handleSelectReply = (reply) => {
    setInput(reply);
    setSmartReplies([]);
};

// Handle refreshing smart replies
const handleRefreshReplies = () => {
    if (selectedUser) {
        getSmartReplies(selectedUser._id);
    }
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

useEffect(()=>{
 if (selectedUser) {
    getMessages(selectedUser._id);
    // Get smart replies when user is selected
    getSmartReplies(selectedUser._id);
  }
},[selectedUser])

// Get smart replies when new messages arrive
useEffect(() => {
    if (messages.length > 0 && selectedUser) {
        // Debounce to avoid too many API calls
        const timer = setTimeout(() => {
            getSmartReplies(selectedUser._id);
        }, 1000);
        return () => clearTimeout(timer);
    }
}, [messages.length]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='h-full flex flex-col bg-gray-900/20 backdrop-blur-sm overflow-hidden'>
      {/* Chat header */}
      <div className='flex items-center justify-between p-3 lg:p-4 border-b border-gray-600/30 bg-gray-900/40 backdrop-blur-sm flex-shrink-0'>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setSelectedUser(null)} 
            className='lg:hidden p-2 hover:bg-gray-700/30 rounded-full transition-colors'
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          
          <img 
            src={selectedUser.profilePic || assets.avatar_icon} 
            alt={selectedUser.fullName || "User"} 
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-gray-600/50"
          />
          
          <div className="flex-1">
            <h2 className="text-base lg:text-lg font-semibold text-white">
              {selectedUser.fullName}
            </h2>
            {onlineUsers.includes(selectedUser._id) && <p className="text-xs lg:text-sm text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Online
            </p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700/30 rounded-full transition-colors">
            <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-700/30 rounded-full transition-colors">
            <Video className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-700/30 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Chat messages area */}
      <div className='flex-1 overflow-y-auto p-3 lg:p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-900/10 min-h-0'>
        {messages.map((msg, index) => {
          const isCurrentUser = msg.senderId === authUser._id;
          
          return (
            <div 
              key={index} 
              className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar for received messages */}
              {!isCurrentUser && (
                <img 
                 src={msg.senderProfilePic || selectedUser.profilePic || assets.
                    avatar_icon} 
                  alt="User" 
                  className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                />
              )}
              
              {/* Message bubble */}
              <div className={`flex flex-col max-w-xs lg:max-w-md ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                {msg.image ? (
                  <div className={`relative group ${isCurrentUser ? 'ml-auto' : 'mr-auto'}`}>
                    <img 
                      src={msg.image} 
                      alt="Message attachment" 
                      className='max-w-[250px] lg:max-w-[300px] rounded-2xl border border-gray-600/30 shadow-lg'
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors"></div>
                  </div>
                ) : (
                  <div 
                    className={`
                      px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm
                      ${isCurrentUser 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md' 
                        : 'bg-gray-800/80 text-white rounded-bl-md border border-gray-600/30'
                      }
                    `}
                  >
                    <p className="text-sm lg:text-base leading-relaxed break-words">
                      {msg.text}
                    </p>
                  </div>
                )}
                
                {/* Timestamp */}
                <p className={`text-xs text-gray-400 mt-1 px-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              {/* Avatar for sent messages */}
              {isCurrentUser && (
                <img 
                 
                                       src={authUser.profilePic || assets.avatar_icon} 

                  alt="You" 
                  className='w-8 h-8 rounded-full object-cover flex-shrink-0'
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Spam Warning */}
      {showSpamWarning && (
        <SpamWarning
          spamDetection={spamDetection}
          onDismiss={handleDismissSpamWarning}
          onSendAnyway={handleSendAnyway}
        />
      )}

      {/* Smart Replies */}
      <SmartReplies
        suggestions={smartReplies}
        isLoading={isLoadingReplies}
        onSelectReply={handleSelectReply}
        onRefresh={handleRefreshReplies}
      />

      {/* Message input */}
      {/* Message input section - updated */}
<div className='p-3 lg:p-4 border-t border-gray-600/30 bg-gray-900/40 backdrop-blur-sm flex-shrink-0'>
  <div className="flex items-center space-x-3">
    {/* File input with proper label connection */}
    <label htmlFor="image-upload" className="p-2 hover:bg-gray-700/30 rounded-full transition-colors cursor-pointer">
      <Paperclip className="w-5 h-5 text-gray-300" />
    </label>
    <input 
      type="file" 
      id="image-upload"
      accept="image/*"
      onChange={handleSendImage}
      className="hidden"
    />
    
    {/* Rest of your input field */}
    <div className="flex-1 relative">
      <input 
        onChange={(e)=>setInput(e.target.value)}
        value={input}
        onKeyDown={(e)=>e.key==="Enter" ? handleSendMessage(e):null}
        type="text" 
        placeholder="Type a message..."
        className="
          w-full px-4 py-3 lg:px-5 lg:py-3
          bg-gray-800/50 border border-gray-600/50
          rounded-full text-white placeholder-gray-400
          text-sm lg:text-base focus:outline-none focus:border-blue-500
          transition-all duration-200 focus:bg-gray-800/70
        "
      />
    </div>
    
    <button onClick={handleSendMessage} className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
      <Send className="w-5 h-5 text-white" />
    </button>
  </div>
</div>
    </div>
  ) : (
    <div className='h-full flex flex-col items-center justify-center gap-6 text-gray-400 bg-gray-900/10 backdrop-blur-sm p-8'>
      <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-2xl lg:text-3xl">C</span>
      </div>
      <div className="text-center max-w-md">
        <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
          Welcome to Chat
        </h3>
        <p className="text-sm lg:text-base text-gray-400 leading-relaxed">
          Select a conversation from the sidebar to start chatting with your friends and colleagues.
        </p>
      </div>
      <div className="flex space-x-4 text-xs lg:text-sm text-gray-500">
        <span>💬 Instant messaging</span>
        <span>📁 File sharing</span>
        <span>🔒 Secure & private</span>
      </div>
    </div>
  );
};

export default ChatContianer;
