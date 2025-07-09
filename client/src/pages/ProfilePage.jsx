import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImg(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedImg);

    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      setIsLoading(false);
      navigate('/');
    };
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl glass-effect text-gray-300 border border-white/20 flex items-stretch max-lg:flex-col rounded-2xl overflow-hidden shadow-2xl'>
        
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 lg:p-10 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h3 className="text-xl lg:text-2xl font-semibold gradient-text">Profile Settings</h3>
          </div>
          
          <label htmlFor="avatar" className='flex items-center gap-4 cursor-pointer group'>
            <input 
              onChange={handleImageChange} 
              type="file" 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden
            />
            <div className="relative">
              <img 
                src={selectedImg ? URL.createObjectURL(selectedImg) : authUser.profilePic || assets.avatar_icon} 
                alt="Profile" 
                className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-full border-3 border-white/30 group-hover:border-white/50 transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full transition-all duration-300 flex items-center justify-center">
                <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className='text-sm lg:text-base font-medium text-white'>Upload profile image</span>
              <span className='text-xs text-gray-400'>Click to change your avatar</span>
            </div>
          </label>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='text-sm font-medium text-gray-300'>Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='p-3 lg:p-4 glass-effect border border-white/20 rounded-xl focus:outline-none focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-300 input-focus'
              placeholder="Enter your full name"
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="bio" className='text-sm font-medium text-gray-300'>Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className='p-3 lg:p-4 glass-effect border border-white/20 rounded-xl focus:outline-none focus:border-blue-400 text-white placeholder-gray-300 transition-all duration-300 input-focus resize-none'
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className='flex-1 py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 hover:scale-105 btn-hover-effect'
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spinner"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className='px-6 py-3 lg:py-4 glass-effect border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-300 hover:scale-105'
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Preview Section */}
        <div className='flex-1 glass-effect flex items-center justify-center p-8 lg:p-10 border-l border-white/10 max-lg:border-l-0 max-lg:border-t'>
          <div className='flex flex-col items-center gap-6 text-center'>
            <div className="relative group">
              <img 
                src={selectedImg ? URL.createObjectURL(selectedImg) : authUser.profilePic || assets.avatar_icon} 
                alt="Profile Preview" 
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white/30 shadow-2xl transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="space-y-2">
              <h2 className='text-xl lg:text-2xl font-semibold gradient-text'>{name || 'Your Name'}</h2>
              <p className='text-sm lg:text-base text-gray-300 max-w-xs leading-relaxed'>
                {bio || 'Your bio will appear here...'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 online-indicator"></span>
              Online
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg lg:text-xl font-semibold text-white">42</div>
                <div className="text-xs text-gray-400">Chats</div>
              </div>
              <div className="text-center">
                <div className="text-lg lg:text-xl font-semibold text-white">128</div>
                <div className="text-xs text-gray-400">Messages</div>
              </div>
              <div className="text-center">
                <div className="text-lg lg:text-xl font-semibold text-white">15</div>
                <div className="text-xs text-gray-400">Media</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;