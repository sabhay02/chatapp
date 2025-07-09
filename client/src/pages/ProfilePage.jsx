import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, Camera, Save, X, User, MessageSquare, Image } from 'lucide-react';

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
    <div className='min-h-screen flex items-center justify-center p-6 page-transition'>
      <div className='w-full max-w-6xl glass-effect text-gray-300 border border-white/20 flex items-stretch max-lg:flex-col rounded-3xl overflow-hidden shadow-2xl card-premium'>
        
        {/* Enhanced Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-8 lg:p-12 flex-1">
          <div className="flex items-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 card-premium"
            >
              <ArrowLeft className="w-6 h-6 text-gray-300" />
            </button>
            <div>
              <h3 className="text-2xl lg:text-3xl font-black gradient-text">Profile Settings</h3>
              <p className="text-gray-400 text-sm">Customize your QuickChat experience</p>
            </div>
          </div>
          
          <label htmlFor="avatar" className='flex items-center gap-6 cursor-pointer group card-premium p-6 rounded-2xl glass-effect border border-white/10'>
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
                className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-full avatar-premium"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-full transition-all duration-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className='text-lg font-bold text-white text-premium'>Upload profile image</span>
              <span className='text-sm text-gray-400'>Click to change your avatar • JPG, PNG up to 5MB</span>
            </div>
          </label>

          <div className='flex flex-col gap-3'>
            <label htmlFor="name" className='text-sm font-bold text-gray-300 flex items-center gap-2'>
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='input-premium'
              placeholder="Enter your full name"
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label htmlFor="bio" className='text-sm font-bold text-gray-300 flex items-center gap-2'>
              <MessageSquare className="w-4 h-4" />
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className='input-premium resize-none'
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className='flex-1 btn-premium py-4 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="spinner-premium"></div>
                  Saving Changes...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Save className="w-5 h-5" />
                  Save Changes
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className='px-8 py-4 glass-effect border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 card-premium'
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Enhanced Preview Section */}
        <div className='flex-1 glass-effect flex items-center justify-center p-8 lg:p-12 border-l border-white/10 max-lg:border-l-0 max-lg:border-t'>
          <div className='flex flex-col items-center gap-8 text-center max-w-md'>
            <div className="relative group">
              <img 
                src={selectedImg ? URL.createObjectURL(selectedImg) : authUser.profilePic || assets.avatar_icon} 
                alt="Profile Preview" 
                className="w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover avatar-premium float-animation"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="space-y-3">
              <h2 className='text-2xl lg:text-3xl font-black gradient-text'>{name || 'Your Name'}</h2>
              <p className='text-base lg:text-lg text-gray-300 max-w-xs leading-relaxed text-premium'>
                {bio || 'Your bio will appear here...'}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm lg:text-base text-gray-400">
              <span className="w-3 h-3 rounded-full bg-green-500 online-indicator"></span>
              <span className="font-medium">Online</span>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8 w-full">
              <div className="text-center p-4 glass-effect rounded-2xl border border-white/10 card-premium">
                <div className="text-2xl lg:text-3xl font-bold gradient-text">42</div>
                <div className="text-xs text-gray-400 font-medium">Chats</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-2xl border border-white/10 card-premium">
                <div className="text-2xl lg:text-3xl font-bold gradient-text">128</div>
                <div className="text-xs text-gray-400 font-medium">Messages</div>
              </div>
              <div className="text-center p-4 glass-effect rounded-2xl border border-white/10 card-premium">
                <div className="text-2xl lg:text-3xl font-bold gradient-text">15</div>
                <div className="text-xs text-gray-400 font-medium">Media</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400 mt-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Active chatter</span>
              </div>
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-purple-400" />
                <span>Media sharer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;