import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const {authUser,updateProfile}=useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImg(e.target.files[0]);
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
  
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
  navigate('/');
};



  };

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-2 sm:p-4'>
      <div className='w-[95%] sm:w-5/6 max-w-2xl backdrop-blur-xl text-gray-300 border border-gray-600 sm:border-2 flex items-stretch flex-col-reverse lg:flex-row rounded-lg overflow-hidden'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-6 lg:p-10 flex-1">
          <h3 className="text-base sm:text-lg font-medium">Profile details</h3>
          
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input 
              onChange={handleImageChange} 
              type="file" 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt="Profile" 
              className={`w-10 h-10 sm:w-12 sm:h-12 object-cover ${selectedImg ? 'rounded-full' : ''}`}
            />
            <span className='text-xs sm:text-sm'>Upload profile image</span>
          </label>

          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='text-xs sm:text-sm'>Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='p-2 sm:p-3 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm sm:text-base'
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="bio" className='text-xs sm:text-sm'>Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className='p-2 sm:p-3 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm sm:text-base resize-none'
            />
          </div>

          <button 
            type="submit" 
            className='mt-2 sm:mt-4 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-md hover:from-purple-600 hover:to-violet-700 transition-colors text-sm sm:text-base font-medium'
          >
            Save Changes
          </button>
        </form>

        <div className='flex-1 bg-gray-800/50 flex items-center justify-center p-4 sm:p-6'>
          <div className='flex flex-col items-center gap-3 sm:gap-4'>
            <img 
              src={authUser.profilePic || assets.logo_icon} 
              alt="Profile Preview" 
              className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-purple-500 ${selectedImg ? 'rounded-full' : ""}`}
            />
            <h2 className='text-lg sm:text-xl font-medium text-center'>{name}</h2>
            <p className='text-center text-gray-400 text-sm sm:text-base px-2'>{bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
